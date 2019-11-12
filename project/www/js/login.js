$(function(){
    

    ;(function(){
        $("#regiterFrm").formVerify({
            type: "login",
            userInp: $("#phone"),
            passInp: $("#regiter-password"),
            url:"http://127.0.0.1:81/ajax",
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