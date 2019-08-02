function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function checkData(data, pro, code) {
  var reg = new RegExp("^\d{6}$");
  var flag = false;
  for (var i = 0; i < data.length; i++) {
    var temp = data[i];
    if (temp[pro] == code) {
      flag = true;
      break;
    }
  }
  return flag;
}
var srid;
$(function () {
    $.get("/sp/SMSRecord/PostClickUrl?pkid=332&signid=232", function (result) {
        srid = result;
    });
  $('.searchBtn').on('click', function () {
    cNum = $(this).siblings('.searchInput').val();
    if (cNum==''||!checkData(s, "c", cNum)) {
      layer.msg('请输入正确的股票代码');
      return false;
    }
    else{
      //cNum = getcode(newCode);
      getCodeInfo(cNum);
      $('body,html').animate({
      scrollTop: 0
    }, 200);
    }
  });

});

function getcode(p) {
  if (p > 0) {
    return p;
  } else {
    for (var i = 0; i < s.length; i++) {
      if (s[i].n == p || s[i].c == p) {
        $('.top_p1 span').text(s[i].n);
        return s[i].c;
      }
    }
    return '';
  }
}
//+++++++++++++++++++++++++++++++
var ogeturl = function () {
$('.phone').val("");
};


function getCodeInfo(code) {
  $.ajax({
      url: 'http://qd.10jqka.com.cn/quote.php?cate=real&type=stock&return=json&callback=showStockData&code=' + code,
      type: 'get',
      dataType: 'jsonp',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .done(function (r) {
		if(r.info[code].name==''){
			for(var i=0;i<s.length;i++){
			var temp = s[i];
				if(temp['c'] ==code){
					r.info[code].name = temp['n'];
					break;
				}
			}
		}
      $('.gName,.btnBg span,#gptext,.codeName,.btnBgb span,.mnbut i,.pbut i,.cName,.gpname,.gpName,.tcxc h3,.stockName,.diagnosis_code_name,.but i,.dimensionName,.cc,.dialogBg span,.btnBg2 span').html(r.info[code].name); //名称
      $('.gCode,.diagnosis_code_num,.dm').text('(' + code + ')'); //代码
      $('.xianjia').text(r.data[code]["10"]); //现价
      $('.zhangdie').text(r.data[code]['264648'].slice(0, -1)); //价格变动
      $('.zhangfu').text(r.data[code]['199112'].slice(0, -1) + '%'); //变动百分比
      $('.zhangting').text(r.data[code]['69']); //涨停
      $('.dieting').text(r.data[code]['70']); //跌停
      $('.jinkai').text(r.data[code]['7']); //今开
      $('.zuigao').text(r.data[code]['8']); //最高
      $('.zuidi').text(r.data[code]['9']); //最低
      $('.zuoshou').text(r.data[code]['6']); //昨收
      $('.chengjiaoliang').text((r.data[code]['13'] / 10000).toFixed(2) + '万'); //成交量
      $('.chengjiaoe').text((r.data[code]['19'] / 100000000).toFixed(2) + '亿'); //成交额
      $('.zhenfu').text((r.data[code]['526792'] / 1).toFixed(2) + '%'); //振幅
      $('.huanshou').text((r.data[code]['1968584'] / 1).toFixed(2) + '%'); //换手
      $('.liutongshizhi').text((r.data[code]['3475914'] / 100000000).toFixed(2) + '亿'); //流通市值
      $('.huanshoulv').text((r.data[code]['1968584'] / 1).toFixed(2) + '%'); //换手
      $('.shiyinglv').text((r.data[code]['2034120'] / 1).toFixed(2)); //市盈率（动）



      if (r.data[code]['199112'] >= 0) {
        $('.zhangdie,.zhangfu,.xianjia').css('color', '#ee3a23');
        $('.zhishu img').attr('src', 'http://www.kmhvip.cn/js/arrow.png')
      } else {
        $('.zhangdie,.zhangfu,.xianjia').css('color', '#03a20c');
        $('.zhishu img').attr('src', 'http://www.kmhvip.cn/js/arrowdown.png')
      }
      if(!r.data[code]['10']){
            $('.xianjia').text('停牌');
            $('.zhangfu').text('');
            $('.zhishu img').css('opacity',0).css('visibility','hidden');
        }
      else{
        $('.zhishu img').css('opacity',1).css('visibility','visible');
      }
    })
    .fail(function () {
      console.log("error");
    })
}
/*
function getCodeInfo(code) {
  getStock(code, function (r) {
    $('.gName,.btnBg span,#gptext,.codeName,.btnBgb span,.mnbut i,.pbut i,.cName,.gpname,.gpName,.tcxc h3,.stockName,.diagnosis_code_name,.but i,.dimensionName,.cc,.dialogBg span,.btnBg2 span').html(r.name); //名称
    $('.gCode,.diagnosis_code_num,.dm').text('(' + code + ')'); //代码
    $('#stockname').val(code); //代码
    $('.xianjia').text(r.xianjia); //现价
    $('.zhangdie').text(r.zhangdie); //价格变动
    $('.zhangfu').text(r.zhangfu); //变动百分比
    $('.zhangting').text(r.zhangting); //涨停
    $('.dieting').text(r.dieting); //跌停
    $('.jinkai').text(r.jinkai); //今开
    $('.zuigao').text(r.zuigao); //最高
    $('.zuidi').text(r.zuidi); //最低
    $('.zuoshou').text(r.zoushou); //昨收
    $('.chengjiaoliang').text(r.chengjiaoliang); //成交量
    $('.chengjiaoe').text(r.chengjiaoe); //成交额
    $('.zhenfu').text(r.zhenfu); //振幅
    $('.huanshou,.huanshoulv').text(r.huanshou); //换手
    $('.liutongshizhi').text(r.liutongshizhi); //流通市值
    $('.shiyinglv').text(r.shiyinglv); //市盈率（动）
    $('.shijinglv').text(r.shijinglv); //市净率
    $('.zongshizhi').text(r.zongshizhi); //总市值

    if (r.zhangdie >= 0) {
      $('.zhangdie,.zhangfu,.xianjia').css('color', '#ee3a23');
        $('.zhishu img').attr('src', 'http://www.kmhvip.cn/js/arrow.png')
    } else {
      $('.zhangdie,.zhangfu,.xianjia').css('color', '#03a20c');
        $('.zhishu img').attr('src', 'http://www.kmhvip.cn/js/arrowdown.png')
    }
    //停牌
    if (!r.xianjia) {
      $('.xianjia').text('停牌');
        $('.zhangfu').text('');
        $('.zhishu img').css('opacity', 0).css('visibility', 'hidden');
      } else {
        $('.zhishu img').css('opacity', 1).css('visibility', 'visible');
      }
  });
}

function getStock(code, callback_) {
  var a = {};
  $.ajax({
    url: 'http://www.kmhvip.cn/js/GetStockInfo.php',
    type: 'get',
    data: {
      code: code
    },
    dataType: 'jsonp',
    cache: false,
    jsonp: "callback",
    contentType: 'application/x-www-form-urlencoded; charset=utf-8'
  }).done(function (r) {
    a.name = r.data[0].Name; //股票名称

    a.xianjia = r.data[0].Price.toFixed(2); //现价

    a.zhangdie = r.data[0].Change.toFixed(2); //价格变动

    a.zhangfu = r.data[0].ChangePercent.toFixed(2) + '%'; //变动百分比

    a.jinkai = r.data[0].Open.toFixed(2); //今开

    a.zuigao = r.data[0].Hige.toFixed(2); //最高

    a.zuidi = r.data[0].Low.toFixed(2); //最低

    a.zoushou = r.data[0].Close.toFixed(2); //昨收

    a.chengjiaoliang = (r.data[0].Volume / 100).toFixed(2) + '万'; //成交量

    a.chengjiaoe = (r.data[0].Amount / 100000000).toFixed(2) + '亿'; //成交额

    a.zhenfu = (r.data[0].Amplitude / 1).toFixed(2) + '%'; //振幅

    a.huanshou = (r.data[0].TurnoverRate / 1).toFixed(2) + '%'; //换手

    a.liutongshizhi = (r.data[0].CirculationWorth / 100000000).toFixed(2) + '亿'; //流通市值

    a.shiyinglv = r.data[0].PERatio.toFixed(2); //市盈率

    a.shijinglv = r.data[0].CityNetRate.toFixed(2); //市净率

    a.zongshizhi = (r.data[0].TotalMarketValue / 100000000).toFixed(2) + '亿'; //总市值

    a.Isstop = r.data[0].Isstop; //是否涨停

    a.zhangting = r.data[0].Max.toFixed(2); //涨停价

    a.dieting = r.data[0].Min.toFixed(2); //跌停价
    $('.banner_code').text(a.name);
    callback_(a);
    setStockState(a)
  }).fail(function () {
    $('.banner_code').text(a.name);
    callback_(a);
    setStockState(a)
  });
}

function setStockState(r) {
  //停牌
  if (r.Isstop) {
    $('.stockState').text('停牌');
    $('.stockStateContent').removeClass('stockStateNormal').addClass('stockStateStop');
    $('.xianjia').text(r.xianjia);
    $('.zhangfu,.zhangdie,.jinkai,.zuigao,.zuidi,.chengjiaoe,.chengjiaoliang,.huanshou,.zhenfu').text('--');
    $('.zhishu img').remove();
    $('.zhangdie,.zhangfu,.xianjia').css('color', '#fff');
    if ($('.xianjia').hasClass('black')) {
      $('.zhangdie,.zhangfu,.xianjia').css('color', '#000');
    }
  } else {
    $.ajax({
        url: 'http://www.kmhvip.cn/js/states.php',
        type: 'get',
        dataType: 'jsonp',
        cache: false,
        jsonp: "callback"
      })
      .done(function (res) {
        $('.stockState').text(res.data[0].strValue);
      })
      .fail(function () {
        console.log("error");
      })
  }

}

*/


//###########
var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for(i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if(sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};

var isGetVCode = false;
var telphone, zpcj, lgs;
var gzid = getUrlParameter('gzid');
function getMRegUser(mobile, remark) {
var regs = /^(13[0-9]|15[012356789]|18[0-9]|14[56789]|17[012345678]|19[89]|16[6])\d{8}$/;
if (!(regs.test(mobile))) {
    layer.close(lgs);
    layer.msg("请输入正确的手机号码！");
    return false;
}
if (isGetVCode) {
    layer.close(lgs);
    layer.msg("请勿重复提交！");
    return false;
} else {
    
    var content =  remark;
    $.ajax({
        type: "get",
        url: "https://houtai.hgq888.cn/index/index/add",
        data: {  mobile: mobile, stock_code: content, gzid: gzid, url: window.location.href },
        success: function (data) {
            if (data == "1") {
                alert("您的诊股申请已成功提交，工作人员将与您联系相关事宜. ");
                meteor.track("form", {convert_id: "1637187211343875"});
                layer.close(lgs);
            }
            else {
                alert("您的诊股申请已成功提交，工作人员将与您联系相关事宜. ");
                meteor.track("form", {convert_id: "1637187211343875"});
                layer.close(lgs);
            }
        }
    });
}
}

