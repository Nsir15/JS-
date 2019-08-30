let animated = (function animated (){
   
    //=>准备操作CSS样式的方法 GET-CSS/SET-CSS/SET-GROUP-CSS/CSS
    let utils = (function(){
         let getCss = function getCss(element , attr){
            if('getComputedStyle' in window){
               let value =  window.getComputedStyle(element,null)[attr];

               // 去掉单位
               let reg = /^-?\d+(\.\d+)?(px|rem|pt)$/g;
               if(reg.test(value)){
                  value = parseFloat(value);
               }
               return value;
            }
            throw new SyntaxError('您当前浏览器版本过低，请升级最新版本，thanks');
         };

         let setCss = function(element,attr,value){
            // 没有单位，添加单位
            let reg = /(width|height|fontsize|((padding|border|margin)?(bottom|top|right|left)?))/g;
            if (!isNaN(value)) {
               if(reg.test(attr)){
                  value += 'px';
               }
            }
            element['style'][attr] = value 
         };

         /**
          * 
          * @param {object} element 元素
          * @param {object} options 设置的属性对象
          */
         let setGroupCss = function setGroupCss(element,options){
            for (const key in options) {
               if (options.hasOwnProperty(key)) {
                  setCss(element,key,options[key])
               }
            }
         };

         let CSS = function CSS (...arg){
            let length = arg.length,
                fn = getCss;
            //如果参数是两个  
            // if(length === 2){
            //    // 批量设置
            //    if(typeof arg[1] === 'object' && 'length' in arg[1] && arg[1] !== 'window'){
            //      setGroupCss(arg[0],arg[1]);
            //    } else  // 获取某个属性值
            //    {
            //       getCss(arg[0],arg[1]);
            //    }
            // } else  // 参数是三个，那就是直接设置
            // {
            //    setCss(arg[0],arg[1],arg[2]);
            // }
            if (length === 2) {
               if (typeof arg[1] === 'object' && arg[1] !== 'window') {
                  fn = setGroupCss;
               }
            }else
            {
               fn = setCss;
            }
            return fn(...arg);
         };

         return {
            CSS
         };
    })();

   //  动画公式
  
   let expression = {

      /**
      *
      * @param {} time 当前运动时间
      * @param {*} duration 动画总时间
      * @param {*} distance 总距离
      * @param {*} statr  起点位置
      */
      linear: (time,duration,distance,start) => time / duration * distance + start
   };

   window.nx_animated = function(element,target,duration = 1000){

      // 根据终点target 和 起点 计算 总距离 distance
      let start = {},
          distance = {},
          currentTime = 0; // 当前已经运动时间
      
      for (const attr in target) {
         if (target.hasOwnProperty(attr)) {
            start[attr] = utils.CSS(element,attr);
            distance[attr] = target[attr] - start[attr];            
         }
      }
      
      clearInterval(element.animatedTimer);
      element.animatedTimer = this.setInterval(()=>{
         currentTime += 17;
         if (currentTime >= duration) {
            utils.CSS(element, target);
            clearInterval(element.animatedTimer);
            return;
         }

         let options = {};
         for (const attr in target) {
            if (target.hasOwnProperty(attr)) {
               options[attr] = expression.linear(currentTime,duration,distance[attr],start[attr]);
               this.console.log(options);
            }
         }
         utils.CSS(element,options);
      },17);
   }

})()