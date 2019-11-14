$(function(){
    var result = $.autoLogin();

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:81/data/itemList.json",
        success: function (res) {
            res = JSON.parse(res);
            after(res);
        }
    });

    $(".m-checkbox-yl").on("click",function(){
        tick(this);
        // 取消默认事件
        return false;
    })

});

function after(data){

    let cart = Utils.getCookie("cart") == "none" ? [] : JSON.parse(Utils.getCookie("cart"));

    for(var j=0;j<cart.length;j++){
        for(var i=0;i<data.length;i++){
            if(data[i].id == cart[j].id){
                $(".scTable .scTable_tb").html(`
                    ${$(".scTable .scTable_tb").html()}
                    <tr cart-proitm="87241" class="is-checked" index="${data[i].id}">
                        <td class="text-left" style="padding-left: 12px;">
                            <label class="m-checkbox-yl is-checked"><input cart-chkitm="289209" data-id="87241" data-proid="289209" cart-zy-chkitm="" type="checkbox">&nbsp;</label>
                        </td>
                        <td>
                            <a class="scPro_Img" href="/item.html?itemId=${data[i].id}" target="_blank">
                                <img src=${data[i].img}>
                            </a>
                        </td>
                        <td style="padding-left: 24px;" class="text-left">
                            <a href="/item.html?itemId=${data[i].id}" target="_blank" class="scPro_code">SFI0402EH240-0R20P</a>
                            <div class="scPro_ed" data-id="87241" data-proid="289209">
                                <input type="text" value="">
                            </div>
                        </td>
                        <td style="padding-left: 24px;" class="text-left">
                            <div>压敏电阻/0.2PF 0402 </div>
                            <p>SFI</p>
                        </td>
                        <td>
                            <div class="scPro_pri">
                                    <p><span cart-pro-pri="87241">￥${parseFloat(data[i].price)}</span>&nbsp;<i class="iconfont icon-eye"></i></p>
                                <div class="scPro_priLst">
                                    <span class="caret--top is-empty"></span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div cart-pro-num="87241" data-id="87241" class="scPro_inp ">
                                <input type="text" value="${cart[j].num}">
                                <button class="is-minus" type="button">-</button>
                                <button class="is-add" type="button">+</button>
                            </div>
                        </td>
                        <td>
                            <span data-total="0.396" class="text-warning text-bold" cart-pro-total="87241">￥${(cart[j].num*parseFloat(data[i].price)).toFixed(3)}</span>
                        </td>
                        <td>
                            <a data-id="87241" data-proid="289209" cart-collect-pro="" class="iconfont icon-collect" href="javascript:;"></a>
                            &nbsp;&nbsp;&nbsp;
                            <a data-id="87241" data-proid="289209" cart-del-pro="" class="iconfont icon-delete" href="javascript:;"></a>
                        </td>
                    </tr>`
                );
            }
        }
    }
    addEvent(data);
    judgeItem();
}

function addEvent(data){
    $(".scTable").on("click",function(e){
        if(e.target.nodeName=="BUTTON"){
            buttonEvent(e.target,data);
        }
    })

    $(".icon-delete").on("click",function(){
        deleteDom(this);
    })
}

// 加减数量判断
function buttonEvent(eTarget,data){

    let cart = Utils.getCookie("cart") == "none" ? [] : JSON.parse(Utils.getCookie("cart"));
    let id = $(eTarget).parent().parent().parent().attr("index");

    // 判断按钮的内容
    if(eTarget.innerHTML=="+"){
        $(eTarget).parent().children("input").val(~~($(eTarget).parent().children("input").val())+1)

    }else if(eTarget.innerHTML=="-"){
        $(eTarget).parent().children("input").val(~~($(eTarget).parent().children("input").val())-1)
        if($(eTarget).parent().children("input").val()<1){
            $(eTarget).parent().children("input").val(1)
        }
    }

    let price = null;

    data.forEach(item=>{
        if(item.id==id){
            price = parseFloat(item.price);
        }
    });

    // 小计的价格
    $(eTarget).parent().parent().parent().children("td").eq(6).children("span").html(`￥${(price * ~~$(eTarget).parent().children("input").val()).toFixed(3)}`);

    cart.forEach(item=>{
        if(item.id == id){
            item.num = $(eTarget).parent().children("input").val();
        }
    })

    judgeItem();
    
    Utils.setCookie("cart",JSON.stringify(cart));
}
// 打钩判断
function tick(that){
    console.log(that)
    $(that).toggleClass("is-checked");
    if(that == $(".m-checkbox-yl")[0] || that == $(".m-checkbox-yl")[$(".m-checkbox-yl").length-1]){
        if($(that).hasClass("is-checked")){
            $(".m-checkbox-yl").addClass("is-checked");
        }else{
            $(".m-checkbox-yl").removeClass("is-checked");
        }
    }

    judgeItem();
    
}

// 总价判断
function judgeItem(){
    let inpArr = Array.from($(".m-checkbox-yl").not($(".m-checkbox-yl").eq(0)).not($(".m-checkbox-yl").eq($(".m-checkbox-yl").length-1)));

    let result = inpArr.every(item=>$(item).hasClass("is-checked"));

    if(result){
        $(".m-checkbox-yl").eq(0).addClass("is-checked")
        $(".m-checkbox-yl").eq($(".m-checkbox-yl").length-1).addClass("is-checked");
    }else{
        $(".m-checkbox-yl").eq(0).removeClass("is-checked")
        $(".m-checkbox-yl").eq($(".m-checkbox-yl").length-1).removeClass("is-checked");
    }

    let sum = 0;
    let num = 0;
    inpArr.forEach(item=>{
        if($(item).hasClass("is-checked")){
            num ++;
            sum += parseFloat($(item).parent().parent().children("td").eq(6).children("span").html().split("￥")[1]);
        }
    })

    $("#cart_pro_cost").html(sum.toFixed(3));
    $("#cart_pro_num").html(num);
}

function deleteDom(that){

    let cart = JSON.parse(Utils.getCookie("cart"));

    let index = null;
    
    for(var i=0;i<cart.length;i++){
        if(cart[i].id == $(that).parent().parent().attr("index")){
            cart.splice(i,1);
        }
    }
    
    Utils.setCookie("cart",JSON.stringify(cart));
    
    $(that).parent().parent().remove();
    // 总价判断
    judgeItem();
}

