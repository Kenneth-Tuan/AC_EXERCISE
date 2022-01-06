
## 餐廳清單

### Features - 產品功能
1. 使用者可以瀏覽全部所有餐廳
2. 使用者可以依照中文名稱進行搜尋
3. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介

### Environment SetUp - 環境建置
1. Node.js

### Installing - 專案安裝流程
1. 開啟終端機(Terminal)cd 到存放專案本機位置並執行:

`git clone https://github.com/Eason0in/Restaurant-CRUD.git`

2. 初始

`cd Restaurant-CRUD  //切至專案資料夾`

`npm install  //安裝套件`

3. 產生預設使用者及餐廳資料至 MongoDB

`npm run insertSeeds  //執行增加資料至 MongoDB`

終端顯示 users insert done! 及 restaurants insert done! 即完成新增資料

`Ctrl+C *2  //連按兩下Ctrl+C結束批次工作`

4. 開啟程式

`npm run start  //執行程式`

終端顯示 db is connected! 即啟動完成，請至http://localhost:3000開始使用程式