var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("../model/db.js");//数据操作模块引入
exports.getIndex = function(req,res){
    res.render("index");
}
exports.getBackIndex = function(req,res){
    db.find(dburl,dbName,collection,{},function(err,docs){
        res.render("dataIndex",{
            data:docs
        });
    })

}