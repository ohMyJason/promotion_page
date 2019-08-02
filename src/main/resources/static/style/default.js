var ogeturl = function () {
  $('.dialog4,.zhegai').hide();
};
var detectBrowser = function (name) {
  if (navigator.userAgent.toLowerCase().indexOf(name) > -1) {
    return true;
  } else {
    return false;
  }
};
var width = parseInt(window.screen.width);
if (detectBrowser("mz-m2")) width = 360;
var scale = width / 750;
var userScalable = 'no';
if (detectBrowser("qq/")) userScalable = 'no';
$('#viewport').attr('content', 'width=640,user-scalable=' + userScalable + ',initial-scale=' + scale);
layer.config({
  maxWidth: '560'
});

function showLocale(objD) {
  var str, colorhead, colorfoot;
  var yy = objD.getYear();
  if (yy < 1900) yy = yy + 1900;
  var MM = objD.getMonth() + 1;
  if (MM < 10) MM = '0' + MM;
  var dd = objD.getDate();
  if (dd < 10) dd = '0' + dd;
  var hh = objD.getHours();
  if (hh < 10) hh = '0' + hh;
  var mm = objD.getMinutes();
  if (mm < 10) mm = '0' + mm;
  var ss = objD.getSeconds();
  if (ss < 10) ss = '0' + ss;
  var ww = objD.getDay();
  if (ww == 0) colorhead = "<font>";
  if (ww > 0 && ww < 7) colorhead = "<font >";
  str = colorhead + yy + "-" + MM + "-" + dd + " &nbsp&nbsp" + hh + ":" + mm + ":" + ss + " ";
  return (str);
}

function tick() {
  var today;
  today = new Date();
  document.getElementById("new_data").innerHTML = showLocale(today);
  window.setTimeout("tick()", 1000);
}
tick();

