var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("../model/db.js");//数据操作模块引入\
var formatDate = require("../model/date.js");
var ObjectId = require('mongodb').ObjectId;
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
exports.search = function(req,res){
    db.find(dburl,dbName,collection,{},function(err,docs){
        for(var i in docs){
            docs[i]["发布时间"] = formatDate.formatDate(docs[i]["发布时间"]);
        }
        res.render("job_list",{
            data:docs
        });
    })
}
exports.showInfo = function(req,res){
    var _id = new ObjectId(req.query._id);
    db.find(dburl,dbName,collection,{_id:_id},function(err,docs){
        console.log(docs[0]);
        res.render("info",{
            info:docs[0]
        })
    });
}