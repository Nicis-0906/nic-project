(function($){
    
    $.fn.aside = function(options){

        this.obj  = {};

        var that  = this.obj;

        that.scrollBack = options.scrollBack;
        
        init();

        function init(){
            addEvent();
        };

        function addEvent(){
            that.scrollBack.on("click",function(e){
                $(document.documentElement).animate({
                    scrollTop:0
                },1000)
            })
        }
    }
    
})(jQuery);