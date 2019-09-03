~(function(window){
    class Drag{
        constructor(curElement){
            this.curElement = curElement;
            this.DOWN = this.down.bind(this);
            curElement.addEventListener('mousedown',this.DOWN)
        };

        down(ev) {
            // 记录开始位置
            this.startX = ev.clientX;
            this.startY = ev.clientY;
            this.lastX = ev.clientX;
            this.lastY = ev.clientY;
            this.curL = this.curElement.offsetLeft;
            this.curT = this.curElement.offsetTop;
            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);
            this.curElement.addEventListener('mousemove',this.MOVE);
            this.curElement.addEventListener('mouseup',this.UP)
        };
        
        move(ev){
            // 计算位置
            let distanceX = ev.clientX - this.lastX,
                distanceY = ev.clientY - this.lastY;
            this.curElement.style.left = distanceX + this.curL;
            this.curElement.style.top = distanceY + this.curT;
        };

        up(ev){
            // 松开的时候开始动画
        };
    };

    // 原型上绑方法
   
    window.Drag = Drag;
})(window);