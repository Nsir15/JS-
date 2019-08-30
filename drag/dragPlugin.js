~(function(window){

    class DragPlugin{

        constructor(curEle,containerEle){
            this.curEle = curEle;
            this.containerEle = containerEle;
            this.START = this.moveStart.bind(this)
            this.curEle.addEventListener('mousedown',this.START);
            this.minL = 0;
            this.maxL = containerEle.clientWidth - curEle.offsetWidth;
            this.minT = 0;
            this.maxT = containerEle.clientHeight - curEle.offsetHeight;
            this.containerL = this.containerEle.offsetLeft;
            this.containerT = this.containerEle.offsetTop;
            
        };

        moveStart(ev){
            
            // 鼠标移动过快会导致跟随丢失，所以添加到父控件上
            this.MOVE = this.moving.bind(this);
            this.UP = this.moveEnd.bind(this);
            this.containerEle.addEventListener('mousemove',this.MOVE); 
            this.containerEle.addEventListener('mouseup',this.UP);
            this.compute(ev);
        };
        moving(ev){
            this.compute(ev);
        };
        moveEnd(ev){
            this.containerEle.removeEventListener('mousemove',this.MOVE);
            this.containerEle.removeEventListener('mouseup',this.UP);
        };
        compute(ev){            
            let curL = ev.pageX - this.containerL - this.curEle.offsetWidth * 0.5,
                curT = ev.pageY - this.containerT - this.curEle.offsetHeight * 0.5;
            curL = curL < this.minL ? this.minL : (curL > this.maxL ? this.maxL : curL);
            curT = curT < this.minT ? this.minT : (curT > this.maxT ? this.maxT : curT);
            this.curEle.style.left = curL + 'px';
            this.curEle.style.top = curT + 'px';
        };
    };
    window.DragPlugin = DragPlugin;
})(window);