var numi=1
$(".advicetitleshow").mouseover(function () {
    var class1=$(this).attr("class")
    $(this).addClass("onlinght")
})
$(".advicetitleshow").mouseleave(function () {
    $(this).removeClass("onlinght")
})
$(".advicetitleshow1").mouseover(function () {
    var class1=$(this).attr("class")

    $(this).addClass("onlinght")
})
$(".advicetitleshow1").mouseleave(function () {

    $(this).removeClass("onlinght")
})
// <!--收件箱-->
$(".advicetitleshow").click(function () {
    var class1=$(this).attr("class")
    if("advicetitleshow onlinght"==class1){
        $(this).toggleClass("onadvicetitle")
        $(".advicetitleshow1").removeClass("onadvicetitle")
        $("#showmseeage").removeClass("hiddenmessage")
        $("#showmseeage").toggleClass("showmessage")
        $("#sendmessage").removeClass("showmessage")
        $("#sendmessage").toggleClass("hiddenmessage")
        $("#nothingtodo").html("")
        $("#showmseeage").html("")
        toltalnumdef()
    }else{
        $("#nothingtodo").html("")
        $("#showmseeage").html("")
        toltalnumdef()
    }
})
// <!--发件箱-->
$(".advicetitleshow1").click(function()  {
    var class1=$(this).attr("class")
    if("advicetitleshow1 onlinght"==class1){
        $(this).toggleClass("onadvicetitle")
        $(".advicetitleshow").removeClass("onadvicetitle")
        $("#sendmessage").removeClass("hiddenmessage")
        $("#sendmessage").toggleClass("showmessage")
        $("#showmseeage").removeClass("showmessage")
        $("#showmseeage").toggleClass("hiddenmessage")
        $("#nothingtodo").html("")
        $("#sendmessage").html("")
        toltalnum1();

    }else{
        $("#nothingtodo").html("")
        $("#sendmessage").html("")
        toltalnum1();
    }
})

var userid=getCookie("userid")
var layer
layui.use('layer', function(){
    layer = layui.layer;
});
var aflag=true//发件箱标志
var bflag=true//收件箱标志
    <!-- page lazyloading -->
$("#nothingtodo").html("")
$("#showmseeage").html("")
toltalnumdef()
// <!--收件箱加载-->
function toltalnumdef() {
    $.post(url+"news/receivemessagecount", "userid="+userid, function (data1) {
        var toltalnum=data1.code;
        console.log(toltalnum+"=====")
        if(toltalnum==0){
            $("#nothingtodo").html(`<div  style="text-align: center;padding-bottom: 20px;padding-top: 20px;font-size: 18px;color: white;background-color: #C1C1C1">
        没有信息  </div>`)
        }else{
            $("#showmseeage").html(`  `)
            sendmessagea1(toltalnum);
        }
    },"json");
}

//全选全不选======================================================================================
function showmseeage(){
    if($("#chk").get(0).checked){
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function(){
            //将checkbox状态改为选中
            $(this).prop("checked",true);
        });
    }else{

        $('input[name="optionAll"]').each(function(){
            $(this).prop("checked",false);
        });
    }
}

