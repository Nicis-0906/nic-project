$(function(){
    
    var loginRE = $.autoLogin();

    let id = location.search.split("=")[1];

    $(".toolbox-unfold").goTop({
        scrollBack:$(".js-goTop")
    })

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

    $.get("./data/itemList.json",
        function (data) {
            var data = JSON.parse(data);
            renderData(data,after,id,loginRE);
        }
    );



    function after(){
        let num = 1;
        price = parseFloat($("#productPrice").html())
        $("#orderTotal").html((num*price).toFixed(5));

        

        $("#detailAdd_hasPrice .detailAdd_add").on("click",function(){
            num++;
            $("#productNum").val(num);
            $("#orderTotal").html((num*price).toFixed(5));
        })

        $("#detailAdd_hasPrice .detailAdd_minus").on("click",function(){
            num--;
            if(num<1){
                num=1;
            }
            $("#productNum").val(num);
            $("#orderTotal").html((num*price).toFixed(5));
        })
        
        $("#addToCart").on("click",function(){
            let cart = Utils.getCookie("cart") == "none" ? [] : JSON.parse(Utils.getCookie("cart"));
            
            for(var i=0;i<cart.length;i++){
                if(cart[i].id == id){
                    cart[i].num += num;
                    Utils.setCookie("cart",JSON.stringify(cart));
                    return;
                }
            }
            
            let msg = {
                "id":id,
                "num":num
            }

            cart.push(msg);
            Utils.setCookie("cart",JSON.stringify(cart));
            
        })

        tab(){
            $("detail_tabSec")
        }
    }
})


function tab(){

}

