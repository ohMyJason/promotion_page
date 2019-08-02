//发送手机号
var scode = ["sh601009", "sh601010", "sh601011", "sh601012", "sh601015", "sh601016", "sh601018", "sh601020", "sh601021", "sh601066", "sh601068"]
var sname


function ajaxGet() {
    $.ajax({
        type: "GET",
        url: "/insertPhone",
        data: {
            phone: $("#tgMobile").val()
        },
        dataType: "text",
        success: function () {
            layui.use(['layer', 'form'], function () {
                var layer = layui.layer
                    , form = layui.form;
                layer.msg("您的诊股申请已成功提交，工作人员将与您联系相关事宜.");

            });
            document.getElementById("form-1").className = "dialog4";
            $("#code").text("博威合金");

        },
        error: function () {
            console.log("error");
            layui.use(['layer', 'form'], function () {
                var layer = layui.layer
                    , form = layui.form;
                layer.msg("请勿重复提交");

            });
        }

    });
}

//设置股票数据
function setStockData(data, code) {
    $("#gName").text(data.result[0].data.name);
    $("#scode").text("(" + code + ")");
    $("#jinkai").text(data.result[0].data.todayStartPri);
    $("#jinmai").text(data.result[0].data.competitivePri);
    $("#chenjiaolian").text(Math.round(data.result[0].data.traNumber / 10000) + "万");
    $("#zuoshou").text(data.result[0].data.yestodEndPri);
    $("#didian").text(data.result[0].data.todayMin);
    $("#jinmaijia").text(data.result[0].data.reservePri);
    $("#chenjiaoe").text(Math.round(data.result[0].data.traAmount / 10000) + "万");
    var zhandie = data.result[0].data.increPer;
    if (zhandie > 0) {
        $("#zhangdie").text(data.result[0].data.increPer+"↑");
    } else if (zhandie < 0) {
        $("#zhangdie").text(data.result[0].data.increPer+"↓");
        $("#zhangdie").css("color", "green");
    } else {
        $("#zhangdie").text(data.result[0].data.increPer+"-");
        $("#zhangdie").css("color", "white");
    }
    $("#Btn_2_1").text(data.result[0].data.name);
    $("#Btn_3-1").text(data.result[0].data.name);
    $("#code").text(data.result[0].data.name);
    sname = data.result[0].data.name;
    $(".dimensionName").text(data.result[0].data.name);
}


function ajaxGetStock(code) {
//请求股票数据
    $.ajax(
        {
            type: "GET",
            url: "/getStockData",
            data: {
                gid: code
            },
            dataType: "json",
            // crossDomain:true,
            success: function (data) {
                console.log("请求成功");
                setStockData(data, code);


            },
            error: function () {
                console.log("请求错误");
            }
        }
    )
}

//打开窗口
function openFrom() {
    document.getElementById("form-1").className = "dialog4-notnone";
    $("#video").css("margin-top","10000px");
}


//显示时间
function showTime() {
    nowTime = new Date();
    year = nowTime.getFullYear();
    month = nowTime.getMonth() + 1;
    date = nowTime.getDate();
    $("#now-time").text(year-2000 + "-" + month + "-" + date +" "+ nowTime.toLocaleTimeString());
}

//循环显示时间
setInterval("showTime()", 1000);

setInterval("tranPage()",2000);
//转换page
function tranPage() {
    console.log();
    if ($("#page_2").attr("class") == ("imgContent_page page2")) {
        $("#page_1").attr("class", "imgContent_page page2");
        $("#page_2").attr("class", "imgContent_page page1");
    } else {
        $("#page_1").attr("class", "imgContent_page page1");
        $("#page_2").attr("class", "imgContent_page page2");
    }
}

$(document).ready(function () {

    //请求股票数据
    var num = Math.round(Math.random() * scode.length);
    ajaxGetStock(scode[num]);

    //
    $("cover-img").css("top", $("#video").position().top);

    //点击立即诊股
    $("#btnBg_a").click(function () {
        if ($("#tgName").val().length == 6) {
            openFrom();
            var code = $("#tgName").val();
            sname = $("#Btn_2_1").text();
            $("#code").text(code);
        } else {
            layui.use(['layer', 'form'], function () {
                var layer = layui.layer
                    , form = layui.form;
                layer.msg("请输入6位股票代码");

            });
        }

    });

    //点击第二个按钮
    $("#Btn_2").click(function () {
        openFrom();
    })

    //点击第三个按钮
    $("#Btn_3").click(function () {
        openFrom();
    })

    //关闭表单触发事件，打开停留窗口
    $("#exit").click(function () {
        document.getElementById("form-1").className = "dialog4";
        $("#confirm_stay").attr("class", "confirm_stay_notnone");
    })

    //点击拒绝
    $("#confirm_refuse").click(function () {
        $("#confirm_stay").attr("class", "confirm_stay");
        $("#code").text(sname);
        $("#video").css("margin-top","auto");
    })

    //点击接受
    $("#confirm_accept").click(function () {
        $("#confirm_stay").attr("class", "confirm_stay");
        openFrom();
    })

    //点击提交手机号
    $("#btnTg").click(function () {
        if ($("#tgMobile").val().length < 11) {
            layui.use(['layer', 'form'], function () {
                var layer = layui.layer
                    , form = layui.form;
                layer.msg("请输入11位手机号码");

            });
        }else {

            ajaxGet();
        }

    })

    //点击page触发时间
    $("#page_2").click(function () {
        tranPage();

    })

    //点击视频
    $("#cover").click(function () {
        $("#cover").css("display", "none");
    })

});