function sendmessage(){
    if($("#chk2").get(0).checked){
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function(){
            //将checkbox状态改为选中
            $(this).prop("checked",true);
        });
    }else{

        $('input[name="optionAll"]').each(function(){
            $(this).prop("checked",false);
        });
    }
}
// <!--收件箱加载-->
function sendmessagea1(toltalnum) {
    var pagesize=7;
    var totalPages=Math.ceil(toltalnum/pagesize);
    var pagenum=totalPages;
    doSomething1(pagenum--)
    if(pagenum > 0){
        doSomething(pagenum)
    }

    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        if(aflag){
            if (pagenum>1) {
                if (positionValue >= -2) {
                    if (pagenum > 1) {
                        layer.msg("玩命加载中")
                        pagenum--;
                        bflag=false;
                        bflag=doSomething(pagenum);
                    }
                }
            }
        }

    });
    function doSomething(pagenum) {
        var userid1=getCookie("userid")
        $.post(url+"news/receivemessage", "pagesize="+pagesize+"&userid="+userid1+"&pagenum="+pagenum, function (data) {
            console.log(data)
            var html =``
            for(var i =data.data.length-1; i>=0; i--){
                var mytime =data.data[i].newsSendTime
                var isread=data.data[i].receiveIsRead
                var mytime1 =mytime.substring(0,mytime.indexOf(".")).replace("T","/")
                if(isread==0){

                    html+=` <div class="infolisted">
            <div class="bg-primary infolistedtop">
                    <div class="infolistedtopleft" >
                        <input style="height: 15px;width: 15px;" type="checkbox" name="optionAll" value="${data.data[i].receiveId}">
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].classId}" data-name="${list[i].newsTest}" data-target="#exampleModal">删除</a>
                        </div>

                    <div class="infolistedtopright" ><span >

                    </span></div>
                    <div style="clear: both"></div>
            </div>
            <div style="width: 98%;margin: 0 auto"><p >${data.data[i].newsTest}
            </p>
            </div>
            <div style="margin-top: 10px;">
                <div style="float: left"><span style="color: #aaa; font-weight: 400;"><i>${mytime1}</i></span></div>
                <div style="float: right;margin-right: 15px;"><span >
                 <a class="layui-btn layui-btn-danger layui-btn-xs" onclick="receiveRead(${data.data[i].receiveId},this)" >标为已读</a>
                </span>
                 </div>
                <div style="clear: both"></div>

            </div>
        </div>`}else{
                    html+=` <div class="infolisted">
            <div class="bg-primary infolistedtop">
                    <div class="infolistedtopleft" >
                        <input style="height: 15px;width: 15px;" type="checkbox" name="optionAll" value="${data.data[i].receiveId}">
                        <a class="layui-btn layui-btn-danger layui-btn-xs">删除</a>
                        </div>
                    <div class="infolistedtopright" ><span >
                   </span></div>
                    <div style="clear: both"></div>
            </div>
            <div style="width: 98%;margin: 0 auto"><p >${data.data[i].newsTest}
            </p>
            </div>
            <div style="margin-top: 10px;">
                <div style="float: left"><span style="color: #aaa; font-weight: 400;"><i>${mytime1}</i></span></div>
                <div style="float: right;margin-right: 15px;"><span >
                 已读
                 </span>
                 </div>
                <div style="clear: both"></div>

            </div>
        </div>`
                }
            }
            $("#showmseeage").append(html)

            bflag=true;
            if(pagenum==1){
                layer.msg("没有更多了---我是有底线的哦")
                $("#nothingtodo").html(`<div  style="text-align: center;padding-bottom: 20px;padding-top: 20px;font-size: 18px;color: white;background-color: #C1C1C1">
        已经到底了！！</div>`)
            }
//自己试试看=========================================================================
            $("input[name='optionAll']").click(function (){
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
                                $("#chk").prop("checked", true);
                            }
                        }
                    }
                } else {
                    // 如果当前选择框未勾选，则取消全选框勾选状态
                    $("#chk").prop("checked", false);
                }
            });

            $("#deleteBySelect2").click(function (){
                $("#exampleModalAll2").attr("class","modal fade in")
                $("#exampleModalAll2").css("display","inline-block")
            })

        },"json");
    }
    function doSomething1(pagenum) {
        var userid1=getCookie("userid")
        $.post(url+"news/receivemessage", "pagesize="+pagesize+"&userid="+userid1+"&pagenum="+pagenum, function (data) {
            console.log(data)
            var html =`<div class="infolisted" >
                <div class="bg-primary infolistedtop" style="height:50px;">
                    <div class="infolistedtopleft" style="margin-top: 10px;">
                        <input style="height: 15px;width: 15px;" type="checkbox" id="chk" onclick="showmseeage()" >
                        <button id="deleteBySelect2" class="btn btn-danger" style="margin-bottom: 8px;height: 30px;">批量删除</button>
                        </div>
                    <div class="infolistedtopright" style="margin-top: 10px;" ><span >共${toltalnum}条</span></div>
                    <div style="clear: both"></div>
                </div>


            </div>`
            for(var i =data.data.length-1; i>=0; i--){
                var mytime =data.data[i].newsSendTime
                var isread=data.data[i].receiveIsRead
                var mytime1 =mytime.substring(0,mytime.indexOf(".")).replace("T","/")
                if(isread==0){

                    html+=` <div class="infolisted">
            <div class="bg-primary infolistedtop">
                    <div class="infolistedtopleft" >
                        <input style="height: 15px;width: 15px;" type="checkbox" name="optionAll" value="${data.data[i].receiveId}">
                        <a class="layui-btn layui-btn-danger layui-btn-xs" >删除</a>
                        </div>

                    <div class="infolistedtopright" ><span >

                    </span></div>
                    <div style="clear: both"></div>
            </div>
            <div style="width: 98%;margin: 0 auto"><p >${data.data[i].newsTest}
            </p>
            </div>
            <div style="margin-top: 10px;">
                <div style="float: left"><span style="color: #aaa; font-weight: 400;"><i>${mytime1}</i></span></div>
                <div style="float: right;margin-right: 15px;"><span >
                 <a class="layui-btn layui-btn-danger layui-btn-xs" onclick="receiveRead(${data.data[i].receiveId},this)" >标为已读</a>
                </span>
                 </div>
                <div style="clear: both"></div>

            </div>
        </div>`}else{
                    html+=` <div class="infolisted">
            <div class="bg-primary infolistedtop">
                    <div class="infolistedtopleft" >
                        <input style="height: 15px;width: 15px;" type="checkbox" name="optionAll" value="${data.data[i].receiveId}">
                        <a class="layui-btn layui-btn-danger layui-btn-xs">删除</a>
                        </div>
                    <div class="infolistedtopright" ><span >
                   </span></div>
                    <div style="clear: both"></div>
            </div>
            <div style="width: 98%;margin: 0 auto"><p >${data.data[i].newsTest}
            </p>
            </div>
            <div style="margin-top: 10px;">
                <div style="float: left"><span style="color: #aaa; font-weight: 400;"><i>${mytime1}</i></span></div>
                <div style="float: right;margin-right: 15px;"><span >
                 已读
                 </span>
                 </div>
                <div style="clear: both"></div>

            </div>
        </div>`
                }
            }
            $("#showmseeage").prepend(html)

            bflag=true;
            if(pagenum==1){
                layer.msg("没有更多了---我是有底线的哦")
                $("#nothingtodo").html(`<div  style="text-align: center;padding-bottom: 20px;padding-top: 20px;font-size: 18px;color: white;background-color: #C1C1C1">
        已经到底了！！</div>`)
            }
//自己试试看=========================================================================
            $("input[name='optionAll']").click(function (){
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
                                $("#chk").prop("checked", true);
                            }
                        }
                    }
                } else {
                    // 如果当前选择框未勾选，则取消全选框勾选状态
                    $("#chk").prop("checked", false);
                }
            });

            $("#deleteBySelect2").click(function (){
                $("#exampleModalAll2").attr("class","modal fade in")
                $("#exampleModalAll2").css("display","inline-block")
            })

        },"json");
    }
}
// ===================================================================
// <!--发件箱加载-->
function toltalnum1() {
    $.post(url+"news/hadSendmessagecount", "userid="+userid, function (data1) {
        var toltalnum=data1.code;
        if(toltalnum==0){
            $("#nothingtodo").html(`<div  style="text-align: center;padding-bottom: 20px;padding-top: 20px;font-size: 18px;color: white;background-color: #C1C1C1">
        你还没有发送任何信息 </div>`)
        }else{

            sendmessagea(toltalnum);
        }
    },"json");
}


