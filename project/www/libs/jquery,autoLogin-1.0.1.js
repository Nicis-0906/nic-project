;(function($){
    $.autoLogin = function(){
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
            if(location.pathname == "/index.html"){
                $(".log-re").html(`<span class="al-name">13764897772</span>`);
            }
            
        
            
            $(".topBar_l .quit").on("click",function(){
                Utils.removeCookie("autoLogin");
                $(".topBar_l").html(`
                    <span>您好！欢迎来到唯样商城！</span>
                    <a href="/login.html" class="text-primary">登录</a>
                    <span class="line"></span>
                    <a href="/register.html" >注册</a>
                    <a href="#" class="text-orange">BOM 批量导入 型号</a>
                `)
                
                if(location.pathname == "/index.html"){
                    $(".log-re").html(`
                        <a href="http://127.0.0.1:81/login.html" class="login">登录</a>
                        <a href="http://127.0.0.1:81/register.html" class="register">注册</a>
                    `)
                }
               
            })
        }
    }
    
})(jQuery);