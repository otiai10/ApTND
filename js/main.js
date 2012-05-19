/*
 * main.js
 * 
 * global functions of Holi-Ju
 *
 * ソースを覗いてくれてありがとうございます！
 * ちょっとくすぐったい！
*/

$(document).ready(function(){
/////////////////////////////

//////////////////////////////////////init 領域
$("#hiddenwindow").hide();
//$("#explain").hide();
//$("#explanation").hide();

var queryfree = false;


var now = new Date();
var y = now.getYear() + 1900;
var m = now.getMonth() + 1;
var d = now.getDate();
var WEEK = new Array("日", "月", "火", "水", "木", "金", "土");

$("#thismonth").html(cal(y,m,d,true));
if (m == 12) {
    var nm = 1;
    var ny = y +1;
    $("#nextmonth").html(cal(ny,nm,"",false));
} else {
    $("#nextmonth").html(cal(y,m+1,"",false));
}
//////////////////////////////////////init END


/////////////////////////////////////////各種クリック
$(".shade").click(function(){
    $("#pool").slideUp();
    $("#explanation").fadeIn(200,function(){
        $("#explain").fadeIn();
    });
    $("#tutrial").fadeIn(200);
});

$(".escape").click(function(){
    $("#explain").fadeOut("fast");
    $("#explanation").fadeOut("fast");
});

$("#onlyfree").toggle(
    function(){
        console.log("FREE-ON");
        fadeOutIn("onoff","ON",300,"position:relative;right:12px;");
        $("#switch").animate({
            left:"85px"
        },200,function(){
/*            $("#switch").css({ float:"right" }); */
            $("#onlyfree").css({ backgroundColor:"#00FFFF" });
        });
        queryfree = true;
    },
    function(){
        console.log("FREE-OFF");
        fadeOutIn("onoff","OFF",300,"position:relative;right:12px;");

        $("#switch").animate({
            left:"5px"
        },200,function(){
            $("#onlyfree").css({ backgroundColor:"#f0f8ff" });
        });
        queryfree = false;
    }
);
/////////////////////////////////////////////////////////各種クリックEND





$("td").click(function(){ //////////////"td" click event
$("td").css({color:"#39c"});
$(this).css({color:"red"});


fadeOutIn("atama",
    '<img src="img/loader/loader05.gif" width="20px"/>　 now loading', 300,"color:blue"
);
$("#pool").slideUp(500).html("");

//日付をつくっていく
var week = new Array("日", "月", "火", "水", "木", "金", "土");
var mo = this.getAttribute("month");
var ye = this.getAttribute("year");
var da = $(this).html();
var theday = ye + ("0" + mo).slice(-2) + ("0" + da).slice(-2);
var theday2 = new Date(ye,mo-1,da);
console.log(WEEK[theday2.getDay()]);

//keyword_ORつくっていく
var object = document.getElementById("keyword");
var keyword = htmlspecialcharsAptnd(object.value);
if ( keyword != null ) {
    keyword = "&keyword="+ keyword ;
} else {
    keyword = "";
}

//無料縛り判定
if (queryfree === true) {
    keyword += ",無料";
} else {
}

var url = "http://api.atnd.org/events/?count=100"+keyword+"&ymd="+theday+"&cont=90&format=jsonp";

console.log(url);

$.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp",
    success: function(res){

        $("#tutrial").fadeOut(300);

        var title = ye+"年"+mo+"月"+da+"日のイベント" ;
        var moretxt = "";
        fadeOutIn("atama", title, 200,"",function(){
            var txt = "<hr>";
            var len = res.events.length;
            //表示件数の決定
            var ketu = "";
            var repeat = 0;

            if (len > 10) {
                ketu = '<div id="more" style="color:#000099">全'+len+'件中10件表示中</div>';
                repeat = 10;
                for (var i=11; i<len; i++) {
                    moretxt += judgeFreeFlag(res.events[i]);
                    getAroundFree(res.events[i].description);
                }                    
            } else {
                ketu = "<div id='more'>全"+len+"件中"+len+"件表示</div>";
                repeat = len;
            }

            for (var i = 0; i<repeat; i++) {
                txt += judgeFreeFlag(res.events[i]);
            }
            fadeOutIn("ketu",ketu,200,"",function(){
                $("#pool").html(txt).slideDown(300, function(){
                    setUpPanda();
                    $(".link").css({
                        fontSize:"20px",
                        marginTop:"50px",
                        marginBottom:"50px",
                    }).bind('click',function(){
                        $("#hiddenwindow").delay(300).fadeIn(300,function(){
                            fadeOutIn("selected",mo+"月"+da+"日("+WEEK[theday2.getDay()]+")",100);
                        });
                    });

                    //moreevents領域のために準備
                    morediv = document.createElement("div");
                    morediv.setAttribute("id","morediv");
                    morediv.innerHTML = moretxt;
                    $(morediv).appendTo("#pool").hide();
                    $("#more").live("click",function(){
                        fadeOutIn("ketu","全件表示中",200,"color:black;");
                        //moreをクリックされた時の処理--->モジュール化しましょうね。
                       $("#morediv").slideDown(300, function(){
                            setUpPanda();
                            $(".link").css({
                                fontSize:"20px",
                                marginTop:"50px",
                                marginBottom:"50px",
                            }).bind('click',function(){
                                $("#hiddenwindow").delay(300).fadeIn(300,function(){
                                    fadeOutIn("selected",mo+"月"+da+"日("+WEEK[theday2.getDay()]+")",100);
                                });
                            });
                            $(".free").css({ color:"#000066" });
                        });



                       /////////////////////////// END moreをクリックされたときの処理。
                    }).css({ cursor:"pointer" });
                    $(".free").css({
                        color:"#000066"
                    });

                });
            });
        });
    },
    error: function(){
        alert("ajax failure");
    }
});
});/////////////////////////////////// END td click event



