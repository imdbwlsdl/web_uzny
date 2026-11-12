/* =====================================================
   달빛 카페 – 메뉴 데이터
   메뉴 추가·가격 변경·품절은 이 파일만 고치면 된다.

   1. 카페 설정       CAFE
   2. 카테고리        CATEGORIES
   3. 메뉴 46개       MENU
   4. 옵션            OPTIONS, getOptionKeys()
   5. 카페 정보       CAFE_INFO
   ===================================================== */


/* ---------- 1. 카페 설정 ---------- */
const CAFE = {
  name: "달빛 카페",
  tableCount: 10          // 테이블 1~10번 (QR 주소 ?table=1 ~ ?table=10)
};


/* ---------- 2. 카테고리 ----------
   탭과 메뉴판 순서. auto 가 있는 카테고리는 메뉴를 직접 넣지 않고
   tags 가 붙은 메뉴를 자동으로 모아서 보여준다.                      */
const CATEGORIES = [
  { id: "recommend",    name: "추천",       icon: "⭐", auto: "recommend" },
  { id: "sale",         name: "할인",       icon: "🏷", auto: "sale" },
  { id: "signature",    name: "시그니처",   icon: "🌙" },
  { id: "coffee",       name: "커피",       icon: "☕" },
  { id: "noncoffee",    name: "논커피·티",  icon: "🍵" },
  { id: "trad-drink",   name: "전통 음료",  icon: "🏮" },
  { id: "dessert",      name: "디저트",     icon: "🍰" },
  { id: "trad-dessert", name: "전통 디저트", icon: "🏮" }
];


/* ---------- 3. 메뉴 ----------
   id          : 영문 고유 이름 (장바구니·이미지 파일 이름에 사용)
   name / en   : 메뉴 이름 / 영문 이름
   category    : 위 CATEGORIES 의 id
   kind        : "drink"(음료) / "dessert"(디저트) → 옵션 결정에 사용
   price       : 원래 가격 (원)
   salePrice   : 할인 가격 (할인 메뉴만)
   temps       : 고를 수 있는 온도 (디저트는 [])
   shot        : true 면 샷 추가 가능
   tags        : "recommend"(추천) / "sale"(할인) / "signature"(시그니처)
   soldOut     : true 면 품절
   desc        : 한 줄 설명
   (사진은 8단계에서 images/cafe/ 에 id 이름으로 추가)                 */
