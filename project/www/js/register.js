$(function(){

    $("#regiterFrm").formVerify({
        type: "register",
        userInp: $("#phone"),
        passInp: $("#regiter-password"),
        url:"http://127.0.0.1:81/ajax",
        submit:$("#registerIcn"),
        agreement:$("#agreement"),
        strip:$("#nc_1_n1z"),
    })



    


})