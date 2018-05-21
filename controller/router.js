var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("../model/db.js");//数据操作模块引入\
var formatDate = require("../model/date.js");
var ObjectId = require('mongodb').ObjectId;
exports.search = function(req,res){
    var jobNameCookie = req.cookies.jobNameCookie?req.cookies.jobNameCookie:[];
    res.render("search",{
        historyRecord:jobNameCookie
    });
}
exports.removeCookie = function(req,res){
    res.clearCookie("jobNameCookie");
    res.end("1");
}
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
exports.showSearchResult = function(req,res){
    var jobName = req.query.job;
    var pageNum = parseInt(req.query.pageNum);
    var pageSize = parseInt(req.query.pageSize);
    var jobNameCookie = req.cookies.jobNameCookie?req.cookies.jobNameCookie:[];
    /*jobNameCookie.push(jobName);*/
    _insertToArray(jobNameCookie,jobName);
    res.cookie("jobNameCookie",jobNameCookie,{ expires: new Date(Date.now() + 900000), httpOnly: true })
    db.findByPage(dburl,dbName,collection,{
        "职位名称":{$regex:jobName,$options:'i'}
    },pageNum,pageSize,function(err,docs){
        docs = docs?docs:[];
        for(var i in docs){
            docs[i]["发布时间"] = formatDate.formatDate(docs[i]["发布时间"]);
        }
        console.log(docs.length);
        res.render("job_list",{
            data:docs
        });
    })
}
exports.showInfo = function(req,res){
    var _id = new ObjectId(req.query._id);
    var outRes = res;
    db.find(dburl,dbName,collection,{_id:_id},function(err,docs){
        console.log(docs[0]);
        superagent.get(docs[0]["岗位职责"]).end(function(err,res){
            var $ = cheerio.load(res.text);
            var info = $(".terminalpage-main .tab-cont-box .tab-inner-cont").eq(0).length !=0?$(".terminalpage-main .tab-cont-box .tab-inner-cont").eq(0):$("article");
            console.log(info.text());
            outRes.render("info",{
                info:info
            })
        });

    });
}
function _insertToArray(array,value){
    var len = array.length;
    if(len === 0){
        array.push(value);
    }else{
        for(var i=0;i<len;i++){
            if(value == array[i]){
                break;
            }else{
                continue;
            }
        }
        if(i == len){
            array.push(value);
        }
    }
}