(function($){
    
    $.fn.goTop = function(options){

        this.obj  = {};

        var that  = this.obj;

        that.scrollBack = options.scrollBack;
        
        init();

        function init(){
            addEvent();
        };

        function addEvent(){
            that.scrollBack.on("click",function(e){
                console.log(1)
                $(document.documentElement).animate({
                    scrollTop:0
                },1000)
            })
        }
    }
    
})(jQuery);