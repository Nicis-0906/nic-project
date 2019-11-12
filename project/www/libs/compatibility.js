var Compatibility = (function(){
    return {
        // 获取DOM样式
        getStyle : function(dom){
            if(window.getComputedStyle(dom)){
                return getComputedStyle(dom)
            }else{
                return dom.currentStyle
            }
        },
        //事件监听
        eventListener : function(dom,type,handler,bool){
            bool = bool || false;
            if(dom.addEventListener){
                return dom.addEventListener(type,handler,bool);
            }else{
                dom.attachEvent("on"+type,handler,bool);
            }
        },
        //移除监听
        removeEvent : function(dom,type,handler,bool){
            bool = bool || false;
            if(dom.removeEventListener){
                return dom.removeEventListener(type,handler,bool);
            }else{
                dom.detachEvent("on"+type,handler,bool);
            }
        },
    
        cancelBubble : function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        },
    
        preventDefault : function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
    
        ajax : function(){
            if(window.XMLHttpRequest){
               var xhr = new XMLHttpRequest();
            }else{
                var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xhr;
        }
    }

})()