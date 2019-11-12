var Utils = (function(){
    return {
        randomColor : function(alpha){
            if(alpha<0 || isNaN(alpha) || alpha>1) alpha = 1;
            var color = "rgba(";
            for(var i=0;i<3;i++){
                color += ~~(Math.random()*256);
                color += ",";
            }
            color += alpha + ")";
            return color;
        },
        randomNum : function(max=2,min=1){
            return ~~(Math.random()*(max-min)+min);
        },
        
        loadImage : function(arr,callback){
            var img = new Image();
            img.arr = arr;
            img.num = 0;
            img.callback = callback;
            img.imgList = [];
            img.addEventListener("load",this.loadHandler);
            img.src = arr[img.num];
        },

        loadHandler : function(){
            this.imgList.push(this.cloneNode(false));
            this.num++;
            if(this.num>this.arr.length-1){
                this.callback(this.imgList);
                this.removeEventListener("load",this.loadHandler);
                return;
            }
            this.src = arr[this.num];
        },
        
        callbackFun : function(imgList){
            for(var i=0;i<imgList.length;i++){
                console.log(imgList[i].src);
            }
        },

        dragElem : function(elem){
            elem.addEventListener("mousedown",this.mouseHandler);
            elem.self = this;
        },

        removeDragElem : function(elem){
            elem.removeEventListener("mousedown",this.mouseHandler);
            elem.self = null;
        },

        mouseHandler : function(e){
            e.preventDefault();
            switch(e.type){
                case "mousedown":
                    document.addEventListener("mousemove",this.self.mouseHandler);
                    this.addEventListener("mouseup",this.self.mouseHandler);
                    this.x1 = e.offsetX;
                    this.y1 = e.offsetY;
                    document.elem = this;
                    break;
                case "mousemove":
                    console.log(e.pageX);
                    this.elem.style.left = e.pageX - this.elem.x1 +"px";
                    this.elem.style.top = e.pageY - this.elem.y1 +"px";
                    break;
                case "mouseup":
                    document.removeEventListener("mousemove",this.self.mouseHandler);
                    this.removeEventListener("mouseup",this.self.mouseHandler);
                    break;
            }
        },

        //动画
        animate : function(dom,cssObj,duration,callBack){
            //存储当前的css
            var nowObj = {}
            for(var key in cssObj){
                nowObj[key] = parseInt(getStyle(dom,key));
            }
            var interval = 20;
            var allCount = duration / interval;
            var count = 0;
            var timer = setInterval(function(){
                count++;
                for(var key in cssObj){
                    if(key.toLowerCase() === "opacity"){
                        dom.style[key] = nowObj[key] + count * (cssObj[key] - nowObj[key]) / allCount;
                    }else{
                        dom.style[key] = nowObj[key] + count * (cssObj[key] - nowObj[key]) / allCount + "px";
                    }
                }
                if(count >= allCount){
                    clearInterval(timer);
                    callBack && callBack();
                }
            },interval);
        },
        
        //兼容性获取元素样式 ----> animation
        getStyle : function(dom,prop){
            return window.getComputedStyle ? window.getComputedStyle(dom)[prop] : dom.currentStyle[prop];
        },

        // ajaxGet请求
        ajaxGet : function(url,data){
            data = data || {};
            var str = "";
            for(var i in data){
                str += `${i}=${data[i]}&`;
            }
            var d = new Date();
            url = url + "?" + str + "__nic="+d.getTime();
            
            var p = new Promise(function(res,rej){
                var xhr = new XMLHttpRequest();
                xhr.open("get",url,true);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4 && xhr.status == 200){
                        res(xhr.responseText)
                    }else if(xhr.readyState == 4 && xhr.status != 200){
                        rej(xhr.status);
                    }
                }
                xhr.send();
            })
            return p;
        },
        
        //ajaxPost请求
        ajaxPost : function(url,data){
            data = data || {};
            var str = "";
            for(var key in data){
                str += `${key}=${data[key]}&`;
            }
            str = str.slice(0,str.length-1);
            var p = new Promise(function(res,rej){
                var xhr = new XMLHttpRequest();
                xhr.open("POST",url,true);
                xhr.onreadystatechange = () => {
                    if(xhr.readyState == 4 && xhr.status == 200){
                        res(xhr.responseText);
                    }else if(xhr.readyState == 4 && xhr.status != 200){
                        rej(xhr.status);
                    }
                }
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send(str);
            })
            return p;
        },
        
        // jsonp的方法  -----> 利用script中src的属性
        jsonp : function(url,data){
            data = data || {};
            var str = "";
            for(var key in data){
                str += `${key}=${data[key]}&`;
            }
            url += "?" + str.slice(0,str.length-1);
            var p = new Promise(function(){
                var script = document.createElement("script");
                script.src = url;
                document.body.appendChild(script);
                window[data[data.columName]] = res => {
                    res(res);
                }
            })
            return p;
        },

        //设置cookie
            /*  options中包括{
                    expires: 天数,
                    path : (WWW)/后面的路径
            } */
        setCookie : function(key,val,options){
            var expires = "";
            if(options.expires){
                var d = new Date();
                d.setDate(d.getDate() + options.expires);
                expires = `;expires=${d}`;
            }
            var path =`;path=${options.path ? options.path : ""}`;
            
            document.cookie = `${key}=${val}${expires}${path}`;
        },

        /*
            removeCookie(key,{
                path: "/"
            })
            如果有路径问题需要写路径,不然可以不写
        */
        removeCookie : function(key,options){
            options = options || {};
            // 有效期设置为-1,表示删除
            options.expires = -1;

            val = this.getCookie(key);
            this.setCookie(key,val,options);
        },

        getCookie : function(key){
            var data = document.cookie;
            data = data.split("; ");
            for(var i=0;i<data.length;i++){
                if(data[i].split("=")[0]==key){
                    return data[i].split("=")[1];
                }
            }
            return "none";
        },
        // 事件委托函数
        entrust : function(children,cb){
            return function(e){
                for(var i=0;i<children.length;i++){
                    if(children[i] === e.target){
                        cb.bind(e.target)();
                    }
                }
            }
        },
    }
}());




