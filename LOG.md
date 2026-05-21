# LOG — 台大新聞所 114 學年度畢業典禮邀請函

## 執行說明

### 啟動方式

純靜態網站，無外部依賴（字體 CDN 由 Google Fonts 提供）。

```bash
cd /Users/huanglijue/Documents/114-2/graduation-invitation
python3 -m http.server 8090
```

瀏覽器開 `http://localhost:8090/` 進入入口頁。

或者也可以註冊在 `~/web-dashboard/registry.json` 後，用 `webreg` 統一管理。

### 頁面入口

| URL | 內容 |
|-----|------|
| `/index.html` | 入口頁，三角色卡片，點擊跳轉 |
| `/teacher.html` | 老師版邀請函（深海藍 `#1F3A5F`） |
| `/student.html` | 同學版邀請函（抹茶綠 `#5B8C5A`） |
| `/parent.html` | 家長版邀請函（暖珊瑚 `#C56B4F`） |

### 動畫流程（總長約 11.8 秒）

| 時間（秒） | 事件 |
|----------|------|
| 0.0 – 0.6 | 麂皮底色淡入 |
| 0.6 – 1.8 | 信封從畫面下方升起 |
| 1.8 – 2.6 | 信封上蓋向後翻開 180° |
| 2.6 – 3.4 | 信紙從信封內向上抽出 |
| 3.4 – 4.0 | 信封淡出，信紙留中 |
| 4.0 – 4.5 | 椰子樹刺繡剪影 fade-in |
| 4.5 – 10.8 | 各行文字依序打字機展開 |
| 10.8s 之後 | 右下角顯示「↻ 再播一次」按鈕 |

點擊頁面任意處可加 `.finished` class 跳到終態（目前 CSS 尚未對 `.finished` 做樣式，預留擴充）。

### Placeholder 待替換內容

信紙上以下欄位目前是 placeholder（用 `<span class="ph">` 標記，加底點線視覺提示），需要在資訊定案後手動替換：

- 屆別：`<span class="ph">ⅩⅩ</span>` → 例：`第 38 屆`
- 時間：`<span class="ph">XX:XX – XX:XX</span>` → 例：`14:00 – 16:30`
- 地點：`<span class="ph">地點待定</span>` → 例：`臺大霖澤館國際會議廳`

三份 HTML 都要改。用 grep 找：
```bash
grep -n 'class="ph"' teacher.html student.html parent.html
```

### 修改主色

`css/style.css` 開頭：
```css
body[data-role="teacher"] { --accent: #1F3A5F; --accent-soft: #2D5278; }
body[data-role="student"] { --accent: #5B8C5A; --accent-soft: #7BAC78; }
body[data-role="parent"]  { --accent: #C56B4F; --accent-soft: #D5876B; }
```

入口頁卡片色在同檔的 `.card.teacher / .card.student / .card.parent` 區塊（必須同步改）。

### 行動裝置 / 無動畫適配

- 寬度 < 720px：入口頁三卡片自動垂直堆疊
- 系統設定「減少動態效果」：CSS 偵測 `prefers-reduced-motion: reduce` 後直接跳到終態，不播動畫

### 字體相依

從 Google Fonts CDN 載入：
- **Allura**（英文 cursive 主標）
- **Cormorant Garamond**（英文 serif 副標）
- **Noto Serif TC**（中文標題與內文）

沒網路時會 fallback 到 system serif，視覺會稍弱但不影響閱讀。

---

## 變更紀錄

## 2026-05-21 18:45
- 新增檔案：assets/ntu-emblem.jpg（從 Downloads 複製過來）
- 修改檔案：css/style.css, teacher.html, student.html, parent.html
- 修改內容：
  1. **信紙中央的椰子樹剪影 SVG 換成台大校徽圖片**（國立臺灣大學官方校徽）
  2. CSS .card-decoration 加 `img` 樣式（之前只有 svg）
  3. Vol. 35 → **Vol. 33**（使用者確認的正確屆別號）
  4. 落地頁 index.html 卡片上的小椰子樹保留（90px 縮圖放校徽會看不清楚文字）