// <!--发件箱加载-->
function sendmessagea(toltalnum) {
    var pagesize=7;
    var totalPages=Math.ceil(toltalnum/pagesize);
    var pagenum=totalPages;
    doSomething1(pagenum--)
    if(pagenum > 0){
        doSomething(pagenum)
    }
    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        if(aflag){
            if (pagenum>1) {
                if (positionValue >= -2) {
                    if (pagenum > 1) {
                        layer.msg("玩命加载中")
                        pagenum--;
                        aflag=false;
                        aflag=doSomething(pagenum);
                    }
                }
            }
        }

    });
    function doSomething(pagenum) {
        var userid1=getCookie("userid")
        $.post(url+"news/hadsendmessage", "pagesize="+pagesize+"&userid="+userid1+"&pagenum="+pagenum, function (data) {
            console.log(data)
            var html =``
            for(var i =data.data.length-1; i>=0; i--){
                var mytime =data.data[i].newsSendTime
                var mytime1 =mytime.substring(0,mytime.indexOf(".")).replace("T","/")
                html+=` <div class="infolisted">
            <div class="bg-primary infolistedtop">
                    <div class="infolistedtopleft" >
                        <input style="height: 15px;width: 15px;" type="checkbox" name="optionAll" value="${data.data[i].newsId}"></div>
                    <div class="infolistedtopright" ><span >${data.data[i].newsReadPeople}人已读</span></div>
                    <div style="clear: both"></div>
            </div>
            <div style="width: 98%;margin: 0 auto"><p >${data.data[i].newsTest}
            </p>
            </div>
            <div style="margin-top: 10px;">
                <div style="float: left"><span style="color: #aaa; font-weight: 400;"><i>${mytime1}</i></span></div>
                <div style="float: right;margin-right: 15px;"><span ><a class="layui-btn layui-btn-danger layui-btn-xs">删除</a></span></div>
                <div style="clear: both"></div>

            </div>
        </div>`
            }
            $("#sendmessage").append(html)

            aflag=true;
            if(pagenum==1){
                layer.msg("没有更多了---我是有底线的哦")
                $("#nothingtodo").html(`<div  style="text-align: center;padding-bottom: 20px;padding-top: 20px;font-size: 18px;color: white;background-color: #C1C1C1">
        已经到底了！！</div>`)
            }


            $("input[name='optionAll']").click(function (){
                if ($(this).is(':checked')) {
                    // 如果当前框被选中，则判断是否需要勾选全选框
                    var checkbox = $("input[name='optionAll']");
                    var length = $(checkbox).length;
                    console.log(length+"=========================")
                    if (length > 0) {
                        for (var i = 0; i < length; i++) {
                            if ($(checkbox[i]).is(":checked") != true) {
                                break;// 如果有未勾选的选择框，不需要勾选全选，跳出循环
                            }
                            if (i == length - 1) {
                                // 如果到最后一个选择框仍然是勾选状态，即所有选择框都被勾选，则勾选全选框
                                $("#chk2").prop("checked", true);
                            }
                        }
                    }
                } else {
                    // 如果当前选择框未勾选，则取消全选框勾选状态
                    $("#chk2").prop("checked", false);
                }
            });
            $("#deleteBySelect").click(function (){
                $("#exampleModalAll").attr("class","modal fade in")
                $("#exampleModalAll").css("display","inline-block")
            })
        },"json");
    }
    function doSomething1(pagenum) {
        var userid1=getCookie("userid")
        $.post(url+"news/hadsendmessage", "pagesize="+pagesize+"&userid="+userid1+"&pagenum="+pagenum, function (data) {
            console.log(data)
            var html =`<div class="infolisted" >
                <div class="bg-primary infolistedtop" style="height:50px;">
                    <div class="infolistedtopleft" style="margin-top: 10px;">
                        <input style="height: 15px;width: 15px;" type="checkbox" name=""  onclick="sendmessage()" id="chk2" value="">
                        <button id="deleteBySelect" class="btn btn-danger" style="margin-bottom: 8px;height: 30px;">批量删除</button>
                        </div>
                    <div class="infolistedtopright" style="margin-top: 10px;" ><span >共${toltalnum}条</span></div>
                    <div style="clear: both"></div>
                </div>
            </div>`
            for(var i =data.data.length-1; i>=0; i--){
                var mytime =data.data[i].newsSendTime
                var mytime1 =mytime.substring(0,mytime.indexOf(".")).replace("T","/")
                html+=` <div class="infolisted">
            <div class="bg-primary infolistedtop">
                    <div class="infolistedtopleft" >
                        <input style="height: 15px;width: 15px;" type="checkbox" name="optionAll" value="${data.data[i].newsId}"></div>
                    <div class="infolistedtopright" ><span >${data.data[i].newsReadPeople}人已读</span></div>
                    <div style="clear: both"></div>
            </div>
            <div style="width: 98%;margin: 0 auto"><p >${data.data[i].newsTest}
            </p>
            </div>
            <div style="margin-top: 10px;">
                <div style="float: left"><span style="color: #aaa; font-weight: 400;"><i>${mytime1}</i></span></div>
                <div style="float: right;margin-right: 15px;"><span ><a class="layui-btn layui-btn-danger layui-btn-xs">删除</a></span></div>
                <div style="clear: both"></div>

            </div>
        </div>`
            }
            $("#sendmessage").prepend(html)

            aflag=true;
            if(pagenum==1){
                layer.msg("没有更多了---我是有底线的哦")
                $("#nothingtodo").html(`<div  style="text-align: center;padding-bottom: 20px;padding-top: 20px;font-size: 18px;color: white;background-color: #C1C1C1">
        已经到底了！！</div>`)
            }


            $("input[name='optionAll']").click(function (){
                if ($(this).is(':checked')) {
                    // 如果当前框被选中，则判断是否需要勾选全选框
                    var checkbox = $("input[name='optionAll']");
                    var length = $(checkbox).length;
                    console.log(length+"=========================")
                    if (length > 0) {
                        for (var i = 0; i < length; i++) {
                            if ($(checkbox[i]).is(":checked") != true) {
                                break;// 如果有未勾选的选择框，不需要勾选全选，跳出循环
                            }
                            if (i == length - 1) {
                                // 如果到最后一个选择框仍然是勾选状态，即所有选择框都被勾选，则勾选全选框
                                $("#chk2").prop("checked", true);
                            }
                        }
                    }
                } else {
                    // 如果当前选择框未勾选，则取消全选框勾选状态
                    $("#chk2").prop("checked", false);
                }
            });
            $("#deleteBySelect").click(function (){
                $("#exampleModalAll").attr("class","modal fade in")
                $("#exampleModalAll").css("display","inline-block")
            })
        },"json");
    }
}

