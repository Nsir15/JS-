/**
 * 
 * 1. 先获取要操作的DOM
 * 2. 请求数据
 * 3. 绑定数据，渲染页面
 * 
 */

 jQuery(function($){

    let bannerRender = (function bannerRender(){

        let $container = $('.container'),
            $wrapper = $('.wrapper'),
            $focus = $('.focus'),
            $arrowLeft = $('.arrowLeft'),
            $arrowRight = $('.arrowRight'),
            $imgList = null,
            $focusList = null;

        // 过渡动画的时长
        let duration = 200,
            currentIndex = 0,
            previousIndex = 0,
            scrollTimer = null;

        // 请求数据
        let request =  function(){

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'json/banner.json',
                    method: 'get',
                    dataType: 'json',
                    async:true,
                    success: resolve,
                    error: reject
                });
            });
        };
            

        let bindHtml = function(res){
            let strImg = ``,
                strFocus = ``;            
            $(res).each((index,item)=>{
                strImg += `<li class="image"><img src="${item['img']}" alt="${item['desc']}"></li>`;
                strFocus += `<li class="${index === currentIndex ? 'active':null}"></li>`;
            });
            $wrapper.html(strImg);
            $focus.html(strFocus);

            $imgList = $wrapper.children();
            $focusList = $focus.children();
        };


        let dealFadeTransition = function(){
            
            let $cur = $imgList.eq(currentIndex),
                $previous = $imgList.eq(previousIndex);
            $cur.css('z-index',1);
            $previous.css('z-index',0);
            $cur.stop().animate({'opacity':1},duration,'linear',()=>{
                $previous.css('opacity',0);
                changeFocus();
                previousIndex = currentIndex;
            });
        };

        let handleArrow = function(){

            $arrowLeft.on('click',()=>{
                currentIndex --;
                if (currentIndex < 0) {
                    currentIndex = $imgList.length - 1;
                }
                dealFadeTransition();
            });

            $arrowRight.on('click',()=>{
                currentIndex++;
                if (currentIndex >= $imgList.length) {
                    currentIndex = 0;
                }
            dealFadeTransition();
            });
        };


        // 处理focus
        let changeFocus = function(){
            $focusList.eq(currentIndex).addClass('active').siblings().removeClass('active');
        };

        // focus绑定点击事件
        let handleFocusClick = function(){
            $focusList.each((index,item)=>{
                $(item).on('click',()=>{
                    currentIndex = index;
                    changeFocus();
                    dealFadeTransition();
                });
            });
        };


        // 鼠标移入移出事件处理
        let handleMouseAction =  function (){
            $container.mouseenter(()=>{
                // $arrowLeft.css('display','block');
                // $arrowRight.css('display','block');
                $arrowLeft.add($arrowRight).css('display','block');
                clearInterval(scrollTimer);
            });
            $container.mouseleave(()=>{
                // $arrowLeft.css('display', 'none');
                // $arrowRight.css('display', 'none');
                $arrowLeft.add($arrowRight).css('display','none'); //相当于合并
                scrollTimer = setInterval(() => {
                    currentIndex++;
                    if (currentIndex >= $imgList.length) {
                        currentIndex = 0;
                    }
                    dealFadeTransition();
                }, 2000);
            });
        };

        return {
            init:()=>{
                let promise = request();
                promise.then((res)=>{
                    bindHtml(res);
                    // 自动动画
                    scrollTimer = setInterval(() => {
                        currentIndex++;
                        if (currentIndex >= $imgList.length) {
                            currentIndex = 0;
                        }
                        dealFadeTransition();
                    }, 2000);
                    
                }).then(()=>{
                    handleArrow();
                    handleFocusClick();
                    handleMouseAction();
                });
            }
        };
    })();
    bannerRender.init();
 })