$(function(){
    

    ;(function(){
        $("#regiterFrm").formVerify({
            type: "login",
            userInp: $("#phone"),
            passInp: $("#regiter-password"),
            url:"http://127.0.0.1:81/ajax",
            submit:$("#registerIcn"),
            agreement:$("#agreement")
        })
        
    })();

    



})