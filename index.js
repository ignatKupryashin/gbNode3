const express = require("express");

const port = 3000;
const app = express();
const fs = require("fs");

app.listen(port, () => console.log("Сервер запущен"));

let aboutViews = 0;
let mainViews = 0;

function readData() {
    try {
        let data = JSON.parse(fs.readFileSync("./data.js"));
        aboutViews = data.aboutViews | 0;
        mainViews = data.mainViews | 0;
    } catch (e) {
        console.log("Исторических данных не найдено");
    }
}

function writeData() {
    fs.writeFileSync("./data.js", JSON.stringify({
        aboutViews, mainViews
    }))
}


readData();

app.get("/", (req, res) => {
    res.send(`<h1>Main</h1><a href='/about'>About</a><br><p>Views ${mainViews}</p>`)
    mainViews++;
    writeData();
});

app.get("/about", (req, res) => {
    res.send(`<h1>About</h1><a href='/'>Main</a><br><p>Views ${aboutViews}</p>`);
    aboutViews++;
    writeData();

});





