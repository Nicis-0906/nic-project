;(function($){
    
    $.fn.bannerP = function(options){

        this.obj  = {};

        var that  = this.obj;

        that.imgBox    = options.imgBox;

        that.leftBtn   = options.left;

        that.rightBtn  = options.right;

        that.width     = options.width || that.imgBox.eq(0).width();

        that.interval  = options.interval  || 1000;

        that.delayTime = options.delayTime || that.interval + 5;

        that.autoPlay  = options.autoPlay  || false;

        that.list      = options.list == false ? false : true;

        that.index     = 0;

        that.prev      = this.obj.imgBox.length-1;
        
        that.flag      = true;

        ;(function(){
            that.imgBox.eq(0).css({
                left:0
            }).siblings("li").css({
                left:that.width
            })
        })();
        
        // autoPlay
        ;(function() {
            if ( that.autoPlay ) {
                
                that.time = setInterval( () => {
                    that.rightBtn.trigger( "click" );
                }, that.delayTime );
    
                that.imgBox.parent().parent().hover( function(){
                    clearInterval( that.time );
                } , function(){
                    
                    that.time = setInterval( () => {
                        that.rightBtn.trigger( "click" )
                    }, that.delayTime );
    
                })
            }
            
        })();
        
        // 小圆点
        ;(function() {  
            if ( that.list ) {
            
                that.listUl = document.createElement( "ul" );

                $( that.listUl ).css({
                    width : that.imgBox.length * 40,
                    position: 'absolute',
                    display: 'flex',
                    bottom: 10,
                    left: 0,
                    right: 0,
                    margin: "0 auto ",
                    // cursor: 'pointer',
                })
                
                that.imgBox.parent().parent().append($( that.listUl ));

                for ( var i = 0 ; i < that.imgBox.length ; i++ ) {
                    var li = document.createElement( "li" );

                    $(li).css({
                        background: "rgba(200,200,200,.8)",
                        height: 10,
                        width: 10,
                        borderRadius: "50%",
                        margin: "0 10px",
                    })

                    that.listUl.appendChild( li );        

                }
                
                $( that.listUl ).children( "li" ).eq( 0 ).css( "background" , "red" );

                
            }
        })();


        // addEvent
        ;(function() {
            that.leftBtn.on ( "click" ,function(){
                if( that.flag ){
                    that.prev = that.index;
                    that.index -- ;
                    btnDown( 1 );
                }
            });
            that.rightBtn.on("click",function(){
                if( that.flag ){
                    
                    that.prev = that.index;
                    that.index ++ ;
                    btnDown( -1 );
                }
            })

            $( that.listUl ).children( "li" ).on( "click" ,function () {  
                if( that.flag ) {
                    that.prev = that.index;
                    that.index = $(this).index();

                    if ( that.prev > that.index ) {
                        btnDown(1);
                    }else if ( that.prev < that.index ) {
                        btnDown(-1);
                    }
                }
                
            })
        })();
        
        // function btnDown
        function btnDown( t ) {

            setTimeout(() => {
                that.flag = true;
            }, that.interval);


            if ( that.index < 0 ) {
                that.index = that.imgBox.length-1;
            }else if ( that.index > that.imgBox.length-1 ) {
                that.index = 0;
            }

            if ( that.list ) { 
                $( that.listUl ).children("li").eq(that.index).css( "background" , "red" ).siblings().css( "background" , "rgba( 200, 200, 200, .8)" );
            }

            that.imgBox.eq( that.index ).css({
                left: -that.width * t,
            }).stop().animate({
                left:0
            }, that.interval )

            that.imgBox.eq( that.prev ).css({
                left:0
            }).stop().animate({
                left: that.width * t,
            }, that.interval )

            that.flag = false;
        }

    }

})(jQuery);