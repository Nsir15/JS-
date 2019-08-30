
    let box = document.querySelector('.box');
    let minL = 0,
        minT = 0,
        boxW = box.scrollWidth,
        boxH = box.scrollHeight,
        maxL = document.documentElement.clientWidth - boxW,
        maxT = document.documentElement.clientHeight - boxH;
        // originLeft = utils.CSS(box, 'left'),
        // originTop = utils.CSS(box, 'top');

    const moveStart = function(){

        
        // 进来获取初始的left 和 top 

        // 此时的this  是 box
        // this.startL = utils.CSS(box,'left');
        // this.startT = utils.CSS(box,'top');
        // 使用全局变量形式
        originLeft = utils.CSS(box, 'left');
        originTop = utils.CSS(box,'top');
        
        //因为绑定的是document，所以moving的this 是document,要想继续使用startL,要么设置为全局变量，要么设置为this属性，这里绑定this,使this 仍然是box
        // 在bind原理那块得出结论：同一个方法绑定同一个this，返回的是一个匿名函数，所以绑定多次返回的结果是不一样的。
        document.addEventListener('mousemove',moving); 
        document.addEventListener('mouseup', moveEnd);
    };

    const moving = function(ev){

        // 盒子移动距离  鼠标当前client距离 - 盒子初始位置 - 盒子一般宽/高
        let left = ev.pageX - boxW * 0.5,
            top = ev.pageY -  boxH * 0.5;
        left = left < minL ? minL : (left > maxL ? maxL : left);
        top = top < minT ? minT : (top > maxT ? maxT : top);
        utils.CSS(box, {
            left: left,
            top: top
        })
    };

    const moveEnd = function(){
        document.removeEventListener('mousemove',moving);
        document.removeEventListener('mouseup', moveEnd);
        
    };

    box.onmousedown = moveStart;

