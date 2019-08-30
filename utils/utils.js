let utils = (function(){

    let getCss = function getCss(element,attr){
        if ('getComputedStyle' in window) {
            let value = window.getComputedStyle(element,null)[attr];
            // 去掉单位  可能为负数，可能有小数
            let reg = /^(-?\d+(\.\d+)?(pt|px|rem))$/g;
            reg.test(value) ? value = parseFloat(value) : null;
            return value;
        }
        throw new SyntaxError('您当前浏览器版本过低，请升级最新版本使用,thanks');
    };

    let setCss = function setCss(element,attr,value){
        // 如果用户给的值没有单位，添加单位
        let reg = /^(width|height|((margin|padding)?(left|right|bottom|top)?))$/g;
        if (!isNaN(value)) {
            if (reg.test(attr)) {
                value += 'px';
            }
        }
        element['style'][attr] = value;
    };

    let setGroupCss = function setGroupCss(element,options){
        for (const attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(element,attr,options[attr]);
            }
        }
    };

    let CSS = function CSS(...arg){
        let length = arg.length,
            fn = getCss;
        if (length === 3) {
            fn = setCss;
        }else
        {
            if (typeof arg[1] === 'object' && arg[1] !== 'window') {
                fn = setGroupCss;
            }
        }
       return  fn(...arg);
    };

    return {
        CSS  //es6中key和value一样，可以直接这样写
    };

})();


 // 动画

//  动画公式
/**
 * 
 * @param {*} curTime 当前运动时间
 * @param {*} duration 动画总共时间
 * @param {*} distance 动画移动距离
 * @param {*} start 初始位置
 */
 let express = (function(){
     return {
         linearExpression: (curTime, duration, distance, start) => curTime / duration * distance + start
     };
 })();
 window.nx_animated = function (element,target,duration = 1000) {
    clearInterval(element.animatedTimer);
    let distance = {},
        start = {},
        moves = {},
        time = 0;

    // 根据target计算出 distance，
    for (const attr in target) {
        if (target.hasOwnProperty(attr)) {
            start[attr] = utils.CSS(element,attr);
            distance[attr] = target[attr] - start[attr];
        }
    }

    element.animatedTimer = setInterval(()=>{
        time += 17;
        if (time >= duration) {
            utils.CSS(element,target);
            clearInterval(element.animatedTimer);
            return;
        }

        for (const attr in distance) {
            if (distance.hasOwnProperty(attr)) {
                moves[attr] =  express.linearExpression(time,duration,distance[attr],start[attr]);
            }
        }

        utils.CSS(element,moves);

    },17);
 };