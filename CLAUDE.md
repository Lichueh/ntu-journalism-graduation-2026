# 台大新聞研究所 114 學年度畢業典禮邀請函

## 專案目的

設計給台大新聞研究所 114 學年度畢業典禮使用的數位邀請函網頁。視覺風格參考社群上流行的「赴夏之約 Summer Appointment」抖音畫面——白色麂皮底色 + 椰子樹刺繡剪影 + 凹印文字效果 + 信封開封動畫——做成可直接寄連結的 HTML 邀請函。

依收件人身份分為三個版本，主色不同：
- **老師版**（`teacher.html`）：深海藍 `#1F3A5F`，莊重沉穩
- **同學版**（`student.html`）：抹茶綠 `#5B8C5A`，青春活力
- **家長版**（`parent.html`）：暖珊瑚 `#C56B4F`，溫暖親切

固定不變的部分：麂皮米白底（`#F4EDE0`）、椰子樹剪影造型、信封比例 3:4、動畫順序。

## 目錄結構

```
graduation-invitation/
├── CLAUDE.md           ← 本檔
├── LOG.md              ← 執行說明與變更紀錄
├── index.html          ← 入口頁，三角色卡片選單
├── teacher.html        ← 老師版邀請函
├── student.html        ← 同學版邀請函
├── parent.html         ← 家長版邀請函
├── css/
│   ├── style.css       ← 共用樣式（麂皮、信封、信紙、字體、卡片）
│   └── animation.css   ← 動畫序列 keyframes（11.8 秒完整流程）
├── js/
│   └── invitation.js   ← 動畫播放控制 + 再播一次按鈕
└── assets/
    ├── palm-tree.svg   ← 椰子樹刺繡剪影（含針腳虛線）
    └── suede-noise.svg ← 麂皮顆粒紋路（feTurbulence）
```

## 三個角色版本的差異

三份 HTML 結構幾乎一樣，差別只有四處：
1. `<body data-role="teacher|student|parent">` 屬性切換 CSS 變數 `--accent`
2. `<title>` 標題裡的角色名稱
3. 右上角 `.role-badge` 文字（For Mentors / For Graduates / For Families）
4. 信紙結尾敬語（敬邀 指導老師 / 致 親愛的畢業生 / 敬邀 畢業生家長）

需要修改主色時，改 `css/style.css` 開頭三行 `body[data-role="..."]`。

## 執行方式與變更紀錄

請見 `LOG.md`。
