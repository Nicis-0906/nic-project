$(function () {  
        // 三级菜单
        $("#allNav").hover(function(){
            $(this).addClass("is-hover");
            $(this).children(".allNav__con").children(".allNav-lv1").hover(function(){
                $(this).addClass("is-active");
            },function(){
                $(this).removeClass("is-active")
            })
        },function(){
            $(this).removeClass("is-hover");
        })
    
    
        $.autoLogin();
    
        $(".toolbox-unfold").goTop({
            scrollBack:$(".js-goTop")
        })


        $.get("http://127.0.0.1:81/data/itemList.json",function (res) {
                res = JSON.parse(res);
                renderData(res);
                
            }
        );

        function renderData(res){
            for(var i=0;i<res.length;i++){
                console.log(res[i]);
                var $tr = $("<tr>");
            $tr.html(
                `<td class="text-center js-nr-td js-fix-td1" style="width: 116px; height: 102px; position: absolute; left: 0px;">
                    <div class="listPro_td" style="width: 115px;">
                        <div class="listPro_tdCon">
                            <a target="_blank" href="/item.html?itemId=${res[i].id}"  class="listPro_img">
                                <img src=${res[i].img}></a>
                        </div>
                    </div>
                </td>
                <td class="js-fix-td2 js-nr-td"
                    style="width: 165px; height: 102px; position: absolute; left: 116px;">
                    <div class="listPro_td" style="width: 164px;">
                        <div class="listPro_tdCon">
                            <a class="listPro_code preText" href="/item.html?itemId=${res[i].id}"
                                target="_blank">${res[i].name}</a>
                        </div>
                    </div>
                </td>
                <td class="js-fix-td3 js-nr-td"
                    style="width: 131px; height: 102px; position: absolute; left: 281px;text-align:center">
                    <div class="listPro_td" style="width: 130px;">
                        <div class="listPro_tdCon">
                            <p><a href="/brand/1058.html" target="_blank">${res[i].factory}</a></p>

                        </div>
                    </div>
                </td>
                <td class="js-nr-td" style="width: 156px; height: 102px;text-align:center">
                    <div class="listPro_td" style="width: 155px;">
                        <div class="listPro_tdCon">
                            <span >-</span>
                        </div>
                    </div>
                </td>
                <td class="text-center js-nr-td" style="width: 161px; height: 102px;">
                    <div class="listPro_td" style="width: 160px;">
                        <div class="listPro_tdCon">
                            <span class="text-muted--er">${res[i].price}</span>
                        </div>
                    </div>
                </td>
                <td class="js-nr-td text-center" style="width: 143px; height: 102px;">
                    <div class="listPro_td" style="width: 142px;">
                        <div class="listPro_tdCon">
                            <p>现货库存：<span class="text-warning">210770</span></p>
                        </div>
                    </div>
                </td>
                <td class="js-nr-td" style="height: 102px; width: 124px;">
                    <div class="listPro_td" style="width: 123px;">
                        <div class="listPro_tdCon">0201</div>
                    </div>
                </td>
                <td class="js-nr-td" style="height: 102px; width: 61px;">
                    <div class="listPro_td" style="width: 60px;">
                        <div class="listPro_tdCon">-</div>
                    </div>
                </td>
                <td class="js-nr-td" style="height: 102px; width: 77px;">
                    <div class="listPro_td" style="width: 76px;">
                        <div class="listPro_tdCon">-</div>
                    </div>
                </td>
                <td class="js-nr-td" style="height: 102px; width: 67px;">
                    <div class="listPro_td" style="width: 66px;">
                        <div class="listPro_tdCon">${res[i].memory}</div>
                    </div>
                </td>`
                )

                $('#list_tbody_list').append($tr);
            }
            
        }

})