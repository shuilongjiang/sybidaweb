var pageNum = 1
var pageSize = $("#pageSizeSel").val()
var search = location.search
var arr = search.split("&")
if (arr.length > 1) {
    pageNum1 = arr[0]
    pageNum = pageNum1.split("=")[1]
    pageSize1 = arr[1]
    pageSize = pageSize1.split("=")[1]
}





var selectA2 = $("#pageSizeSel").find("option");
for (var i = 0; i < selectA2.length; i++) {
    var t = $(selectA2[i]).val()

    if (t == pageSize) {
        $(selectA2[i]).attr("selected", "selected")
    }

}

$('#pageSizeSel').change(
    function () {
        pageSize = $("#pageSizeSel").val()
    }
)
$("#selectButt").click(function () {
    location.href = "/sybida/student/studentVitae.html?pageNum=1&pageSize=" + pageSize
})

show()
var userid=getCookie("userid")
function show() {
    $.getJSON(url + "/student/selectstudentvitae","userid="+userid, "pageSize=" + pageSize + "&pageNum=" + pageNum, function (data) {

        let html = ''
        console.log(data)
        var list = data.data.list
        console.log(list)

        for (let i = 0; i < list.length; i++) {

            html += `<tr class="warning">]

            <td>${list[i].vitaeEvaluateId}</td>
             <td>${list[i].vitaeEvaluateUserId}</td>         
            <td>${list[i].vitaeEvaluateComment}</td>
            <td>${list[i].vitaeEvaluatePicture}</td>   
        </tr>`
        }
        $("#showAllInfo").append(html)


    })
}








function pageSelect(data) {
    var html = ``
    if (pageNum == 1) {
        html += `<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    } else {
        html += `<li><a href="/sybida/student/studentVitae.html?pageNum=${pageNum - 1}&pageSize=${pageSize}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for (var i = data.navigateFirstPage; i <= data.navigateLastPage; i++) {
        if (pageNum == i) {
            html += `<li class="active"><a href="#">${i}</a></li>`
        } else {
            html += `<li><a href="/sybida/student/studentVitae.html?pageNum=${i}&pageSize=${pageSize}">${i}</a></li>`
        }
    }

    if ((data.pages) <= pageNum) {
        html += `<li class="disabled"><a href="#">&raquo;</a></li>`
    } else {
        var pa = parseInt(pageNum) + 1
        html += `<li><a href="/sybida/student/studentVitae.html?pageNum=${pa}&pageSize=${pageSize}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html += `<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)

}







