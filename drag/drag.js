~(function(window){

    let box = document.querySelector('.box'),
        body =  document.body;

    let minX = 0,
        minY = 0,
        boxW = box.scrollWidth,
        boxH = box.scrollHeight,
        maxX = document.documentElement.clientWidth - boxW,
        maxY = document.documentElement.clientHeight - boxH,
        originLeft = utils.CSS(box,'left'),
        originTop = utils.CSS(box,'top');

    let sport = false;

    const moveStart = function moveStart(ev){
        changeBox(ev);
    };
    const moving = function moving(ev){
        changeBox(ev);
    };
    const moveEnd = function moveEnd(ev){
    };

    const changeBox = function changeBox(ev){
        if (!sport) {
            return;
        }
        let left = ev.pageX - originLeft - boxW * 0.5,
            top = ev.pageY - originTop - boxH * 0.5;
        left = left < minX ? minX :(left > maxX ? maxX : left);
        top = top < minY ? minY : (top > maxY ? maxY : top);
        
        utils.CSS(box, {
            left: left,
            top: top
        })

        console.log('pageX', ev.pageX, '\n');
        console.log('pageY', ev.pageY, '\n');
        console.log('box-left',originLeft ,'\n');
        console.log('box-top', originTop, '\n');
        console.log('boxW', boxW, '\n');
        console.log('boxH', boxH, '\n');
        console.log('left', left, '\n');
        console.log('top', top, '\n');
        


        
    };

    box.onmousedown = function(ev){
        sport = true;
        changeBox(ev);
    };
    
    box.onmousemove = function(ev){
        // console.log('box---',ev);
        
    }
    box.onmousemove = function (ev) {
        console.log('body---',ev);
        
        changeBox(ev);
    };

    body.onmouseup = function(ev){
        sport = false
    };

})(window)