// <!--收件箱模态框删除-->

var idtea
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    idtea = button.data('id')
    var name = button.data('name')
    var modal = $(this)
    modal.find('#messagetext').text('确认将消息记录-' +name+'-删除吗？')
})
$("#deleteOneSure").click(function (){

    $.post(url+"/news/delectonereceive","receiveId="+idtea,function (data) {
        if(data.code==1){
            $("#exampleModal").attr("class","modal fade")
            $("#exampleModal").css("class","")
            // $("#exampleModal").toggle()
            $("#nothingtodo").html("")
            $("#showmseeage").html("")

            toltalnumdef()
            $(".modal-backdrop").remove()
        }else{
            layer.alert("删除失败");
        }
    },"json")
})

// <!--发件人模态框删除-->

var idtea1
$('#exampleModal2').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    idtea1 = button.data('id') // Extract info from data-* attributes
    var name = button.data('name') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('#messagetext2').text('确认将消息记录-' +name+'-删除吗？')
})
$("#deleteOneSure2").click(function (){

    $("#exampleModal2").attr("class","modal fade")
    $("#exampleModal2").css("display","none")
    $.post(url+"/news/delectonesend","newsId="+idtea1,function (data) {

        if(data.code==1){


            $("#nothingtodo").html("")
            $("#sendmessage").html("")
            toltalnum1();
            $(".modal-backdrop").remove()
        }else{
            layer.alert("删除失败");
        }
    },"json")

    //删除写这里
})

