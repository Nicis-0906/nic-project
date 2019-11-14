(function($){
    $.fn.glass = function(options){
        
        this.obj = {}
        let that = this.obj;

        that.parent   = options.parent;
        that.smallBox = options.smallBox;
        that.img      = options.img;
        
        console.log(that.img.attr("src"));

        console.log(that.smallBox);

        // 创建放大镜框和小元素
        (function(){

            that.img.css({
                position: 'absolute',
                top: 10,
                left: 10,
            });

            let left = that.img[0].offsetLeft;
            let top  = that.img[0].offsetTop;

            that.small = $("<div>").css({
                height: that.smallBox.height() / 2 + "px",
                width: that.smallBox.width() / 2 + "px",
                backgroundColor: "rgba(0,0,0,.2)",
                position: 'absolute',
                display: 'none',
                left: left,
                top: top,
            })

            that.smallBox.append(that.small);

            // 图片加载完
            that.img.on("load",function(){
                width  = $(this).width() / that.small.width() * that.smallBox.width();
                height = $(this).height() / that.small.height() * that.smallBox.height(); 

                afterLoad.call(that.img,width,height);
            });
            
            function afterLoad(width,height){
                that.back = $("<div>").css({
                    height: that.smallBox.height() + "px",
                    width:  that.smallBox.width() + "px",
                    border: "1px solid #d8d8d8",
                    position: 'absolute',
                    left: that.smallBox.width()+100 + "px",
                    top:0,
                    display: 'none',
                    background: `url(${that.img.attr("src")}) no-repeat`,
                    backgroundSize: `${width}px ${height}px`,
                })
    
                that.parent.append(that.back);

                that.smallBox.on("mouseenter",function(){
                    that.rW = ( that.img.width() - that.small.width() ) / ( width - that.smallBox.width());
                    that.rH = ( that.img.height() - that.small.height() ) / ( height - that.smallBox.height());
                    
                    that.back.css("display","block");
                    that.small.css("display","block");

                    $(document).on("mousemove",function(e){
                        // 不能用e.offsetX因为会子元素移动过来后    e.offsetX就会变成相对于子元素
                        let left = e.pageX - that.img.offset().left - that.small.width() / 2 + that.img[0].offsetLeft;
                        let top  = e.pageY - that.img.offset().top - that.small.height() / 2 + that.img[0].offsetTop;

                        if(left<=that.img[0].offsetLeft) left = that.img[0].offsetLeft;
                        if(top<=that.img[0].offsetTop) top = that.img[0].offsetTop;
                        if(left>=that.img[0].offsetLeft + that.img.width() - that.small.width()) left = that.img[0].offsetLeft+that.img.width() - that.small.width();
                        if(top>=that.img[0].offsetTop + that.img.height() - that.small.height()) top = that.img[0].offsetLeft+that.img.height() - that.small.height();


                        that.small.css({
                            left:left + "px",
                            top:top + "px",
                        })
                        
                        console.log(left,that.rW)
                        that.back.css({
                            backgroundPosition: `-${left / that.rW}px -${top / that.rH}px`
                        })
                    })
                })

                that.smallBox.on("mouseleave",function(){
                    $(document).off("mousemove");
                    that.back.css("display","none");
                    that.small.css("display","none");
                })
            }
            

            

        })();
    }
})(jQuery);