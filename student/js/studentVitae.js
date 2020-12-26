
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

show()

function show() {
    var userid=getCookie("userid")
    $.getJSON({url:url + "/student/selectstudentvitae",data:"userid=" + userid,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{
                console.log(userid)
                let html = ''
                console.log(data)
                var list = data.data
                console.log(list)
                for (let i = 0; i < list.length; i++) {
                    html += `<tr class="warning">
                                <td>${list[i].studyAspect}</td>
                                <td>${list[i].vitaeAlterTime}</td>
                                <td> 
                                <button onclick="showVitaeBtn('${list[i].vitaeId}')" class="layui-btn layui-btn-xs" >查看简历评价</button>
                                <button class="layui-btn layui-btn-xs" id="fileDownload" onclick="downloadVitae('${list[i].vitaeUrl}','${list[i].vitaeId}','${list[i].studyAspect}')" style="width: 100px">下载</button></td>
                                </tr>`
                }
                $("#showAllInfo").append(html)





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
                    console.log(s)
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
                                console.log(data)
                                layer.close(index);
                                downloadfile(Qnyurl+data,"学生简历")
                            }
                        })}else{
                        layer.alert("所选数据为空！");
                    }
                })
                pageSelect(data.data)
                $("input[name='optionAll.']").click(function () {
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
            }

        }})
}

function showVitaeBtn(id) {
    var userid=getCookie("userid")
    $.getJSON({url:url + "/student/selectevaluatebyvitaeid", data:"vitaeId="+id ,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            } else if(data.code==0){
                alert("该简历暂无评价")
            } else {
                location.href= "/sybida/student/studentVitae66.html?id="+id;
            }

        }})
}


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

function downloadVitae(downloadUrl, id, aspect) {
    var res = id.concat("+", aspect)
    console.log(downloadUrl)
    console.log(id)
    downloadfile(Qnyurl+downloadUrl,res)
}
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
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;


        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    }
}
function downloadfile(downloadUrl, filename) {
    getBlob(downloadUrl).then(blob => {
        saveAs(blob, filename);
    });
}


