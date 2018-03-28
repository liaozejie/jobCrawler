/*
* 时间转化
* */
var dateFormat = require("dateformat");
function formatDate(date){
    //最后要返回的时间显示格式
    return dateFormat(date,"isoDate");
}
exports.formatDate = formatDate;