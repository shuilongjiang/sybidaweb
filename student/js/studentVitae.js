




show()


function show() {
    var userid=getCookie("userid")
    $.getJSON(url + "/student/selectstudentvitae","userid=" + userid,function (data) {

        let html = ''
        console.log(data)
        var list = data.data
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