const MENU = [

  /* ☕ 커피 (8) */
  { id: "espresso",       name: "에스프레소",       en: "Espresso",          category: "coffee", kind: "drink", price: 3000, temps: ["HOT"],        shot: true,  tags: [],            soldOut: false, desc: "진하게 내린 기본 에스프레소" },
  { id: "americano",      name: "아메리카노",       en: "Americano",         category: "coffee", kind: "drink", price: 3500, salePrice: 3000, temps: ["HOT", "ICE"], shot: true, tags: ["sale"], soldOut: false, desc: "깔끔하고 고소한 기본 커피" },
  { id: "cafe-latte",     name: "카페라떼",         en: "Caffè Latte",       category: "coffee", kind: "drink", price: 4000, temps: ["HOT", "ICE"], shot: true,  tags: [],            soldOut: false, desc: "에스프레소에 부드러운 우유" },
  { id: "vanilla-latte",  name: "바닐라라떼",       en: "Vanilla Latte",     category: "coffee", kind: "drink", price: 4500, temps: ["HOT", "ICE"], shot: true,  tags: [],            soldOut: false, desc: "달콤한 바닐라 시럽을 더한 라떼" },
  { id: "caramel-macchiato", name: "카라멜 마키아토", en: "Caramel Macchiato", category: "coffee", kind: "drink", price: 4800, temps: ["HOT", "ICE"], shot: true, tags: [],         soldOut: false, desc: "카라멜 소스를 올린 라떼" },
  { id: "cafe-mocha",     name: "카페모카",         en: "Caffè Mocha",       category: "coffee", kind: "drink", price: 4800, temps: ["HOT", "ICE"], shot: true,  tags: [],            soldOut: false, desc: "초콜릿과 에스프레소, 휘핑크림" },
  { id: "cold-brew",      name: "콜드브루",         en: "Cold Brew",         category: "coffee", kind: "drink", price: 4500, temps: ["ICE"],        shot: false, tags: [],            soldOut: false, desc: "차갑게 오래 우려낸 부드러운 커피" },
  { id: "einspanner",     name: "아인슈페너",       en: "Einspänner",        category: "coffee", kind: "drink", price: 5000, temps: ["ICE"],        shot: true,  tags: ["recommend"], soldOut: false, desc: "진한 커피 위에 달콤한 크림" },

  /* 🍵 논커피·티 (10) */
  { id: "choco-latte",    name: "초코라떼",         en: "Chocolate Latte",   category: "noncoffee", kind: "drink", price: 4500, temps: ["HOT", "ICE"], shot: false, tags: [], soldOut: false, desc: "진한 초콜릿 우유" },
  { id: "green-tea-latte", name: "녹차라떼",        en: "Green Tea Latte",   category: "noncoffee", kind: "drink", price: 4800, temps: ["HOT", "ICE"], shot: false, tags: [], soldOut: false, desc: "쌉싸름한 녹차와 우유" },
  { id: "sweet-potato-latte", name: "고구마라떼",   en: "Sweet Potato Latte", category: "noncoffee", kind: "drink", price: 4800, temps: ["HOT"],       shot: false, tags: [], soldOut: false, desc: "달콤하고 든든한 고구마 라떼" },
  { id: "lemonade",       name: "레몬에이드",       en: "Lemonade",          category: "noncoffee", kind: "drink", price: 5000, salePrice: 4000, temps: ["ICE"], shot: false, tags: ["sale"], soldOut: false, desc: "상큼한 레몬과 탄산" },
  { id: "grapefruit-ade", name: "자몽에이드",       en: "Grapefruit Ade",    category: "noncoffee", kind: "drink", price: 5000, temps: ["ICE"],        shot: false, tags: [], soldOut: false, desc: "쌉싸름하고 상큼한 자몽" },
  { id: "green-grape-ade", name: "청포도에이드",    en: "Green Grape Ade",   category: "noncoffee", kind: "drink", price: 5000, temps: ["ICE"],        shot: false, tags: [], soldOut: false, desc: "달콤한 청포도와 탄산" },
  { id: "earl-grey",      name: "얼그레이 티",      en: "Earl Grey Tea",     category: "noncoffee", kind: "drink", price: 4000, temps: ["HOT", "ICE"], shot: false, tags: [], soldOut: false, desc: "베르가못 향의 홍차" },
  { id: "chamomile",      name: "캐모마일 티",      en: "Chamomile Tea",     category: "noncoffee", kind: "drink", price: 4000, temps: ["HOT"],        shot: false, tags: [], soldOut: false, desc: "잠들기 전 마시기 좋은 꽃차" },
  { id: "peppermint",     name: "페퍼민트 티",      en: "Peppermint Tea",    category: "noncoffee", kind: "drink", price: 4000, temps: ["HOT", "ICE"], shot: false, tags: [], soldOut: false, desc: "시원하고 깔끔한 허브차" },
  { id: "citron-tea",     name: "유자차",           en: "Citron Tea",        category: "noncoffee", kind: "drink", price: 4500, temps: ["HOT", "ICE"], shot: false, tags: [], soldOut: false, desc: "달콤하고 향긋한 유자" },

  /* 🏮 전통 음료 (8) */
  { id: "mugwort-latte",  name: "쑥라떼",           en: "Mugwort Latte",     category: "trad-drink", kind: "drink", price: 5000, temps: ["HOT", "ICE"], shot: false, tags: ["recommend"], soldOut: false, desc: "향긋한 쑥과 우유, 고소한 마무리" },
  { id: "black-sesame-latte", name: "흑임자라떼",   en: "Black Sesame Latte", category: "trad-drink", kind: "drink", price: 5000, temps: ["HOT", "ICE"], shot: false, tags: [],         soldOut: false, desc: "검은깨를 곱게 갈아 넣은 고소한 라떼" },
  { id: "misutgaru-latte", name: "미숫가루라떼",    en: "Misutgaru Latte",   category: "trad-drink", kind: "drink", price: 4800, temps: ["ICE"],        shot: false, tags: [],            soldOut: false, desc: "곡물 가루와 우유, 든든한 한 잔" },
  { id: "jujube-tea",     name: "대추차",           en: "Jujube Tea",        category: "trad-drink", kind: "drink", price: 5500, temps: ["HOT"],        shot: false, tags: [],            soldOut: false, desc: "오래 달여 진하고 달큰한 대추차" },
  { id: "ssanghwa-tea",   name: "쌍화차",           en: "Ssanghwa Tea",      category: "trad-drink", kind: "drink", price: 5500, temps: ["HOT"],        shot: false, tags: [],            soldOut: false, desc: "견과류를 띄운 따뜻한 한방차" },
  { id: "omija-ade",      name: "오미자에이드",     en: "Omija Ade",         category: "trad-drink", kind: "drink", price: 5500, temps: ["ICE"],        shot: false, tags: [],            soldOut: false, desc: "다섯 가지 맛이 나는 붉은 오미자" },
  { id: "sikhye",         name: "식혜",             en: "Sikhye",            category: "trad-drink", kind: "drink", price: 4500, temps: ["ICE"],        shot: false, tags: [],            soldOut: false, desc: "살얼음 띄운 달콤한 쌀 음료" },
  { id: "sujeonggwa",     name: "수정과",           en: "Sujeonggwa",        category: "trad-drink", kind: "drink", price: 4500, temps: ["ICE"],        shot: false, tags: [],            soldOut: false, desc: "계피와 생강 향의 곶감 음료" },

  /* 🌙 시그니처 음료 (3) */
  { id: "moonlight-latte", name: "달빛 라떼",       en: "Moonlight Latte",   category: "signature", kind: "drink", price: 5800, temps: ["HOT", "ICE"], shot: true,  tags: ["signature", "recommend"], soldOut: false, desc: "꿀과 바닐라를 더한 노란 달빛 라떼" },
  { id: "night-sky-ade",  name: "밤하늘 에이드",    en: "Night Sky Ade",     category: "signature", kind: "drink", price: 6000, temps: ["ICE"],        shot: false, tags: ["signature"], soldOut: false, desc: "레몬을 넣으면 파랑에서 보라로 바뀌는 에이드" },
  { id: "milky-way-milk-tea", name: "은하수 밀크티", en: "Milky Way Milk Tea", category: "signature", kind: "drink", price: 5800, temps: ["HOT", "ICE"], shot: false, tags: ["signature"], soldOut: false, desc: "흑당 펄이 별처럼 흐르는 밀크티" },

  /* 🌙 시그니처 디저트 (2) */
  { id: "full-moon-castella", name: "보름달 카스텔라", en: "Full Moon Castella", category: "signature", kind: "dessert", price: 6500, temps: [], shot: false, tags: ["signature"], soldOut: true,  desc: "동그란 카스텔라 위에 노란 커스터드 크림" },
  { id: "crescent-croissant", name: "초승달 크루아상", en: "Crescent Croissant", category: "signature", kind: "dessert", price: 4800, temps: [], shot: false, tags: ["signature"], soldOut: false, desc: "꿀 버터를 바른 초승달 모양 크루아상" },

  /* 🍰 디저트 (9) */
  { id: "ny-cheesecake",  name: "뉴욕 치즈케이크",  en: "New York Cheesecake", category: "dessert", kind: "dessert", price: 5500, temps: [], shot: false, tags: [],            soldOut: false, desc: "진하고 꾸덕한 치즈케이크" },
  { id: "tiramisu",       name: "티라미수",         en: "Tiramisu",          category: "dessert", kind: "dessert", price: 6000, temps: [], shot: false, tags: ["recommend"], soldOut: false, desc: "커피 향 가득한 마스카포네 케이크" },
  { id: "brownie",        name: "초코 브라우니",    en: "Chocolate Brownie", category: "dessert", kind: "dessert", price: 4000, temps: [], shot: false, tags: [],            soldOut: false, desc: "촉촉하고 진한 초콜릿" },
  { id: "croissant",      name: "크루아상",         en: "Croissant",         category: "dessert", kind: "dessert", price: 3800, salePrice: 3000, temps: [], shot: false, tags: ["sale"], soldOut: false, desc: "겹겹이 바삭한 버터 크루아상" },
  { id: "salt-bread",     name: "소금빵",           en: "Salt Bread",        category: "dessert", kind: "dessert", price: 3000, temps: [], shot: false, tags: ["recommend"], soldOut: false, desc: "겉은 바삭, 속은 버터 가득" },
  { id: "scone",          name: "스콘",             en: "Scone",             category: "dessert", kind: "dessert", price: 3500, temps: [], shot: false, tags: [],            soldOut: false, desc: "잼과 크림을 곁들인 플레인 스콘" },
  { id: "macaron",        name: "마카롱",           en: "Macaron",           category: "dessert", kind: "dessert", price: 2500, temps: [], shot: false, tags: [],            soldOut: false, desc: "쫀득한 꼬끄의 한입 디저트" },
  { id: "financier",      name: "휘낭시에",         en: "Financier",         category: "dessert", kind: "dessert", price: 2800, temps: [], shot: false, tags: [],            soldOut: false, desc: "고소한 버터 향의 구움과자" },
  { id: "choco-chip-cookie", name: "초코칩 쿠키",   en: "Chocolate Chip Cookie", category: "dessert", kind: "dessert", price: 2500, temps: [], shot: false, tags: [],        soldOut: false, desc: "큼직한 초코칩이 박힌 쿠키" },

  /* 🏮 전통 디저트 (6) */
  { id: "yakgwa",         name: "약과 (2개)",       en: "Yakgwa",            category: "trad-dessert", kind: "dessert", price: 3500, temps: [], shot: false, tags: ["recommend"], soldOut: false, desc: "꿀에 절인 쫀득한 전통 과자" },
  { id: "injeolmi",       name: "인절미",           en: "Injeolmi",          category: "trad-dessert", kind: "dessert", price: 4500, temps: [], shot: false, tags: [],            soldOut: false, desc: "콩고물 듬뿍 묻힌 쫄깃한 떡" },
  { id: "gaeseong-juak",  name: "개성주악 (2개)",   en: "Gaeseong Juak",     category: "trad-dessert", kind: "dessert", price: 4000, temps: [], shot: false, tags: [],            soldOut: true,  desc: "겉은 바삭, 속은 쫀득한 찹쌀 도넛" },
  { id: "persimmon-roll", name: "곶감호두말이",     en: "Persimmon Walnut Roll", category: "trad-dessert", kind: "dessert", price: 5000, temps: [], shot: false, tags: [],        soldOut: false, desc: "곶감에 호두를 말아 썬 다과" },
  { id: "sesame-yanggaeng", name: "흑임자 양갱",    en: "Black Sesame Yanggaeng", category: "trad-dessert", kind: "dessert", price: 3500, salePrice: 3000, temps: [], shot: false, tags: ["sale"], soldOut: false, desc: "고소하고 진한 흑임자 양갱" },
  { id: "honey-rice-cake", name: "꿀떡",            en: "Honey Rice Cake",   category: "trad-dessert", kind: "dessert", price: 3500, temps: [], shot: false, tags: [],            soldOut: false, desc: "한입에 꿀이 톡 터지는 떡" }
];


