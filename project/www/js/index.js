$(function () {

    // 自动登录获取cookie
    $.autoLogin();
    

    $(".loop").banner({
        imgBox: $(".loop").children("li"),
        left: $(".loop").children("div.left"),
        right:$(".loop").children("div.right"),
        autoPlay:true,
        delayTime: 3000,
        interval:700,
        lock: false
    })

    $("aside").goTop({
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