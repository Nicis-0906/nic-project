var http = require("http");
var fs   = require("fs");
var url  = require("url");
var querystring = require("querystring");

http.createServer( (req,res) => {
    if(req.url != "/favicon.ico"){
        var urlObj = url.parse(req.url,true);
        if(urlObj.pathname == "/ajax"){
            ajax(req,res);
        }else{
            files(req,res);
        }
    }
    
}).listen("81","127.0.0.1",() => {
    console.log("成功");
});


let msgArr = [];

function ajax(req,res) {  
    
    var msg = "";
    req.on("data",s => {
        msg += s;
    });

    console.log(url.parse(req.url));

    req.on("end", () => {
        if(msg == ""){
            // get数据
            let urlObj = url.parse(req.url,true);
            msg = urlObj.query;
        }else{
            // post数据
            msg = querystring.parse(msg);
            
        }
        if( msg.type == "register") {
            var onoff = true;
            for(let i=0;i<msgArr.length;i++){
                if(msgArr[i].user === msg.user) {
                    var obj = {code:"1",tit:"重名",msg:{user:msg.user,pass:msg.pass}};
                    res.write(JSON.stringify(obj));
                    onoff = false;
                }
            }
            if(onoff) {
                msgArr.push({
                    user:msg.user,
                    pass:msg.pass
                });
                let obj = {code:"2",tit:"注册成功",msg:{user:msg.user,pass:msg.pass}};
                res.write(JSON.stringify(obj));
            }
            
        }else if( msg.type == "login") {
            let loginOnOff = "3";
            for(var i=0;i<msgArr.length;i++) {
                if(msgArr[i].user == msg.user && msgArr[i].pass == msg.pass) {
                    loginOnOff = "1";
                }else if(msgArr[i].user == msg.user && msgArr[i].pass != msg.pass) {
                    loginOnOff = "2";
                }
            }

            var obj = {
                code: loginOnOff
            }
            switch (loginOnOff){
                case "1":
                    obj.tit = "登录成功";
                    obj.msg = {user:msg.user,pass:msg.pass};
                    break;
                case "2":
                    obj.tit = "密码错误";
                    break;
                case "3":
                    obj.tit = "用户名不存在";
                    obj.msg = {user:msg.user};
                    break;
            }

            res.write(JSON.stringify(obj));
        }
        
        res.end();
    })
}


function files(req,res) { 
    var urlObj = url.parse(req.url);
    var path = "";
    if(req.url == "/"){
        path = "/index.html"
    }else if(urlObj.pathname.includes( "." )){
        path = urlObj.pathname;
    }else{
        path = urlObj.pathname + "/index.html";
    }
    
    if(urlObj.query){
        console.log(urlObj.query)

    }
    
    fs.readFile("./www" + path , (err,data) => {
        if(err){
            res.write("404");
        }else{
            res.write(data);
        }
        
        res.end();
    })

}

