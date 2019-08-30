
    let box = document.querySelector('.box');
    let minX = 0,
        minY = 0,
        boxW = box.scrollWidth,
        boxH = box.scrollHeight,
        maxX = document.documentElement.clientWidth - boxW,
        maxY = document.documentElement.clientHeight - boxH,
        originLeft = utils.CSS(box, 'left'),
        originTop = utils.CSS(box, 'top');

    const moveStart = function(){

        document.addEventListener('mousemove',moving);
        document.addEventListener('mouseup', moveEnd);
    };

    const moving = function(ev){
        
        let left = ev.pageX - originLeft - boxW * 0.5,
            top = ev.pageY - originTop - boxH * 0.5;
        left = left < minX ? minX : (left > maxX ? maxX : left);
        top = top < minY ? minY : (top > maxY ? maxY : top);
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