// <!--//发送，多选模态框-->

var layer
layui.use('layer', function(){
    layer = layui.layer;
});
$("#canle").click(function (){
    $("#exampleModalAll").attr("class","modal fade")
    $("#exampleModalAll").css("display","none")
})
$("#deleteAllSure").click(function (){

    var checkbox = $("input[name='optionAll']");
    var s=new Array();
    var j=0
    for(var i = 0;i<checkbox.length;i++)
    {
        if(checkbox[i].checked==true)
        {console.log(checkbox[i].value)
            s[j++]=(checkbox[i].value)
        }
    }
    if(s.length>0){ $.post({
        url:url+"/news/deleteallnews",
        // 告知传递参数类型为json，不可缺少
        contentType:"application/json",
        data:JSON.stringify(s),
        success:function(data){
            if(data.code===1){
                $("#exampleModalAll").attr("class","modal fade")
                $("#exampleModalAll").css("display","none")
                $("#nothingtodo").html("")
                $("#sendmessage").html("")
                toltalnum1();

            }else{
                layer.alert("删除失败请重试！");
                $("#exampleModalAll").attr("class","modal fade")
                $("#exampleModalAll").css("display","none")
            }

        }
    })}else{
        layer.alert("所选数据为空！");
        $("#exampleModalAll").attr("class","modal fade")
        $("#exampleModalAll").css("display","none")
    }
})

// <!--收件，多模态框-->

var layer
layui.use('layer', function(){
    layer = layui.layer;
});
$("#canle2").click(function (){
    $("#exampleModalAll2").attr("class","modal fade")
    $("#exampleModalAll2").css("display","none")
})
$("#deleteAllSure2").click(function (){

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
        $.post({
            url:url+"/news/deleteallreceive",
            contentType:"application/json",
            data:JSON.stringify(s),
            success:function(data){
                if(data.code===1){
                    document.getElementById("test1").onclick();
                    // $("#exampleModalAll2").attr("class","modal fade")
                    // $("#exampleModalAll2").css("display","none")
                    $("#nothingtodo").html("")
                    $("#showmseeage").html("")
                    toltalnumdef()
                }else{
                    layer.msg("删除失败请重试！");
                    $("#exampleModalAll2").attr("class","modal fade")
                    $("#exampleModalAll2").css("display","none")
                }
            }
        })}else{
        layer.msg("所选数据为空！");
        $("#exampleModalAll2").attr("class","modal fade")
        $("#exampleModalAll2").css("display","none")
    }
})


// <!--标为已读===========================-->
function receiveRead(id,elaa) {
    $.ajax({
        url: url+"/news/isread",
        type: "post",
        data: "receiveId="+id ,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                elaa.parentNode.parentNode.innerHTML="已读"
            } else {
                alert("标记失败！")
            }
        }
    })
}


