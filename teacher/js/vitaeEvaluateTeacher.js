var pageNum = 1
var pageSize = $("#pageSizeSel").val()

// var teacherStudy=-1
var search = location.search
var arr = search.split("&")
if (arr.length > 1) {
    pageNum1 = arr[0]
    pageNum = pageNum1.split("=")[1]

    pageSize1 = arr[1]
    pageSize = pageSize1.split("=")[1]
    //
    // teacherStudy1=arr[2]
    // teacherStudy=teacherStudy1.split("=")[1]

}
var selectA2 = $("#pageSizeSel").find("option"); //从A1下拉框中 搜索值
for (var i = 0; i < selectA2.length; i++) {
    var t = $(selectA2[i]).val()

    if (t == pageSize) {
        $(selectA2[i]).attr("selected", "selected")
    }

}
//每页条数的change事件
$('#pageSizeSel').change(
    function () {
        pageSize = $("#pageSizeSel").val()
    }
)
$("#selectButt").click(function () {
    location.href = "/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=1&pageSize=" + pageSize
})

//全选全不选
$('input[name="checkAll"]').click(function () {
    //当全选按钮是选中状态
    if ($(this).is(':checked')) {
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function () {
            //将checkbox状态改为选中
            $(this).prop("checked", true);
        });
    } else {

        $('input[name="optionAll"]').each(function () {
            $(this).prop("checked", false);
        });
    }
});


show();

function show() {
    $.getJSON(url + "/teacher/selectallvitae", "pageSize=" + pageSize + "&pageNum=" + pageNum, function (data) {

        let html = ''
        var list = data.data.list
        for (let i = 0; i < list.length; i++) {
            if (list[i].vitaeIsRead == 1) {
                list[i].vitaeIsRead = "是"
            } else {
                list[i].vitaeIsRead = "否"
            }

            if (list[i].vitaeIsNew == 1) {
                list[i].vitaeIsNew = "是"
            } else {
                list[i].vitaeIsNew = "否"
            }
            if (!list[i].vitaeLevel) {
                list[i].vitaeLevel = "暂无"
            }
            if (!list[i].vitaeDownloadFrequency) {
                list[i].vitaeDownloadFrequency = "暂无"
            }
            if (!list[i].vitaeHistoryFrequency) {
                list[i].vitaeHistoryFrequency = "暂无"
            }

            if(list[i].vitaeUrl){
                html += `<tr class="warning">]<td style="width: 80px;"><input type="checkbox" value="${list[i].vitaeUrl}=${list[i].studentName}+${list[i].studyAspect}${list[i].vitaeId}" name="optionAll" ></td>
            <td>${list[i].vitaeId}</td>
            <td>${list[i].vitaeStudentId}</td>
            <td id="studentName1">${list[i].studentName}</td>
            <td id="studyAspect1">${list[i].studyAspect}</td>
            <td>${list[i].vitaeLevel}</td>
            <td>${list[i].vitaeIsNew}</td>
     
            <td>${list[i].vitaeIsRead}</td> 
            <td>${list[i].vitaeDownloadFrequency}</td>
            <td>${list[i].vitaeHistoryFrequency}</td>
            <td>${list[i].vitaeAlterTime}</td>
           <td><button id="updateLevelBtn" class="layui-btn layui-btn-xs"onclick="updateVitaeLevel('${list[i].vitaeId}','${list[i].vitaeStudentId}','${list[i].studentName}','${list[i].vitaeUrl}')">评价</button>
           <button class="layui-btn layui-btn-xs" id="fileDownload" onclick="downloadVitae('${list[i].vitaeUrl}','${list[i].studentName}','${list[i].studyAspect}')">下载</button></td>
        </tr>`
            }else{
                html += `<tr class="warning">]<td style="width: 80px;"></td>
            <td>${list[i].vitaeId}</td>
            <td>${list[i].vitaeStudentId}</td>
            <td id="studentName1">${list[i].studentName}</td>
            <td id="studyAspect1">${list[i].studyAspect}</td>
            <td>${list[i].vitaeLevel}</td>
            <td>${list[i].vitaeIsNew}</td>
         
            <td>${list[i].vitaeIsRead}</td> 
            <td>${list[i].vitaeDownloadFrequency}</td>
            <td>${list[i].vitaeHistoryFrequency}</td>
            <td>${list[i].vitaeAlterTime}</td>
           <td>从未上传简历</td>
        </tr>`

            }
        }
        $("table").append(html)
        var layer
        layui.use('layer', function(){
            layer = layui.layer;
        });
        $("#downzip").click(function () {
            var checkbox = $("input[name='optionAll']");
            var s=new Array();
            var j=0
            for(var i = 0;i<checkbox.length;i++)
            {
                if(checkbox[i].checked==true)
                {
                    s[j++]=(checkbox[i].value)
                }
            }
            if(s.length>0){
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                $.post({
                url:url+"/teacherdownload/downloadvitaezip",
                // 告知传递参数类型为json，不可缺少
                contentType:"application/json",
                data:JSON.stringify(s),
                success:function(data){
                    layer.close(index);
                    downloadfile(Qnyurl+data,"学生简历")
                }
            })}else{
                layer.alert("所选数据为空！");
            }
        })
        pageSelect(data.data)
        $("input[name='optionAll']").click(function () {
            if ($(this).is(':checked')) {
                // 如果当前框被选中，则判断是否需要勾选全选框
                var checkbox = $("input[name='optionAll']");
                var length = $(checkbox).length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        if ($(checkbox[i]).is(":checked") != true) {
                            break;// 如果有未勾选的选择框，不需要勾选全选，跳出循环
                        }
                        if (i == length - 1) {
                            // 如果到最后一个选择框仍然是勾选状态，即所有选择框都被勾选，则勾选全选框
                            $("input[name='checkAll']")
                                .prop("checked", true);
                        }
                    }
                }
            } else {
                // 如果当前选择框未勾选，则取消全选框勾选状态
                $("input[name='checkAll']").prop("checked", false);
            }
        })

    })
}

