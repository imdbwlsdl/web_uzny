/* =====================================================
   달빛 카페 – 화면 동작
   0. 도구        : 가격 표시, 짧은 알림
   1. 메뉴판 그리기 : menu.js 데이터로 카테고리별 메뉴 목록 생성
   2. 카테고리 탭  : 누르면 해당 메뉴로 이동 + 선택 표시
                    스크롤하면 지금 보이는 카테고리 탭이 자동 선택
   ===================================================== */


/* ---------- 0. 도구 ---------- */

/* 3500 → "3,500원" */
function formatPrice(won) {
  return won.toLocaleString("ko-KR") + "원";
}

/* 실제로 받는 가격 (할인 중이면 할인가) */
function getPrice(item) {
  return item.salePrice || item.price;
}

/* 화면 아래에 잠깐 떴다 사라지는 알림 */
const toast = document.getElementById("toast");
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("is-show");
  }, 2000);
}


/* ---------- 1. 메뉴판 그리기 ---------- */

/* 사진 대신 쓰는 그림 (8단계에서 실제 사진으로 교체) */
const PHOTO_ICON = {
  coffee: "☕",
  noncoffee: "🧋",
  "trad-drink": "🍵",
  dessert: "🍰",
  "trad-dessert": "🍡",
  signature: { drink: "🌙", dessert: "🌕" }
};

function getPhotoIcon(item) {
  const icon = PHOTO_ICON[item.category];
  return typeof icon === "object" ? icon[item.kind] : icon;
}

/* 카테고리에 들어갈 메뉴 목록
   추천·할인처럼 auto 가 있으면 태그로 모으고, 아니면 category 로 고른다 */
function getMenuOf(category) {
  if (category.auto) {
    return MENU.filter(function (item) {
      return item.tags.includes(category.auto);
    });
  }
  return MENU.filter(function (item) {
    return item.category === category.id;
  });
}

/* 배지 : 품절 / 시그니처 / 추천 / 할인 */
function badgesHTML(item) {
  let html = "";
  if (item.soldOut)                    html += '<span class="badge badge--soldout">품절</span>';
  if (item.tags.includes("signature")) html += '<span class="badge badge--signature">시그니처</span>';
  if (item.tags.includes("recommend")) html += '<span class="badge badge--recommend">추천</span>';
  if (item.tags.includes("sale"))      html += '<span class="badge badge--sale">할인</span>';
  return html;
}

/* 가격 : 할인 중이면 원래 가격 취소선 + 할인율 + 할인가 */
function priceHTML(item) {
  if (item.salePrice) {
    const rate = Math.round((1 - item.salePrice / item.price) * 100);
    return '<del class="menu-item__old">' + formatPrice(item.price) + "</del>" +
           '<span class="menu-item__rate">' + rate + "%</span>" +
           "<strong>" + formatPrice(item.salePrice) + "</strong>";
  }
  return "<strong>" + formatPrice(item.price) + "</strong>";
}

/* 메뉴 한 줄 */
function menuItemHTML(item) {
  const soldOutAttr = item.soldOut ? ' aria-disabled="true"' : "";
  const temps = item.temps.length ? " · " + item.temps.join("·") : "";

  return (
    "<li>" +
      '<button type="button" class="menu-item' + (item.soldOut ? " is-soldout" : "") + '" data-id="' + item.id + '"' + soldOutAttr + ">" +
        '<span class="menu-item__info">' +
          '<span class="menu-item__badges">' + badgesHTML(item) + "</span>" +
          '<span class="menu-item__name">' + item.name + "</span>" +
          '<span class="menu-item__en">' + item.en + temps + "</span>" +
          '<span class="menu-item__desc">' + item.desc + "</span>" +
          '<span class="menu-item__price">' + priceHTML(item) + "</span>" +
        "</span>" +
        '<span class="menu-item__photo" aria-hidden="true">' + getPhotoIcon(item) + "</span>" +
      "</button>" +
    "</li>"
  );
}

/* 카테고리마다 목록 채우기 */
function renderMenu() {
  CATEGORIES.forEach(function (category) {
    const list = document.querySelector('.menu-list[data-category="' + category.id + '"]');
    if (!list) return;
    list.innerHTML = getMenuOf(category).map(menuItemHTML).join("");
  });
}

/* 메뉴를 누르면 : 품절이면 알림, 아니면 메뉴 상세 열기 (4단계) */
document.querySelector(".menu").addEventListener("click", function (event) {
  const button = event.target.closest(".menu-item");
  if (!button) return;

  const item = MENU.find(function (menu) {
    return menu.id === button.dataset.id;
  });

  if (item.soldOut) {
    showToast("🐈‍⬛ 오늘은 다 팔렸다냥…");
    return;
  }

  openDetail(item);
});

/* 메뉴 상세 창 (4단계에서 완성) */
function openDetail(item) {
  showToast(item.name + " 상세 창은 다음 단계에서 열린다냥");
}

renderMenu();


/* ---------- 2. 카테고리 탭 ---------- */
const topbar   = document.querySelector(".topbar");
const tabsBar  = document.querySelector(".tabs");
const tabs     = [...document.querySelectorAll(".tabs__item")];
const groups   = [...document.querySelectorAll(".menu-group")];

let activeTabId = null;       // 지금 선택된 카테고리 id
let isTabScrolling = false;   // 탭을 눌러 이동하는 중에는 자동 선택을 잠시 멈춤
let scrollEndTimer = null;

/* 상단 바 + 탭 높이 : 메뉴 제목이 이 아래에 오도록 */
function getStickyOffset() {
  return topbar.offsetHeight + tabsBar.offsetHeight;
}

/* 탭 하나를 선택 상태로 바꾸고, 탭 줄 가운데로 보이게 */
function setActiveTab(groupId) {
  if (groupId === activeTabId) return;
  activeTabId = groupId;

  tabs.forEach(function (tab) {
    const isOn = tab.hash === "#" + groupId;
    tab.classList.toggle("is-active", isOn);

    if (isOn) {
      tab.setAttribute("aria-current", "true");
      const left = tab.offsetLeft - (tabsBar.clientWidth - tab.offsetWidth) / 2;
      tabsBar.scrollTo({ left: left, behavior: "smooth" });
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

/* 탭을 누르면 : 바로 선택 표시 → 해당 메뉴 위치로 부드럽게 이동 */
tabs.forEach(function (tab) {
  tab.addEventListener("click", function (event) {
    event.preventDefault();
    const groupId = tab.hash.slice(1);
    const group = document.getElementById(groupId);
    if (!group) return;

    setActiveTab(groupId);
    isTabScrolling = true;

    const top = group.getBoundingClientRect().top + window.scrollY - getStickyOffset();
    window.scrollTo({ top: top, behavior: "smooth" });
  });
});

/* 스크롤하면 : 상단 탭 바로 아래에 걸린 카테고리를 선택 */
function updateTabByScroll() {
  const line = getStickyOffset() + 8;
  let currentId = groups[0].id;

  groups.forEach(function (group) {
    if (group.getBoundingClientRect().top <= line) {
      currentId = group.id;
    }
  });

  setActiveTab(currentId);
}

let scrollTicking = false;
window.addEventListener("scroll", function () {
  /* 탭으로 이동 중이면 스크롤이 멈춘 뒤에 잠금을 푼다 */
  if (isTabScrolling) {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(function () {
      isTabScrolling = false;
    }, 150);
    return;
  }

  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(function () {
      updateTabByScroll();
      scrollTicking = false;
    });
  }
}, { passive: true });

updateTabByScroll();
