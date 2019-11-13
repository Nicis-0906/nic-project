$(function(){
    

    ;(function(){
        $("#generalLoginForm").formVerify({
            type: "login",
            userInp: $("#login_userName"),
            passInp: $("#login_password"),
            url:"http://127.0.0.1:81/ajax",
            submit:$("#login_account_submit_btn"),
            autoLoginBtn:$(".m-checkbox")
        })

        

        // $("#registerIcn").on("click",function(){
        //     Utils.ajaxPost("http://127.0.0.1:81/ajax",{
        //         type:"register",
        //         user:$("#phone").val(),
        //         pass:$("#regiter-password").val()
        //     }).then(function(data){
        //         var data = JSON.parse(data);
        //         formJudge(data);
        //     })
        // })

    })();

})