/* ---------- 4. 옵션 ----------
   type "choice" : 하나 고르기 (default 가 처음 선택값)
   type "text"   : 직접 입력
   price         : 그 선택지를 고르면 1개당 더해지는 금액               */
const OPTIONS = {
  temp: {
    label: "온도",
    type: "choice",
    choices: [
      { value: "HOT", label: "HOT" },
      { value: "ICE", label: "ICE" }
    ]
  },
  size: {
    label: "사이즈",
    type: "choice",
    default: "regular",
    choices: [
      { value: "regular", label: "레귤러" },
      { value: "large",   label: "라지", price: 500 }
    ]
  },
  shot: {
    label: "샷 추가",
    type: "choice",
    default: "0",
    choices: [
      { value: "0", label: "없음" },
      { value: "1", label: "1샷", price: 500 },
      { value: "2", label: "2샷", price: 1000 }
    ]
  },
  ice: {
    label: "얼음",
    type: "choice",
    default: "normal",
    choices: [
      { value: "more",   label: "많이" },
      { value: "normal", label: "보통" },
      { value: "less",   label: "적게" },
      { value: "none",   label: "없음" }
    ]
  },
  packing: {
    label: "포장",
    type: "choice",
    default: "here",
    choices: [
      { value: "here",     label: "매장" },
      { value: "takeaway", label: "포장" }
    ]
  },
  request: {
    label: "기타 요청",
    type: "text",
    placeholder: "예: 시럽 적게, 덜 달게",
    maxLength: 50
  }
};

