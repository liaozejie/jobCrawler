function showInfo(id){
    window.location.href = "detail?_id=" + id;
}
function showSearchResultByKeyCode(event){
    if(event.keyCode == 13){
        window.location.href = "showSearchResult?job=" + event.target.value + "&pageNum=1&pageSize=10";
    }
}
function showSearchResult(event){
    window.location.href = "showSearchResult?job=" + event.target.innerHTML + "&pageNum=1&pageSize=10";
}
function removeCookie(){
    $.get("/removeCookie",function(result){
        if(result == "1"){
            window.location.href = "/search";
        }
    })
}
function nextPage(){
    var job = getSearchString("job");
    var pageNum = getSearchString("pageNum");
    var dataLength = $("#next").attr("data-length");
    if(dataLength!="10"){
        return;
    }
    window.location.href = "/showSearchResult?job=" + job + "&pageNum=" + (parseInt(pageNum)+1) + "&pageSize=10";
}
function prePage(){
    var job = getSearchString("job");
    var pageNum = getSearchString("pageNum");
    if(pageNum-1<1){
        return ;
    }
    window.location.href = "/showSearchResult?job=" + job + "&pageNum=" + (parseInt(pageNum)-1) + "&pageSize=10";
}
function getSearchString(key) {
    // 获取URL中?之后的字符
    var str = location.search;
    str = str.substring(1,str.length);

    // 以&分隔字符串，获得类似name=123这样的元素数组
    var arr = str.split("&");
    var obj = new Object();

    // 将每一个数组元素以=分隔并赋给obj对象
    for(var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}