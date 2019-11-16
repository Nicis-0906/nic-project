;(function($){  
    $.fn.formVerify  = function(options){
        
        this.obj      = {};

        var that     = this.obj;

        that.type    = options.type;
        
        that.userInp = options.userInp;

        that.passInp = options.passInp;

        that.submit  = options.submit;

        that.url     = options.url;

        that.agreement = options.agreement || "";

        that.autoLoginBtn = options.autoLoginBtn || "";

        that.verifyArr = [false,false,true,false,true];

        that.verifyNum = null;

        that.strip = options.strip || "";
        

        if(that.type=="register"){
            // 表单验证
            ;(function(){
                that.userInp.on("blur",function(){
                    var reg = /^1[358]{1}\d{9}$/;
                    var result = reg.test(this.value);
                    that.verifyArr[0] = result;
                    verify("user",result,this);
                })

                that.passInp.on("blur",function(){  
                    var reg = /^[1-9a-zA-Z!@#$%^&*~]{8,12}$/;
                    var result = reg.test(this.value);
                    that.verifyArr[3] = result; 
                    verify("pass",result,this);
                })

                // 要阻止冒泡才可以, 因为label绑定了input,所以触发了两次
                that.agreement.parent().on("click",function(e){
                    $(this).toggleClass("is-checked");
                    // 查看是否勾选注册协议
                    if($(this).hasClass("is-checked")){
                        that.verifyArr[4]=true;
                        verify("1",true,that.submit[0]);
                    }else{
                        that.verifyArr[4]=false;
                        verify("submit",false,that.submit[0],"请先同意协议");
                    }
                    return false;
                })

                // 验证条
                if(that.strip){
                    let _this = that;
                    that.strip.on("mousedown",function(e){
                        let that = this;
                        let left = $(that).offset().left;
                        $(document).on("mousemove",function(e){
                            _this.moveX = e.pageX - left - $(that).width()/2;
                            if(_this.moveX < 0) _this.moveX = 0;
                            if(_this.moveX >= $("#nc_1_n1t").width() - $(that).width()) _this.moveX = $("#nc_1_n1t").width() - $(that).width();
                
                            $(that).css("left",_this.moveX);
                            $("#nc_1__bg").css("width",_this.moveX);
                        })
                    })
                
                    $(document).on("mouseup",function(){
                        if(_this.moveX == 366){
                            _this.verifyArr[1] = true;
                            $(".nc-lang-cnt").eq(0).html("验证成功")
                            $(".nc-lang-cnt").eq(0).css("color","#fff");
                        }else{
                            $(_this.strip).animate({
                                left:0
                            },500)
                            $("#nc_1__bg").animate({
                                width:0
                            },500)
                        }
                        $(document).off("mousemove");
                    })
                }
                
            })();


            function verify(type,result,that,cText){
                $(that).next().remove();
                if(!result){
                    if(!$(that).next().length){
                        var text = "";
                        if(type=="user") text = "请输入正确的手机号!";
                        if(type=="pass") text = "请输入8到12位密码!";
                        if(type=="submit") text = "手机已被注册";
                        text = cText || text;
                        that.warning = $("<span>");
                        that.warning.html(text);
                        $(that).parent().css("position","relative").append(that.warning);
                        that.warning.css({
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            margin: "auto 0",
                            font:"12px/22px ''",
                            color: "#fff",
                            padding: "0 10px",
                            height: "22px",
                            background: "#d9d",
                            borderRadius: "5px",
                            right: -that.warning.width() + "px",
                        })
                    }
                }
            }

            // 表单提交
            (function () {  
                that.submit.on("click",function(){
                    that.result = that.verifyArr.every((item)=>item);
                    if(that.result){
                        Utils.ajaxPost("http://127.0.0.1:81/ajax",{
                            type:"register",
                            user:$("#phone").val(),
                            pass:$("#regiter-password").val()
                        }).then(function(data){
                            var data = JSON.parse(data);
                            formJudge(data);
                            that.passInp.val("");
                        })
                    }else{
                        
                    }
                })
            })();


            function formJudge(data){
                if(data.code == 1){
                    verify("submit",false,that.submit[0]);
                }else if(data.code == 2){
                    Utils.setCookie("autoLogin",JSON.stringify(data.msg),{
                        expires:10,
                    });
                    window.location.pathname = "/index.html";
                }
            }
        }else if(that.type=="login"){
            that.autoLoginBtn.on("click",function () {  
                $(this).toggleClass("is-checked");
                return false;
            })

            ;(function () {  
                that.submit.on("click",function(e){
                    e.preventDefault();
                    
                    Utils.ajaxPost(that.url,{
                        type: "login",
                        user: that.userInp.val(),
                        pass: that.passInp.val(),
                    }).then(function(data){
                        var data = JSON.parse(data);
                        that.passInp.val("");
                        if(data.code==1){
                            location.pathname = "/index.html";
                            if(that.autoLoginBtn.hasClass("is-checked")){
                                Utils.setCookie("autoLogin",JSON.stringify(data.msg),{
                                    expires:10
                                });
                            }
                        }else if(data.code==2){
                            logVerify(2);
                        }else if(data.code==3){
                            logVerify(3);
                        }
                    })
                })




            })();




        }

        function logVerify(code){
            that.submit.next().remove();
            var text = "";
            if(code==2) text = "密码错误";
            if(code==3) text = "用户名不存在";
            if(code==2 || code==3){
                if(!$(that).next().length){
                    that.warning = $("<span>");
                    that.warning.html(text);
                    that.submit.parent().css("position","relative").append(that.warning);
                    that.warning.css({
                        position: "absolute",
                        top: "10px",
                        margin: "auto 0",
                        font:"12px/22px ''",
                        color: "#fff",
                        padding: "0 10px",
                        height: "22px",
                        background: "#d9d",
                        borderRadius: "5px",
                        right: -that.warning.width() + "px",
                    })
                    if(code==2){
                        that.warning.css("top","60px");
                    }
                }
            }
        }
    }
        

})(jQuery)