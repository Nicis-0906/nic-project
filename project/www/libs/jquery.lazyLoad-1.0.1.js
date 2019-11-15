(function($){
    $.lazyLoad = function(options){
        this.obj = {};
        let that = this.obj;
        that.imgArr = options.imgArr;

        onscroll = function(){
            that.imgArr.forEach((item,index) => {
                if($(item).offset().top <= document.documentElement.scrollTop + window.innerHeight){
                    item.src = $(item).attr("data-src");
                    that.imgArr.splice(index,1);
                }
            })
        }
    }
})(jQuery)