## 2026-05-21 18:25
- 修改檔案：teacher.html, student.html, parent.html
- 修改內容：
  1. 英文副文字改成**新聞報紙風**（呼應新聞所主題）：
     - subtitle: `VOL. 35 · FINAL EDITION` / `TAIPEI · 06.06.2026`
     - 左角: `DATELINE / 06.06`；右角: `TAIPEI / TAIWAN`
     - tagline: `ALL THE STORIES WE LIVED — / STAY BEYOND THE PRESS.`
  2. 老師版敬語改成填空格式：`恭請　___老師　蒞臨同慶`（用 .ph dotted underline span 標記填空位置）

## 2026-05-21 18:00
- 修改檔案：css/style.css, index.html, teacher.html, student.html, parent.html
- 修改內容：
  1. **品牌標題** Summer Appointment → **NTU Journalism**（cursive 大標 + 信封蓋 cursive 都換）
  2. **三角色用三種顏色**：老師杏桃粉 / 同學湖水藍 / 家長香檳米。每個角色 body[data-role] 自己一組 CSS 變數（envelope-paper / accent / accent-deep / ink）。信紙上 cursive、椰子樹、divider 等主色都跟信封同色，內文小字用同色系深一階保持可讀
  3. 家長版的香檳米信封跟原本米色場景會混，所以家長版 scene-bg 改成深一階米色 #ede0c0；信紙 accent 改用金色 #b8975e（米紙上米色看不見，用同色系深色）
  4. **英文文案改成畢業主題**：
     - subtitle: A coconut falling / summer gathering → **A summer farewell — the prelude to a thousand journeys.**
     - tagline: TAKE A MOMENT FOR YOU / INNER PEACE → **ONE CHAPTER CLOSES — ANOTHER OPENS WIDE.**
     - 兩角小字 A SEAT IN THE / COCONUT BREEZE → **CLASS OF 2026 / ONE LAST GATHERING**
  5. **中文邀請正文**（使用者提供確認資訊）：
     - 國立臺灣大學新聞研究所
     - 114 學年度畢業典禮
     - 2026.06.06（六）13:00 — 17:00
     - 臺大新聞研究所　攝影棚
  6. **三角色敬語**（較有情感的版本）：
     - 老師：恭請 指導老師　蒞臨同慶
     - 同學：致　即將揚帆的你
     - 家長：恭請 畢業生家長　共見此刻
  7. 首頁 index.html landing 卡片三色預覽（杏桃粉 / 湖水藍 / 香檳米），cursive header 也改 NTU Journalism

## 2026-05-21 17:25
- 修改檔案：css/style.css, index.html
- 修改內容：**配色嚴重錯誤修正**。使用者提供的主視覺三色是「杏桃粉 #f6bfac、香檳米 #f9f2d6、湖水藍 #92d9e1」，但我把 `#92d9e1` 看成 `#92d921`，整個專案一直用萊姆綠！修正：
  - `#92d921` 萊姆綠 → `#92d9e1` **湖水藍**（主視覺第三色）
  - `#5c8a14` 深萊姆 → `#4a9ba5` 深湖水藍（accent-deep）
  - `#2F4A1E` 深森林綠 → `#1f4d56` 深湖水藍系（body text ink）
- 也更新所有 CSS 註解，把「lime」「forest green」換成「湖水藍 / lake blue / teal」

## 2026-05-21 17:00
- 修改檔案：css/style.css
- 修改內容：使用者反映翻蓋移動速度和信封身體不一致。根因：
  - `.envelope-flap` 設了 `transform-origin: top center`（蓋的旋轉軸在頂部）
  - `.envelope-back/right/left` 沒設，預設用 `center center`
  - 同樣的 scale(1.5) 動畫，翻蓋從頂部放大、信封身體從中央放大，導致信封頂部往上漲開但翻蓋的軸卻在原地，兩者視覺上脫節
- 修法：把所有信封 part 統一加 `transform-origin: top center`，scale 都以頂部為軸，蓋和身體始終共用同一個頂部 hinge 點

