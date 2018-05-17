var express = require("express");
var app = express();
var cookieParser = require("cookie-parser")
var router = require("./controller/router.js");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.get("/",router.getIndex);
app.get("/search",router.search);
app.get("/backIndex",router.getBackIndex);
app.get("/showSearchResult",router.showSearchResult);
app.get("/detail",router.showInfo);
app.get("/removeCookie",router.removeCookie);

app.listen(8000);