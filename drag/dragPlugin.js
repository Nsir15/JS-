~(function(window){

    class DragPlugin{

        constructor(curEle,containerEle){
            this.curEle = curEle;
            this.curEle.addEventListener('onmousedown',this.moveStart);
            this.minL = 0;
            this.maxL = containerEle.clientWidth - curEle.offsetWidth;
            this.minT = 0;
            this.maxT = containerEle.clientHeight - curEle.offsetHeight;
            
        };

        moveStart(ev){
            console.log('moveStart');
            
            // 鼠标移动过快会导致跟随丢失，所以添加到父控件上
            this.containerEle.addEventListener('onmousemove',this.moving); 
            this.containerEle.addEventListener('onmouseup',this.moveEnd);
        };
        moving(ev){
            this.compute(ev);
        };
        moveEnd(ev){
            this.containerEle.removeEventListener('onmousemove',this.moving);
            this.containerEle.removeEventListener('onmouseup',this.moveEnd);
        };
        compute(ev){
            console.log('moving');
            
            let curL = ev.offsetLeft - this.curEle.offsetWidth * 0.5,
                curT = ev.offsetTop - this.curEle.offsetHeight * 0.5;
            curL = curL < this.minL ? this.minL : (curL > this.maxL ? this.maxL : curL);
            curT = curT < this.minT ? this.minT : (curT > this.maxT ? this.maxT : curT);
            this.curEle.style.left = curL + 'px';
            this.curEle.style.top = curT + 'px';
        };
    };
    window.DragPlugin = DragPlugin;
})(window);