## 2026-05-21 16:30
- 修改檔案：css/style.css
- 修改內容：使用者反映配色不好看（場景太深、萊姆綠太搶）。重新調整：
  - **場景背景**從深森林綠 #1f2b15 改成**暖奶米漸層**（--scene-bg #f9f2d6、--scene-bg-light #fcf6e1、--scene-bg-deep #f1e7c0），三色都是奶米相近色，去掉水平線斷層
  - **信紙**從 #f9f2d6 微調成更亮的 ivory #fdfaeb（和場景奶米有微差，仍是奶米色系但更亮，當紙張更明顯）
  - 場景 ::before 丹寧織紋去掉（深色設計用的，淺底會像髒點）
  - 場景 ::after 噪點從 16% 黑降到 8% 棕黃 + multiply blend mode，溫和的紙紋
  - **小 UI 元件文字色**全部從 `--card-paper`（淺色）改成 `--ink` 深森林綠 #2F4A1E（back-link、role-badge、replay-btn）
  - replay-btn 樣式整體 invert：邊框用深綠、底色淡綠、hover 變實心萊姆綠
  - 整體視覺改成「淺色奶米場景 + 蜜桃信封 + 萊姆綠主色」的夏日風格，去掉深綠背景的沉重感

## 2026-05-21 16:00
- 修改檔案：css/animation.css, css/style.css, js/invitation.js
- 修改內容：翻蓋打開動作之前看不見（因為和信封下沉同時發生），改成**先在中央旋轉翻蓋，旋轉完成後才開始整體下沉**
  - 動畫總長 2.4s → **3.0s**
  - keyframes 從 0%→100% 線性 → 加入 30% 中段點：
    - 0-30%（0.6s-1.5s 絕對時間）：翻蓋從 0° 旋轉到 190°，信封身體保持在中央不動
    - 30-100%（1.5s-3.6s）：信封整體（蓋+身體）一起往下沉 + 放大 1.5x
  - 信紙生長延遲從 1.4s 改成 1.8s（等翻蓋旋轉動作看完才開始）
  - JS opening 從 3.6s 改成 4.0s（等所有東西都完成）

## 2026-05-21 15:35
- 修改檔案：css/style.css
- 修改內容：信封改成豎軸長方形（直立式信封）
  - 信封 aspect 從 13/5（橫式）→ 9/14（直式，高 > 寬）
  - 寬度 min(62vw, 280px)，高度 = 寬 × 14/9
  - **翻蓋只占信封頂部 30%**（之前是 50%）
  - V 開口的 apex 從信封正中央移到 envelope-y 30%（接近頂部）
  - 兩側 envelope-right/envelope-left 不再是純三角形，改成四邊形 clip：`polygon(0 0, 50% 30%, 50% 100%, 0 100%)` 和右邊鏡像，V 斜邊只在頂部 30%，下方 70% 是直邊
  - 信紙寬度 min(54vw, 240px)（< 信封寬 280），初始高度 = 信封高 × 70%（下方 70%，被兩側遮住）
  - 用 CSS 變數 --env-w / --env-h / --card-w 統一管理尺寸
  - flap-cursive 字體調小（24px max），位置移到信封頂部 6-14% 範圍（翻蓋區域內）

## 2026-05-21 15:10
- 修改檔案：css/animation.css, css/style.css, js/invitation.js
- 修改內容：信封打開後**整體一起下沉+變大**，蓋和身體不分離
  - 改用 keyframes 取代單一 transition：
    - `envelopeSink` 0→100% 對 back/right/left：translate -50%/-50% → -50%/(-50%+100vh)，scale 1→1.5
    - `flapSinkOpen` 0→35%→100% 對 flap：把 rotateX 0→190° 嵌進前 35% 時間軸，後續 35→100% 只繼續下沉+放大
    - 兩個動畫用相同 duration 2.4s + delay 0.6s + cubic-bezier，所以蓋和身體在所有時刻 translate/scale 完全同步，視覺上是一體
  - 結果：t=0.6s 信封開始下沉，蓋在 35% 時間軸（t=1.44s）旋轉完成，t=3.0s 整個信封離開畫面
  - flap-cursive 「Summer Appointment」字體也跟著信封同步移動 + 在 35% 完成淡出
  - 信紙初始高度改成「信封高度的一半」（只在信封下半部，被兩側三角形完全遮住）
  - JS opening 延後到 3.6s（等信封完全離開）

## 2026-05-21 14:50
- 修改檔案：css/style.css, css/animation.css, js/invitation.js
- 修改內容：依使用者澄清重新思考畫面邏輯
  - 信封放大：width 88%→94%, max 410→440px
  - 信紙寬度永遠 < 信封寬度（width 75-78%, max 360）
  - 信紙初始尺寸：寬 78%，**高度 = 信封高度**，bottom 錨在信封底部
  - 信紙永遠 overflow: hidden，初始狀態整張紙就是信封大小一個小方塊，藏在信封 z-layer 之間
  - 三階段尺寸動畫：
    - 初始：寬 78%、高 = 信封高（隱藏在信封內）
    - body.playing（t=1.4s）：高度長到 62%（紙張往上延伸，bottom 錨點不動）
    - body.opening（t=3.4s）：bottom→0, width→100%, height→100%, padding→14%/9% — 紙張變全屏
  - 內文 fade-in 改在 body.opening 觸發（紙張變大後才浮現），delay 從 0.4s 開始

