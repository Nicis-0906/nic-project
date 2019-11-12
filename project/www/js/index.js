$(function () {

    if(Utils.getCookie("autoLogin") != "none"){
        let autoLogin = JSON.parse(Utils.getCookie("autoLogin"));
        let username  = autoLogin.user;

        $(".topBar_l").html(`
            <span>您好！欢迎来到唯样商城！</span>
            <span class="al-tit">用户:</span>
            <span class="al-name">${username}</span>
            <a href="javascript:void(0)" href="#" class="quit">退出</a>
            <a href="#" class="text-orange">BOM 批量导入 型号</a>
        `)
        $(".log-re").html(`<span class="al-name">13764897772</span>`);

        $(".topBar_l .quit").on("click",function(){
            Utils.removeCookie("autoLogin");
            $(".topBar_l").html(`
                <span>您好！欢迎来到唯样商城！</span>
                <a href="/login.html" class="text-primary">登录</a>
                <span class="line"></span>
                <a href="/register.html" >注册</a>
                <a href="#" class="text-orange">BOM 批量导入 型号</a>
            `)
            $(".log-re").html(`
                <a href="http://127.0.0.1:81/login.html" class="login">登录</a>
                <a href="http://127.0.0.1:81/register.html" class="register">注册</a>
            `)
        })
    }
    
    



    $(".loop").banner({
        imgBox: $(".loop").children("li"),
        left: $(".loop").children("div.left"),
        right:$(".loop").children("div.right"),
        autoPlay:true,
        delayTime: 3000,
        interval:700,
        lock: false
    })

    $("aside").aside({
        scrollBack:$("aside dl dt .last")
    })

    var brandUrl = "./data/brand.json";
    $.ajax({
        type: "get",
        url: brandUrl,
        success: function (res) {
            var res = JSON.parse(res);
            renderBrand(res);
        }
    });

    function renderBrand(res){
        for(var i=0;i<res.length%5;i++){
            res.push(res[i]);
        }
        console.log(res);
        for(var i=0;i<res.length;i++){
            if(i%5==0){
                var $li = $("<li>");
                $(".brand .brand-loop").append($li)
            }
            $li.html(`${$li.html()}
                <a href="#">
                    <div class="brand-img">
                        <div style="background: url('${res[i].img}')"></div>
                    </div>
                    <div class="brand-logo">
                        <img src="${res[i].logo}" alt="">
                    </div>
                </a>
            `)
        }

        $(".brand .brand-loop").bannerP({
            imgBox: $(".brand .brand-loop").children("li"),
            left: $(".brand .brand-loop").children(".left"),
            right: $(".brand .brand-loop").children(".right"),
            list: false,
            autoPlay:true,
            delayTime:6666,
            
        })
    }

    $(".technology-main .main-l").bannerP({
        imgBox:$(".technology-main .main-l .list").children("li"),
        left:$(".technology-main .main-l .list .left"),
        right:$(".technology-main .main-l .list .right"),
        list:false,
        width: $(".technology-main .main-l .list").children("li").width()+10,
        interval:800,
        autoPlay:true,
        delayTime:6666
    })
    
    




});