function pageSelect(data) {
    var html = ``
    if (pageNum == 1) {

        html += `<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    } else {
        html += `<li><a href="/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=${pageNum - 1}&pageSize=${pageSize}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for (var i = data.navigateFirstPage; i <= data.navigateLastPage; i++) {
        if (pageNum == i) {
            html += `<li class="active"><a href="#">${i}</a></li>`
        } else {
            html += `<li><a href="/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=${i}&pageSize=${pageSize}">${i}</a></li>`
        }
    }
    if ((data.pages) <= pageNum) {
        html += `<li class="disabled"><a href="#">&raquo;</a></li>`
    } else {
        var pa = parseInt(pageNum) + 1
        html += `<li><a href="/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=${pa}&pageSize=${pageSize}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html += `<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)

}


function updateVitaeLevel(vitaeId, userid, name,vitaeurl) {
    $(".updateLevel").css('display', '')
    $("#vitaeID").val(vitaeId)
    $("#vitaeEvaluateUserId").val(userid)
    $("#vitaeEvaluateUserName").val(name)
    $("#iframe3").attr("src",Qnyurl+vitaeurl)
}


$("#addVitaeLevel").click(function () {

    var vitaeId = $("#vitaeID").val()
    var vitaeStudentId = $("#vitaeEvaluateUserId").val()
    var vitaeComment = $("#vitaeEvaluateComment").val()

     var picture ="11"

    if (judgeAll()) {
        $.getJSON(url + "/teacher/insertvitaeevaluatelevel", "comment=" + vitaeComment + "&picUrl=" + picture + "&vitaeId=" + vitaeId + "&studentId=" + vitaeStudentId, function (data) {

            if (data.code == 1) {
                alert("评价成功！")
                location.href = "/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=1&pageSize=" + pageSize

            } else {
                alert("评价失败！")
                location.href = "/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=1&pageSize=" + pageSize
            }
        })
    }
})

function Map() {
    this.keys = new Array();
    this.data = new Object();

    this.put = function (key, value) {
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };
    this.get = function (key) {
        return this.data[key];
    };
    this.remove = function (key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
    this.each = function (fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
        }
    };
    this.entrys = function () {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entrys;
    };
    this.isEmpty = function () {
        return this.keys.length == 0;
    };
    this.size = function () {
        return this.keys.length;
    };
    this.toString = function () {
        var s = "{";
        for (var i = 0; i < this.keys.length; i++, s += ',') {
            var k = this.keys[i];
            s += k + "=" + this.data[k];
        }
        s += "}";
        return s;
    };


}

function downloadVitae(downloadUrl, name, aspect) {
    var res = name.concat("+", aspect)
    downloadfile(Qnyurl+downloadUrl,res)

}

$("#vitaeEvaluateComment").blur(function () {
    judgeSpace($(this), 0)
})

$("#vitaeEvaluatePicture").blur(function () {
    judgeSpace($(this), 1)
})

function judgeSpace(obj, index) {
    let inputValue = obj.val()
    if (!inputValue || !(inputValue.trim())) {
        $(".tips").eq(index).html("请填写信息")
        return false
    } else {
        $(".tips").eq(index).html("")
        return true
    }
}

function judgeAll() {
    if (judgeSpace($("#vitaeEvaluateComment"), 0) ) {
        return true
    }
}



////文件下载重命名
function getBlob(downloadUrl) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', downloadUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    }
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
function downloadfile(downloadUrl, filename) {
    getBlob(downloadUrl).then(blob => {
        saveAs(blob, filename);
    });
}

