$(function () {  

    // 我也不知道为什么这样写
    // 但是这样写可以保存我要的变量
    window.obj = {};
    var that = window.obj;
    that.dataArr = [];
    that.maxNum  = 6;
    that.pageNum = null;
    that.nowPage = 1;

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

    // 自动登录
    $.autoLogin();

    // 火箭
    $(".toolbox-unfold").goTop({
        scrollBack:$(".js-goTop")
    })


    $.get("http://127.0.0.1:81/data/itemList.json",function (res) {
            res = JSON.parse(res);
            pressingData(res);
            renderPage()
            renderData(res);
            addEvent();
        }
    );


})

// 处理数据
function pressingData(res){
    // 在这里可以获取到这个obj的属性
    var that = window.obj;
    
    for(var i=0;i<res.length;i++){
        if(i%that.maxNum==0 || i==0){
            that.arr = [];
            that.dataArr.push(that.arr);
        }
        that.arr.push(res[i]);
    }

    that.pageNum = Math.ceil(res.length / that.maxNum);
}

// 渲染数据
function renderData(res){
    var that = window.obj;

    // 渲染数据
    let str = "";
    for(let i=0;i<that.dataArr[that.nowPage-1].length;i++){
        str+=
            
        `
        <tr>
            <td class="text-center js-nr-td js-fix-td1" style="width: 116px; height: 102px; position: absolute; left: 0px;">
                <div class="listPro_td" style="width: 115px;">
                    <div class="listPro_tdCon">
                        <a target="_blank" href="/item.html?itemId=${that.dataArr[that.nowPage-1][i].id}"  class="listPro_img">
                            <img src=${that.dataArr[that.nowPage-1][i].img}></a>
                    </div>
                </div>
            </td>
            <td class="js-fix-td2 js-nr-td"
                style="width: 165px; height: 102px; position: absolute; left: 116px;">
                <div class="listPro_td" style="width: 164px;">
                    <div class="listPro_tdCon">
                        <a class="listPro_code preText" href="/item.html?itemId=${that.dataArr[that.nowPage-1][i].id}"
                            target="_blank">${that.dataArr[that.nowPage-1][i].name}</a>
                    </div>
                </div>
            </td>
            <td class="js-fix-td3 js-nr-td"
                style="width: 131px; height: 102px; position: absolute; left: 281px;text-align:center">
                <div class="listPro_td" style="width: 130px;">
                    <div class="listPro_tdCon">
                        <p><a href="/brand/1058.html" target="_blank">${that.dataArr[that.nowPage-1][i].factory}</a></p>

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
                        <span class="text-muted--er">${that.dataArr[that.nowPage-1][i].price}</span>
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
                    <div class="listPro_tdCon">${that.dataArr[that.nowPage-1][i].memory}</div>
                </div>
            </td>
        </tr>`
    }
    $('#list_tbody_list').html(str);

    // 清除和页码无关的子元素
    that.pageArr = Array.from($("#list_pagination").children());
    that.pageArr.splice(that.pageNum+2,$("#list_pagination").children().length-that.pageNum+1);

    // 每次渲染之前先清除所有的 is-active
    that.pageArr.forEach(item=>{
        $(item).removeClass("is-active");
    })

    // nowPage那项的页码改变
    $("#list_pagination").children(".pageNum").eq(that.nowPage-1).addClass("is-active");
    // 判断特殊情况,渲染上一页和下一页的class
    if(that.nowPage == 1){
        $("#list_pagination").children().eq(0).addClass("is-active");
    }else if(that.nowPage == that.pageArr.length-2){
        $(that.pageArr).eq(that.pageArr.length-1).addClass("is-active");
    }
}

// 渲染页码
function renderPage(){
    var that = window.obj;
    // 渲染分页导航
    let str = `<a href="javascript:;">上一页</a>`;
    for(let i=0;i<that.pageNum;i++){
        str += `
            <a href="javascript:;" class="pageNum " >${i+1}</a>
        `
    }

    str+=`
        <a data-no="2" href="javascript:;">下一页</a>
        <span class="page-info">共 ${that.pageNum} 页</span>
        <span class="page-go">第<input pagination_inp="" type="text">页&nbsp;<button pagination_go="" type="button">确定</button></span>
    `
    $("#list_pagination").html(str);
}

// 添加页码事件
function addEvent(){
    var that = window.obj;
    $("#list_pagination").on("click",function(e){
        if(e.target.innerHTML == "上一页"){
            that.nowPage --;
        }else if(e.target.innerHTML == "下一页"){
            that.nowPage ++;
        }else if($(e.target).hasClass("pageNum")){
            that.nowPage = $(e.target).html();
        }else if(e.target.tagName == "BUTTON"){
            // 如果当前点击项等于当前页码,则不渲染
            if(that.nowPage == $(e.target).prev().val()) return;
            for(var i=1;i<=that.pageNum;i++){
                if($(e.target).prev().val() == i){
                    that.nowPage = i;
                }
            }
        }
        // 如果超出页码范围则不渲染
        if(that.nowPage < 1){
            that.nowPage = 1;
            return;
        }else if(that.nowPage > that.pageNum){
            that.nowPage = that.pageNum;
            return;
        }
        
        renderData();
    })

    
}