function renderData(data,cb,id,loginRE){
    
    for(var i=0;i<data.length;i++){
        if(data[i].id==id){
            data = data[i];
        }
    }

    let $div = $("<div>");
    $div.html(`
    <div class="detail clearfix">
                <div class="detailMn">
                    <div class="detailSec" style="margin-bottom: 0;">
                        <h1 class="detailHd">
                            <span class="detailHd_cap">绕线电阻 &nbsp;&nbsp;180Ohms ±5% 17.5mm 6927 无 ±20PPM/℃ </span>
                            <a class="detailHd_link" href="/user_invite.html" target="_blank">新人注册199.9厚礼已备</a>
                        </h1>

                        <div class="detailInfo">
                            <div class="detailImg">
                                <img onclick="wyComponent.showBigPic(this);"
                                    src=${data.img}  
                                    id="product-img" alt="产品图片">
                                <p>图像仅供参考 请参阅产品规格</p>
                            </div>
                            <div class="detailKys">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th width="190">制造商编号</th>
                                            <td>
                                                <span class="preText">${data.name}</span>
                                                <span class="ml10 text-warning fs-12" style="display: none"><i
                                                        style="font-size: 14px;" class="iconfont icon-warning-s fs-14"></i>
                                                    该型号已停产！</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th width="190">制&nbsp;造&nbsp;商</th>
                                            <td>
                                                <a href="/brand/922.html" class="text-muted">${data.factory}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th width="190">唯样编号</th>
                                            <td>${data.weiyangNum}</td>
                                        </tr>
                                        <tr>
                                            <th width="190">供货</th>
                                            <td>${data.provide}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th width="190">无铅情况/RoHs</th>
                                            <td>${data.RoHs}</td>
                                        </tr>
                                        <tr>
                                            <th width="190">描述</th>
                                            <td>
                                                <div style="word-break: break-word;min-height: 48px;"></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    
                    <div class="detailSec">
                        <h1 class="detailHd">
                            <span class="detailHd_cap">文档与媒体</span>
                        </h1>
                        <div class="detailMedia">
                            <table>
                                <tbody>
                                    <tr>
                                        <th width="178">
                                            数据列表
                                        </th>
                                        <td>
                                            <p class="text-mutedEr text-center" style="line-height: 40px;font-size: 12px;">
                                                暂无数据</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
    
                    <div id="detail_tabSec" class="detailSec">
                        <h1 class="detailHd-tab">
                            <a data-index="0" href="javascript:;" class="is-active detailHd_cap">规格信息</a>
                            <a data-index="2" href="javascript:;" class="detailHd_cap">常见问题</a>
                        </h1>
                        <div class="detailTab">
                            <div data-section="0" id="detailSpec" class="detailSpec detailTab_itm is-active">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="240" style="text-align: right; padding-right: 40px;">属性</th>
                                            <th style="padding-left: 40px;">属性值</th>
                                            <th width="80" style="text-align: center;">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th style="text-align: right;white-space: nowrap;padding-right: 40px;">商品目录</th>
                                            <td style="padding-left: 40px;">绕线电阻</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox is-checked">
                                                    <input disabled="" checked="" type="checkbox" value="绕线电阻">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">系列</th>
                                            <td style="padding-left: 40px;">WSC</td>
                                            <td style="text-align: center;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">电阻</th>
                                            <td style="padding-left: 40px;">180 Ohms</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="电阻" type="checkbox"
                                                        value="180 Ohms">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">功率（W）
                                            </th>
                                            <td style="padding-left: 40px;">3W</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="功率（W）" type="checkbox"
                                                        value="3W">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">偏差</th>
                                            <td style="padding-left: 40px;">±5%</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="偏差" type="checkbox" value="±5%">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">工作温度</th>
                                            <td style="padding-left: 40px;">-65°C ~ 275°C</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="工作温度" type="checkbox"
                                                        value="-65°C ~ 275°C">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">长度</th>
                                            <td style="padding-left: 40px;">17.5mm</td>
                                            <td style="text-align: center;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">宽度</th>
                                            <td style="padding-left: 40px;">7mm</td>
                                            <td style="text-align: center;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">高度</th>
                                            <td style="padding-left: 40px;">2.54mm</td>
                                            <td style="text-align: center;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">特点</th>
                                            <td style="padding-left: 40px;">MoldedResistors</td>
                                            <td style="text-align: center;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">封装/外壳
                                            </th>
                                            <td style="padding-left: 40px;">6927</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="封装/外壳" type="checkbox"
                                                        value="6927">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">电压</th>
                                            <td style="padding-left: 40px;">无</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="电压" type="checkbox" value="无">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: right;padding-right: 40px;white-space: nowrap;">温度系数</th>
                                            <td style="padding-left: 40px;">±20PPM/℃</td>
                                            <td style="text-align: center;">
                                                <label class="m-checkbox">
                                                    <input detail-spec-check="" data-attr="温度系数" type="checkbox"
                                                        value="±20PPM/℃">
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="detailSpec_op">
                                    <span>找到类似商品：</span>
                                    <em class="text-warning" id="totalNum">135</em>
                                    <button id="detail-srhSim" type="button" class="btn btn-primary">查看相似商品</button>
                                </div>
                            </div>
                            <div data-section="2" class="detailQues detailTab_itm">
                                <h3 class="PD-qus-hd">Q : 平台上的商品都是正品吗？</h3>
                                <p class="PD-qus-con">A : 请您放心,唯样商城所售卖的商品均为原装正品，我们是国内外知名品牌厂商的电子元件授权经销商，从源头保证品质。</p>
                                <h3 class="PD-qus-hd">Q : 可以提供原厂代理资质证明吗？</h3>
                                <p class="PD-qus-con">A :
                                    唯样自营精选品牌获得原厂授权代理资质，可以提供代理证书。部分商品数据来源于合作伙伴（如信和达、富昌电子、RS电子），我们对产品都进行了严格的资质审核，拥有原厂标签和相关票据以供查验。
                                </p>
                                <h3 class="PD-qus-hd">Q : 可以进行线下交易吗？</h3>
                                <p class="PD-qus-con">A : 我们提供线下付款服务，方便公司的采购与财务对接，具体操作流程可在线咨询客服。</p>
                                <h3 class="PD-qus-hd">Q : 可以退货吗？</h3>
                                <p class="PD-qus-con">A :
                                    下单前请仔细核对产品型号信息，如因自身原因造成的误订错订，唯样将不接受退换货要求。如果产品出现数量不对、型号不符、产品质量问题时，请务必保留原包装和标签，并在两周内联系我们申请退货。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detailSide">
                    <div class="detailSec">
                        <h1 class="detailHd">
                            <span class="detailHd_sdCap">库存&nbsp;:&nbsp;</span>
                            <span class="fl" style="font-weight:bold;font-size: 18px;" id="stockSpan">
                                ${data.num}
                            </span>
                        </h1>
                        <div class="detilHuoqi">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>货期</th>
                                        <td>
                                            3天-5天
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>最小包装</th>
                                        <td>
                                            725
                                            &nbsp;
                                            <div class="detailTip">
                                                <i class="iconfont icon-question"></i>
                                                <div style="width: 148px;top: -174px;left: -26px;" class="c-toolTip">
                                                    <div class="c-toolTip_con">
                                                        制造商那里获得的最小包装数。由于唯样提供增值服务，因此最低起购数量可能会比制造商的最小包装数量少
                                                        ，如果要购买整盘，建议购买这个数量的整数倍</div>
                                                    <i class="caret is-empty"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label class="m-checkbox-sm"><input id="detail_tray_chk" name="tray-check"
                                                    value="314810" type="checkbox">&nbsp;&nbsp;料盘7寸</label>
                                            <input type="hidden" class="tray-id" value="314810">
                                        </th>
                                        <td>
                                            <span style="vertical-align: middle;" class="text-warning">￥2</span>
                                            &nbsp;
                                            <div class="detailTip">
                                                <i class="iconfont icon-question"></i>
                                                <div style="width: 148px;top: -62px;left: -26px;" class="c-toolTip">
                                                    <div class="c-toolTip_con">若购买整盘会自带料盘无需额外购买料盘</div>
                                                    <i class="caret is-empty"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="detailAdd" id="detailAdd_hasPrice" style="display: block">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="detailAdd_box">
                                                <input id="productNum" name="currentNum" value="1" type="text"
                                                    class="detailAdd_num">
                                                <button type="button" class="detailAdd_add">+</button>
                                                <button type="button" class="detailAdd_minus">-</button>
                                                <a id="addToCart" href="/shopCart.html" class="detailAdd_buy">
                                                    <span>加入购物车</span>
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="detailAdd_ky">
                                                <p>最少：<span id="orderMinNum">1</span></p>
                                                <p>倍数：<span id="orderStepNum">1</span></p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="detailAdd_ftr clearfix" id="imputedShow">
                                <div class="fl">
                                    <em class="text-muted">单价：</em><span class="text-warning">￥<em
                                            id="productPrice">${data.price}</em></span>
                                </div>
                                <div class="fl ml10">
                                    <em class="text-muted">总价：</em><span class="text-warning">￥<em
                                            id="orderTotal">0</em></span> 
                                </div>
                            </div>
                        </div>
                        <div class="detailAdd" id="detailAdd_noPrice" style="display: none">
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">
                                            <a target="_blank" href="http://q.url.cn/ABDLIf?_type=wpa&amp;qidian=true"
                                                class="detailAdd_ask">立即询价</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="detailPri">
                            <table>
                                <thead>
                                    <tr>
                                        <th style="text-align: right;padding-right: 20px;">数量</th>
                                        <th style="position: relative;">单价(含税)<em id="rsAc-mark"
                                                style="display: none;position: absolute;left: 80px;top: 8px;"
                                                class="m-tipMark">折后价</em></th>
                                        <th>合计</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="text-align: right;padding-right: 20px;"><a href="javascript:void(0);"
                                                class="text-bold" data-pristep="1">1+</a></td>
                                        <td>${data.price}</td>
                                        <td></td>   
                                    </tr>
                                    <tr>
                                        <td style="text-align: right;padding-right: 20px;"><a href="javascript:void(0);"
                                                class="text-bold" data-pristep="100">100+</a></td>
                                        <td>￥1.358234</td>
                                        <td>￥135.8234</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="text-align: center;">
                                            <p class="text-mutedEr">整包（请按725的倍数下单）</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right;padding-right: 20px;"><a href="javascript:void(0);"
                                                class="text-bold" data-pristep="725">725+</a></td>
                                        <td>￥0.8</td>
                                        <td>￥580</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- 呆滞料说明-->
                </div>
            </div>`)
    
    $div.insertBefore($(".m-wrap .related"))
    if(!loginRE){
        return false
    }
    cb();
}