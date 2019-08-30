// 先获取需要操作的元素  以及 设置后面需要用的变量
// 获取需要操作的DOM元素
// 请求数据，绑定数据。动态添加
// 添加事件和动画

// 实现无限轮播的思路：
/**
 * 每次left 左移一个容易的宽度，index++ ，显示第一张的时候 index = 0，第二张  index= 1，第三章 index= 2，第四张 index=3。。。。比如初始图片4张
 * 将第一张复制一份放到最后面，此时length= 5，当显示到这一张的时候，index= 4，继续点击 index++ ，index= 5，此时快速跳转到第一张，因为是一样的图片，所以跳动基本看不出来，此时 index重新赋值为1，就会感觉刚刚是从第一张开始重新轮播一样。
 * 
 */


//  这个和 index.js 的主要区别是为了修改之前slider操作的一些不正当写法。
let bannerRender = (function () {

    // 获取要操作的元素
    let container = document.querySelector('.container'),
        wrapper = container.querySelector('.wrapper'),
        slider = container.querySelector('.slider'),
        currentIndex = 0,
        leftArrow = container.querySelector('.arrowLeft'),
        rightArrow = container.querySelector('.arrowRight');


    // 请求数据
    let queryBannerData = function () {
        return new Promise((resolve, reject) => {

            let ajx = new XMLHttpRequest();
            ajx.open('GET', 'json/banner.json', true);
            ajx.onreadystatechange = () => {
                if (ajx.readyState === 4 && ajx.status === 200) {
                    let data = JSON.parse(ajx.responseText);
                    resolve(data);
                }
            };
            ajx.send(null);
        });
    };


    // 绑定数据
    let bindHtml = function (data) {
        let strImg = ``,
            strSlider = ``;


        data.forEach((element, index) => {
            console.log(index)
            strImg += `<li class="image"><img src=${element['img']} alt=${element['desc']}></li>`;
            strSlider += `<li  class="${currentIndex === index ? 'active':''}"></li>`;
        });


        // 为了无缝切换效果，需要再拷贝第一张图片放在末尾
        strImg += `<li class="image"><img src=${data[0]['img']} alt=${data[0]['desc']}></li>`;

        wrapper.innerHTML = strImg;
        slider.innerHTML = strSlider;

        // 还要根据数据修改wrapper的宽度
        let originWidth = utils.CSS(container, 'width');
        let realWidht = originWidth * (data.length + 1);
        utils.CSS(wrapper, 'width', realWidht);

    };

    // 开始自动轮播
    let scrollTimer = setInterval(() => {
        autoMove();
    }, 2000);

    let imgList = wrapper.getElementsByClassName('image'),
        sliderList = slider.getElementsByTagName('li');

    // 自动轮播动画（这里面只处理图片移动全程的动画，就是过渡动画）

    let autoMove = function () {

        currentIndex++;
        if (currentIndex >= imgList.length) {
            currentIndex = 1;
            utils.CSS(wrapper, {
                left: 0
            })
        }
        // console.log('move====', -utils.CSS(container, 'width') * currentIndex);
        nx_animated(wrapper, {
            left: -utils.CSS(container, 'width') * currentIndex
        }, 300);

        // 设置slider联动
        handleSlider();
    };

    // 切花slider显示效果
    let handleSlider = function () {
        let tempIndex = currentIndex > sliderList.length -1 ? 0 : currentIndex;
        [].forEach.call(sliderList,(item,index)=>{
            item.className = index === tempIndex ? 'active':null;
        });
    };

    // slider点击事件
    let sliderClick = function () {

        [].forEach.call(sliderList, (item, index) => {
            item.onclick = () => {
                console.log('sliderClick');

                nx_animated(wrapper, {
                    left: -utils.CSS(container, 'width') * index
                }, 200);
                currentIndex = index;
                handleSlider();
            };
        });
    };

    // 左右箭头点击切换
    let handleArrow = function () {

        leftArrow.onclick = function () {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = imgList.length - 2;
                utils.CSS(wrapper, {
                    left: -utils.CSS(container, 'width') * (currentIndex + 1)
                });
            }
            nx_animated(wrapper, {
                left: -utils.CSS(container, 'width') * currentIndex
            }, 300);

            handleSlider();

        };
        rightArrow.onclick = function () {
            autoMove();
            console.log('rightArrow');
        };
    };


    // conatiner 鼠标交互处理

    let containerMouseEvent = function () {
        container.onmouseover = function () {

            clearInterval(scrollTimer);
            leftArrow.style.display = rightArrow.style.display = 'block';
        };
        container.onmouseout = function () {
            scrollTimer = setInterval(() => {
                autoMove();
            }, 2000);
            leftArrow.style.display = rightArrow.style.display = 'none';
        };
    };

    return {
        init: function () {
            let promise = queryBannerData();
            promise.then((res) => {
                console.log('res===', res)
                bindHtml(res);
            }).then(() => {
                handleArrow();
                sliderClick();
                containerMouseEvent();
            });
        }
    }
})()

bannerRender.init();