/* 메뉴에 맞는 옵션 이름 목록을 돌려준다.
   temp : 지금 고른 온도 (얼음 옵션은 ICE 일 때만 보임)

   음료  : 온도(둘 다 될 때) · 사이즈 · 샷(shot 메뉴) · 얼음(ICE) · 포장 · 기타 요청
   디저트: 포장 · 기타 요청                                           */
function getOptionKeys(item, temp) {
  const keys = [];

  if (item.kind === "drink") {
    if (item.temps.length > 1) keys.push("temp");
    keys.push("size");
    if (item.shot) keys.push("shot");

    const currentTemp = temp || item.temps[0];
    if (currentTemp === "ICE") keys.push("ice");
  }

  keys.push("packing", "request");
  return keys;
}


/* ---------- 5. 카페 정보 (ⓘ 창) ----------
   주소·전화·비밀번호·SNS 는 예시 값                                  */
const CAFE_INFO = [
  { label: "영업시간",    value: "매일 11:00 ~ 22:00" },
  { label: "라스트 오더", value: "21:30" },
  { label: "휴무일",      value: "매주 월요일" },
  { label: "위치",        value: "경북 경주시 ○○로 (동궁과 월지 도보 5분)" },
  { label: "전화",        value: "054-000-0000" },
  { label: "와이파이",    value: "DALBIT_CAFE / wolji1234" },
  { label: "화장실",      value: "1층 복도 끝 / 비밀번호 1234*" },
  { label: "주차",        value: "건물 뒤 공영주차장 2시간 무료" },
  { label: "콘센트 좌석", value: "창가, 벽 바 테이블" },
  { label: "SNS",         value: "인스타그램 @dalbit_cafe" }
];

const CAT_NOTICE = "월이에게 간식을 함부로 주지 마세요 (살쪄요 ㅜㅜ)";