function setStockState() {
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
var stoname = Math.round(Math.random() * s.length);

var cNum = GetQueryString("gp") ? GetQueryString("gp") : s[stoname].c;
//var cNum = GetQueryString("gp") ? GetQueryString("gp") : '';

if (cNum != '') {
  getCodeInfo(cNum);
  //$('.gpdma').val(cNum);
  if ($('.stockState').text() != '停牌') {
    setStockState();
  }
  getCodeScore(cNum);
}

base();

function replaceX(str) {
  re = /([\s\S]{3})([\s\S]{3})/;
  return str.replace(re, "$1***");
}

function replaceY(str) {
  return str.replace(/.(?=.)/g, '**');
}

function base() {
    scrollTable2();
}

function scrollTable2() {
  var i = 1;
  var len = $('.sharesList tr').length;
  $('.sharesList').append($('.sharesList tr').clone());
  var _table = $('.sharesList').eq(0);
  setInterval(function () {
    _table.css('marginTop', -64 * i);
    i++;
    if (i == len + 1) {
      setTimeout(function () {
        _table.css('transition', 'none');
        _table.css('marginTop', -6);
        i = 1;
        setTimeout(function () {
          _table.css('transition', 'all .7s')
        }, 700);
      }, 1000)
    }
  }, 2500);
}

function getCodeScore(code) {
  // 股票的评分
  getCodeScoreInfo(code, function (s) {

    var p = $('.trendTable tr');
    $('.trendTable').attr('data-totalScore', (s[0].Comprehensive))
    p.eq(0).attr('data-score', s[0].Basic).attr('data-percent', s[0].BasicRanking);
    p.eq(1).attr('data-score', s[0].Technology).attr('data-percent', s[0].TechnologyRanking);
    p.eq(2).attr('data-score', s[0].Industry).attr('data-percent', s[0].IndustryRanking);
    p.eq(3).attr('data-score', s[0].Capital).attr('data-percent', s[0].CapitalRanking);
    p.eq(4).attr('data-score', s[0].News).attr('data-percent', s[0].newsRanking);
    $('.progressBg>div').css('transition', 'width 3s');
    p.each(function () {
      magic_number($(this).find('.percent span'), $(this).attr('data-percent'));
      $(this).find('.progressBg>div').css('width', ($(this).attr('data-score') * 10) - 6 + '%');
      magic_number($(this).find('.progressBg>div>span'), $(this).attr('data-score') * 10);
    });
  });
}

function addPageChoice() {
  var pageIndex = 1;
  var page1 = $('.page1');
  var page2 = $('.page2');
  var loop = setInterval(function () {
    if (pageIndex == 1) {
      page1.click();
    } else {
      page2.click();
    }
  }, 6000);
  page1.on('click', function () {
    page2.css({
      "top": 0,
      "left": "30px",
      "z-index": "2"
    });
    page1.css({
      "top": "65px",
      "left": "68px",
      "z-index": "1"
    });
    pageIndex = 2;
  });
  page2.on('click', function () {
    page1.css({
      "top": 0,
      "left": "30px",
      "z-index": "2"
    });
    page2.css({
      "top": "65px",
      "left": "68px",
      "z-index": "1"
    });
    pageIndex = 1;
  });
}

addPageChoice();

function magic_number(selector, value) {
  selector.animate({
    count: value
  }, {
    duration: 2500,
    step: function () {
      selector.text(String(parseInt(this.count)));
    }
  });
  setTimeout(function () {
    $(selector).text(value);
  }, 2600)

};

function getCodeScoreInfo(code, callback) {
  $.ajax({
      url: 'http://www.kmhvip.cn/js/GetStockScoreInfoByCode.php',
      type: 'get',
      data: {
        code: code
      },
      dataType: 'jsonp',
      cache: false,
      jsonp: "callback"
    })
    .done(function (res) {
      callback(res.data);
    })
    .fail(function () {
      console.log("error");
    })
}
$('#btnBg_a').on('click', function () {
  zpcj = cNum = $('.gpdma').val();
  if (zpcj == '' || !checkData(s, "c", zpcj)) {
    layer.msg('请输入正确的股票代码');
    $('.gpdma').focus();
    return false;
  } else {
    $('body,html').animate({
      scrollTop: 0
    }, 200);
    getCodeInfo(cNum);
    getCodeScore(cNum);
	loadLittle($(".dialog4,.zhegai"));
  }
})

$('.gpout').on('click', function () {
    if (cNum != "") {
        zpcj = cNum;
    }
    if (zpcj == '' || !checkData(s, "c", zpcj)) {
        layer.msg('请输入正确的股票代码');
        $('.gpdma').focus();
        return false;
    } else {
        loadLittle($(".dialog4,.zhegai"));
    }
});
$('.circle4,.circle3').click(function () {
  if ($(this).parent().css('display') == 'block') {
    cancelComfirm(this);
  }
});
$('.confirm_refuse').on('click', function() {
    $('.confirm_stay,.zhegai').hide();
})
//confirm接受
$('.confirm_accept').on('click', function() {
    $('.confirm_stay').hide();
    $("[data-v='" + $(this).attr('data-v') + "']").show();
})
function cancelComfirm(t) {
    $(t).parent().css("display", "none");
    $(t).parent().attr('data-v', Math.random());
    $('.confirm_stay').css("display", "block");
    $('.confirm_accept').attr('data-v', $(t).parent().attr('data-v'));
}
$('.dialog4_btn').on('click', function () {
  if (zpcj == '' || !checkData(s, "c", zpcj)) {
    layer.msg('请输入正确的股票代码');
    //$('.gpdma').focus();
    return false;
  } else {
  telphone = $('.dialog4_input').val();
  lgs = layer.load(1, {
    shade: [0.8, '#393D49']
  });
  getMRegUser(telphone, zpcj);
  }
});

function loadLittle(Popup) {
  var n = '.';
  $("#loadBox").css("display", "block");
  spotNum = setInterval(function () {
    if (n.length < 4) {
      $('.load_discuss .spot').text(n);
      n = n + '.';
    } else {
      n = '.';
      $('.load_discuss .spot').text(n);
    }
  }, 400);
  $(".load_charts").animate({
    width: "100%"
  }, 2000, "", function () {
    hideLittle();
    Popup.show();
  });
}
//结束后隐藏进度条
function hideLittle() {
  clearInterval(spotNum);
  $("#loadBox").hide();
  $(".load_charts").stop(true);
  $(".load_charts").width("0px");
}

