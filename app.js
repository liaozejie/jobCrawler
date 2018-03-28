var express = require("express");
var app = express();
var router = require("./controller/router.js");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.get("/",router.getIndex);
app.get("/backIndex",router.getBackIndex);
app.get("/search",router.search);
app.get("/detail",router.showInfo);

app.listen(3000);