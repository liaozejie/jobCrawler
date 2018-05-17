function showInfo(id){
    window.location.href = "detail?_id=" + id;
}
function showSearchResultByKeyCode(event){
    if(event.keyCode == 13){
        window.location.href = "showSearchResult?job=" + event.target.value;
    }
}
function showSearchResult(event){
    window.location.href = "showSearchResult?job=" + event.target.innerHTML;
}
function removeCookie(){
    $.get("/removeCookie",function(result){
        if(result == "1"){
            window.location.href = "/search";
        }
    })
}