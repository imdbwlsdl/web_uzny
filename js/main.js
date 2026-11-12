/* =====================================================
   달빛 카페 – 화면 동작
   1. 카테고리 탭 : 누르면 해당 메뉴로 이동 + 선택 표시
                    스크롤하면 지금 보이는 카테고리 탭이 자동 선택
   ===================================================== */


/* ---------- 1. 카테고리 탭 ---------- */
const topbar   = document.querySelector(".topbar");
const tabsBar  = document.querySelector(".tabs");
const tabs     = [...document.querySelectorAll(".tabs__item")];
const groups   = [...document.querySelectorAll(".menu-group")];

let activeTabId = null;   // 지금 선택된 카테고리 id
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