## 2026-05-20 19:25
- 修改檔案：css/style.css, css/animation.css, teacher.html, student.html, parent.html
- 修改內容：**修 z-stacking 順序**（使用者指出紙張應該在 sides 下、flap 上，像人從信封中抽信紙）
  - envelope-back z 1
  - envelope-flap z 2 ← 在 card 之下
  - **card z 3** ← 中間
  - envelope-right z 4 ← 在 card 之上
  - envelope-left z 4 ← 在 card 之上
- 移除外層 .envelope 容器（會建立 stacking context，蓋掉子元素 z-index），改成 envelope-back / flap / right / left 都當 .scene 的 sibling
- 紙張改用 translateY 100% → 0 的滑入動畫（1.4s 延遲，等蓋翻開後才開始滑），下半部會被兩個側三角形遮住，模擬被信封口夾住的感覺
- 信封離場時 envelope-back + flap + right + left 同步往下沉

## 2026-05-20 19:00
- 修改檔案：css/style.css, css/animation.css, teacher.html, student.html, parent.html
- 修改內容：信封結構改用網路上 codewebstack 3D envelope tutorial 的兩三角形 pattern（之前自己用 clip-path 切 V 的做法完全錯）
  1. **新結構**：`.envelope` 容器（含信封背景）內含
     - `.envelope-flap`（上半，clip 成下指三角，z-index 3）— 信封蓋
     - `.envelope-right`（覆全 rect，clip 成右下三角，z-index 4）
     - `.envelope-left`（覆全 rect，clip 成左下三角，z-index 4）
     - 兩個側三角形於中央碰頭，**頂部自然形成 V 形開口**，蓋翻開時露出 V opening
  2. flap 旋轉到 rotateX(190deg)（略過 180°）藏到信封背後
  3. card z-index 2，在所有信封 part 底下（z 5 是 envelope 容器）；用 opacity + scale 控制顯隱與放大
  4. 動畫：信封中央 → 蓋翻 190° → 信封整體 sinks 1.4x + fade（body.opening）→ 紙張同步從 scale 0.4 opacity 0 過渡到 scale 1 opacity 1 → 內文逐行
  5. 移除舊的 envelope-back / envelope-pocket DOM 元素

## 2026-05-20 18:35
- 修改檔案：css/style.css, css/animation.css, js/invitation.js
- 修改內容：信封定位 + 圖層問題修正
  1. **信封改為畫面中央起始**（top: 50%, translate -50%/-50%），不再黏底部
  2. **修信封蓋層級**：原本 flap 永遠 z-index 4，翻開後還會擋住卡片。改成 `flapZBack` keyframes 在旋轉中段（50%）把 z-index 從 5 降到 0，旋轉後就退到所有元素後面
  3. **新動畫流程**：信封中央 → 蓋翻開（蓋同時下沉 z-index）→ 信封整體往下沉 + 放大 + 淡出 → 紙張從 scale(0.35) opacity 0 同步放大 + 浮現 → 紙張內文逐行淡入
  4. **紙張改成永遠 fullscreen layout**（top:0 width:100% height:100%），只用 scale + opacity 控制視覺呈現，避免 width/height 過渡時 content reflow
  5. 內文字級加 `!important` 鎖死，不再受舊的 body.fullscreen 規則影響
  6. JS sequence 縮成兩步：`playing`（0ms，蓋翻開）→ `opening`（1800ms，信封離開 + 紙張放大）

