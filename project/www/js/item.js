$(function(){
    $("#allNav").hover(function(){
        $(this).addClass("is-hover");
        $(this).children(".allNav__con").children(".allNav-lv1").hover(function(){
            $(this).addClass("is-active");
        },function(){
            $(this).removeClass("is-active")
        })
    },function(){
        $(this).removeClass("is-hover");
    })


    





})