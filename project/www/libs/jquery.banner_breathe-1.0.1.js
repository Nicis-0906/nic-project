;(function($){
    
    $.fn.banner = function(options){
        this.obj  = {};
        var that  = this.obj;
        that.imgBox    = options.imgBox;

        that.leftBtn   = options.left;

        that.rightBtn  = options.right;

        that.interval  = options.interval  || 1000;

        that.delayTime = options.delayTime || that.interval + 5;

        that.autoPlay  = options.autoPlay  || false;

        that.lock      = options.lock == false ? false : true;

        that.list      = options.list == false ? false : true;

        that.index     = 0;

        that.prev      = this.obj.imgBox.length-1;
        
        that.flag      = true;
        
        
        
        // autoPlay
        ;(function() {
            if ( that.autoPlay ) {

                that.leftBtn.css("display","none");
                that.rightBtn.css("display","none");

                that.time = setInterval( () => {
                    that.rightBtn.trigger( "click" );
                }, that.delayTime );
                
                that.imgBox.parent().hover( function(){
                    
                    that.leftBtn.css("display","block");
                    that.rightBtn.css("display","block");

                    clearInterval( that.time );
                } , function(){

                    that.leftBtn.css("display","none");
                    that.rightBtn.css("display","none");

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
                    width : that.imgBox.length * 30,
                    position: 'absolute',
                    display: 'flex',
                    bottom: 10,
                    right: 0,
                    margin: "0 auto ",
                    // cursor: 'pointer',
                })
                
                that.imgBox.parent().append($( that.listUl ));

                for ( var i = 0 ; i < that.imgBox.length ; i++ ) {
                    var li = document.createElement( "li" );

                    $(li).css({
                        background: "rgba(0,0,0,.5)",
                        height: 15,
                        width: 15,
                        borderRadius: "50%",
                        margin: "0 5px",
                    })

                    that.listUl.appendChild( li );        

                }
                
                $( that.listUl ).children( "li" ).eq( 0 ).css( "background" , "#0b75be" );

                
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

            if(that.lock){
                setTimeout(() => {
                    that.flag = true;
                }, that.delayTime);
            }

            if ( that.index < 0 ) {
                that.index = that.imgBox.length-1;
            }else if ( that.index > that.imgBox.length-1 ) {
                that.index = 0;
            }

            if ( that.list ) { 
                $( that.listUl ).children("li").eq(that.index).css( "background" , "#0b75be" ).siblings().css( "background" , "rgba(0,0,0,.5)" );
            }

            that.imgBox.stop().fadeOut( that.interval )

            that.imgBox.eq( that.index ).stop().fadeIn( that.interval )

            
            if(that.lock){
                that.flag = false;
            }
            
        }

    }

})(jQuery);