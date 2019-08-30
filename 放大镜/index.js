
~(function(){
    // 获取需要操作的元素
    let contentBox = document.getElementById('content'),
        smallBox = contentBox.querySelector('.smallBox'),
        bigBox = document.getElementById('bigBox'),
        bigImg = bigBox.getElementsByTagName('img')[0];

    let left = contentBox.offsetLeft,//utils.CSS(contentBox, 'left'), 应该是获取内容盒子的距离body的左偏移，因为contentBox是相对定位，所以left和top是0
        top = contentBox.offsetTop,//utils.CSS(contentBox, 'top'),
        contentW = contentBox.offsetWidth, 
        // markW = smallBox.offsetWidth, // 此时 小盒子 display = 'none'，所以获取到的width = 0，
        // minL = 0,
        // minT = 0,
        // maxL = contentW - markW,
        // maxT = contentW - markW;


    computePosition = function(ev){

        let markW = smallBox.offsetWidth, 
            minL = 0,
            minT = 0,
            maxL = contentW - markW,
            maxT = contentW - markW;

        var leftPosition = ev.pageX - left - markW * 0.5,
            topPosition = ev.pageY - top - markW * 0.5;

        leftPosition = leftPosition < minL ? minL : (leftPosition > maxL ? maxL : leftPosition);
        topPosition = topPosition < minT ? minT : (topPosition > maxT ? maxT : topPosition);

        utils.CSS(smallBox, {
            left: leftPosition,
            top: topPosition
        })

        utils.CSS(bigImg, {
            left: -leftPosition * 4,
            top: -topPosition * 4
        });
    };

    // 计算小盒子移动的距离，然后大盒子里的图片根据比例计算出移动的距离进行移动
    // 小盒子 / content  =  大盒子 / 大图大小
    contentBox.onmouseenter = function (ev) {

        // 开始显示smallBox ,中心点在当前鼠标点击的位置
        utils.CSS(smallBox,'display','block');
        utils.CSS(bigBox,'display','block');
        computePosition(ev)
        
    };

    contentBox.onmousemove = function (ev) {
        // console.log('mousemove--',ev);
        computePosition(ev)
    };

    contentBox.onmouseleave = function (ev) {
        utils.CSS(smallBox, 'display', 'none');
        utils.CSS(bigBox, 'display', 'none');
    };

})();