$("#closebtn").click(function(){
    $("#hiddenwindow").fadeOut(200);
});

function getMore(count)
{
    alert(count);
}

function setUpPanda()
{
    $(".panda").css({
        cursor:"pointer",
        float:"left",
    });
    $(".panda").hover(function(){
        var cont = this.getAttribute("descri");
        $("#caution").html(cont);
        $("#aboutfreeflag").stop().animate({
                right:"8%"
            },200);
        },function(){
            $("#aboutfreeflag").stop().animate({
                right:"-60%"
            },200);
    });
    $(".panda").toggle(function(){
        var cont = this.getAttribute("descri");
        $("#caution").html(cont);
        $("#aboutfreeflag").stop().animate({
                right:"8%"
            },200);
        },function(){
            $("#aboutfreeflag").stop().animate({
                right:"-60%"
            },200);
    });
}

function judgeFreeFlag(anevent)
{
    var txt = "";
    if (anevent.description.match(/無料/)) {
        var descri = getAroundFree(anevent.description);
        txt = '<img src="img/panda.gif" class="panda" height="20px" style="box-shadow:-5px 0px 10px #00ff66;" descri="'+descri+'"/><a class="link free" href="'+anevent.event_url+'" target="window" >'+anevent.title+'</a><hr>';
        return txt;
    } else {
        txt = '<a class="link" href="'+anevent.event_url+'" target="window" >'+anevent.title+'</a><hr>';
        return txt;
    }
}

function getAroundFree(description)
{
    description = htmlspecialcharsAptnd(description);
    var rex = new RegExp(/無料/); 
    if (description.match(rex)) { 
        return RegExp.leftContext.slice(-30) + '<b>無料</b>' + RegExp.rightContext.slice(0,30) ;
    } else { 
    } 
}

function htmlspecialcharsAptnd(ch) { 
    ch = ch.replace(/&/g,"") ;
    ch = ch.replace(/"/g,"") ;
    ch = ch.replace(/'/g,"") ;
    ch = ch.replace(/\r\n|\n\r|\n|\r/g,"") ;
    ch = ch.replace(/<.+>/g,"") ;
    return ch ;
}



/////////////////////////////
});
