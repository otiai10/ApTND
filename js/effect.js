/******************************************
 * effect.js                              *  
 *                                        *
 * mainly visual effect is written here!  *
 *                                        *
*******************************************/


//function fadeOutIn(pid, txt, dur, obj, cb)
var fadeOutIn = function(pid, txt, dur, obj, cb)
{
    dur = parseInt(dur);
    //create next children
    var c = document.createElement("div");
    c.innerHTML = txt;
    if (obj != "") {
        c.setAttribute("style", obj);
    }
    //remove previous children
    var p = document.getElementById(pid);
    $(p).children().fadeOut(dur, function(){
        $(p).html("");
        //append next children
        $(c).hide().appendTo(p).fadeIn(dur,function(){if(cb!=null){cb();}});
    });
};

$(document).ready(function(){
/////////////////////////////
/*
$(".mon").hover(
    function(){
        $("#mess").html(
            "В–В№В»Вс"
        );
        $("#mess").animate({
                left:"50px"
            },
            200
        );
    },
    function(){
        $("#mess").animate({
                left:"-300px"
            },
            200
        );
    }
);
*/
/************* accordion **************/
/** set HTML  class="accordion_head" **/
/**************************************/
$('.accordion_head').click(function() {
    $(this).next().slideToggle();
}).next().hide();


//////////// fadeInOut //////////////
/// set HTML  any id at container ///
/***********************************/
/**** REQUIRED variable below ******/
//  container id name STRING       //
//  text inserted     STRING       //
//  duration  msecs   INTEGER      //
/***********************************/
/**** OPTIONAL variable below ******/
// obj = css object apply to child //
/////////////////////////////////////

var fadeOutIn = function(pid, txt, dur, obj)
{
    //create next children
    var c = document.createElement("span");
    $(c).html(txt);
    if (obj != null) {
        c.setAttribute("style", obj);
    }
    //remove previous children
    var p = document.getElementById(pid);
    $(p).children().fadeOut(dur, function(){
        $(p).html("");
        //append next children
        $(c).hide().appendTo(p).fadeIn(dur);
    });
}


});