## 2026-05-20 18:10
- 修改檔案：css/style.css, css/animation.css, js/invitation.js, index.html, teacher.html, student.html, parent.html
- 修改內容：
  1. **配色全部換成主視覺三色**：`#f6bfac` 蜜桃（信封）/ `#f9f2d6` 奶米（紙張）/ `#92d921` 萊姆綠（主色）；補一個深森林綠 `#2F4A1E` 作為內文易讀色。三個角色版本不再變色，視覺一致，只差結尾敬語。
  2. **所有文字搬到紙張上**：原本場景下方的 TAKE A MOMENT 標語 + 國立臺灣大學新聞研究所等中文邀請資訊，現在全部凹印在紙張上（用 `.card-tagline / .card-divider / .card-invitation` 三個新區塊）。
  3. **動畫流程重做**：
     - 0.0-0.6s：場景淡入（信封閉合，「Summer Appointment」cursive 顯示在信封蓋上）
     - 0.6-1.6s：信封蓋向後翻 180° 打開
     - 1.4-2.4s：紙張從信封內向上抽出
     - 2.4s 後文字逐項浮現
     - 2.6s 起：信封（back+pocket+flap）放大 1.45x + 向下平移 + 淡出退場
     - 3.0s 起：紙張過渡至 width/height 100%、border-radius 0、padding 變大，佔滿整個畫布
     - 5.4s 後顯示 ↻ 再播按鈕
  4. 結構重組：信封從巢狀 envelope-wrap 攤平成 .envelope-back / .envelope-pocket / .envelope-flap 三個 scene 的直接子元素，搭配 z-index 1/3/4 讓卡片（z-index 2）夾在中間。
  5. 信封口袋 clip-path 改成 `polygon(0 0, 50% 90%, 100% 0, 100% 100%, 0 100%)`，跟 flap 三角形完美對齊（flap apex 90% 對應 pocket V 谷底 90%）。

## 2026-05-20 17:35
- 修改檔案：css/style.css, teacher.html, student.html, parent.html
- 修改內容：改成**直式手機畫布**。body 變 flex 置中，scene 寬度卡 460px、高度卡 100vh（≤ 460×997 phone ratio），桌面上自動置中、兩側深黑 letterbox、四角圓 28px。手機上滿版。所有控制元素（back-link / role-badge / replay-btn）從 fixed 改 absolute 放進 scene 裡，跟著手機畫布。envelope 位置從 48% 上移到 42%，tagline 與中文邀請資訊的定位改成相對 % 而非絕對 px。

## 2026-05-20 17:10
- 修改檔案：css/style.css, css/animation.css, js/invitation.js, index.html, teacher.html, student.html, parent.html
- 新增檔案：assets/palm-island.svg, assets/horizon-figure.svg
- 修改內容：依照使用者第二批參考圖（深藍丹寧場景 + 淡藍紙信封 + 麂皮卡片）做大幅重新設計。
  原本只有麂皮米白底，現在改成：
    1. 全螢幕**丹寧質感場景背景**（含水平線、極淡 turbulence 顆粒、織紋）
    2. 場景中央放**淡色紙信封**（橫向，背面 / 口袋 / 上蓋三層結構）
    3. 卡片從信封口袋裡升起、上蓋向後翻 180°
    4. 場景下方加「TAKE A MOMENT FOR YOU / COME TO FIND YOUR INNER PEACE」標語 + 微小划船人剪影
    5. 中文邀請資訊放在最下方
  三角色版本現在連場景底色 + 信封色 + 卡片色都隨主色切換：
    - 老師版：深藍丹寧場景 + 淡藍信封 + 暖米卡片 + 深青藍凹印
    - 同學版：森林綠場景 + 淡綠信封 + 暖米卡片 + 深苔綠凹印
    - 家長版：深咖場景 + 米褐信封 + 淺褐卡片 + 鏽紅凹印（最接近參考圖第四張）
  動畫流程從 11.8 秒縮短到 6.5 秒：場景淡入 → 信封蓋翻開 → 卡片升起 → 標語浮現 → 中文資訊逐行淡入。

## 2026-05-20 16:55
- 建立檔案：CLAUDE.md, LOG.md, index.html, teacher.html, student.html, parent.html, css/style.css, css/animation.css, js/invitation.js, assets/palm-tree.svg, assets/suede-noise.svg
- 修改內容：初版建立。依照使用者參考的「赴夏之約 Summer Appointment」抖音畫面風格，做台大新聞所 114 學年度畢業典禮邀請函網頁。麂皮底 + 椰子樹刺繡 + 凹印文字 + 信封開封打字機動畫。三角色版本（老師深海藍 / 同學抹茶綠 / 家長暖珊瑚）共用 CSS，靠 `body[data-role]` 屬性切換主色。
