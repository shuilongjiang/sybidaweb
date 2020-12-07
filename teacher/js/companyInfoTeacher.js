var currPage = 1
// 每页默认5条数据
var pageSize = 9
// 获取传递的参数  /showhero.html?currPage=2--?currPage=2
var search = location.search
// 按照=对参数分割
var arr = search.split("=")
// 第一次访问页面时，是没有传递参数的，只有在分页时才会传递参数
// 防止第一次出现问题
if(arr.length >1){
    currPage = arr[1]
}
console.log(currPage)

//"currentPage="+currPage+"&pageSize="+pageSize
//localhost:8080/web06/teacher/selectAllCompany?currentPage=1&pageSize=9
var list
$.ajax({
    url:"/web06/teacher/selectAllCompany.do",//访问springMVC的路径
    data:"currentPage="+currPage+"&pageSize="+pageSize,
    async:false,
    dataType:"json",
    type:"get",
    success:function (data){
        console.log(data)
        let html = ''
        companyList = data.data.list
        console.log(companyList)
        for(let i = 0; i < companyList.length; i++){
            html+=`
            <div class="col-sm-4">
            <div class="ibox">
                <div class="ibox-title">
                    <span class="label label-primary pull-right">NEW</span>
                    <h5>${companyList[i].companyName}</h5>
                </div>
                <div class="ibox-content">
                    <div class="team-members">
                        <a href="#"><img alt="member" class="img-circle" src="img/a1.jpg"></a>
                    </div>
                    <h4>企业简介</h4>
                    <p>
                        ${companyList[i].companyIntroduce}
                    </p>
                    <div>
                        <span>联系邮箱</span>
                        <div class="stat-percent">${companyList[i].companyMailBox}</div>
                        <div class="progress progress-mini">
                            <div style="width: 48%;" class="progress-bar"></div>
                        </div>
                    </div>
                    <div class="row  m-t-sm">
                        <div class="col-sm-4">
                            <div class="font-bold">工作地址</div>
                            ${companyList[i].companyAddress}
                        </div>
                        <div class="col-sm-4">
                            <div class="font-bold">招聘要求</div>
                            ${companyList[i].companyRequire}
                        </div>
                        <div class="col-sm-4 text-right">
                            <div class="font-bold">薪资</div>
                            ${companyList[i].companySalary}<i class="fa fa-level-up text-navy"></i>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            `
        }
        $("#showCompany").append(html)

        console.log(data)
        generatePage(data.data.navigatepageNums, data.data.pageNum
            , data.data.pages)
    }

})

// 当前页
//分页选择器点击事件
//navigatepageNums  总共显示多少个分页的按钮
//pageNum当前页
function generatePage(navigatepageNums, pageNum, pages){
    var html = ''

    console.log(pageNum == 1)
    if(pageNum == 1){
        html += `<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    } else {
        html += `<li><a href="/web06/Sybida/teacher/companyInfoTeacher.html?currPage=${pageNum-1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
     // console.log(navigatePages)
    // 生成页码
    for(let i = 0; i < navigatepageNums.length; i++){
         // console.log(navigatepageNums)
        if(pageNum == navigatepageNums[i]){
            // 当前页class=active，设置选中效果
            html += `<li class="active"><a href="#">${navigatepageNums[i]}</a></li>`
        } else {
            // showhero.html?
            // 不是当前页
            html += `<li><a href="/web06/Sybida/teacher/companyInfoTeacher.html?currPage=${navigatepageNums[i]}">${navigatepageNums[i]}</a></li>`
        }

    }

    if(pageNum == pages) {
        html += `<li class="disabled"><a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a></li>`
    } else {
        html += `<li><a href="/web06/Sybida/teacher/companyInfoTeacher.html?currPage=${pageNum+1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a></li>`
    }

    $("ul").append(html)

}