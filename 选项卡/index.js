let box = document.getElementById('box'),
    liList = box.getElementsByTagName('li'),
    divList = box.getElementsByTagName('div');

//绑定点击事件

// for (var i = 0;i<liList.length;i++){
//     var li = liList[i];
//     li.onclick = function(){
//         console.log(i); // 这样每次打印都是 3
//     }
// }

//使用闭包
// for (var i = 0;i<liList.length;i++){
//     var li = liList[i];
//     li.onclick = (function(n){
//         return function(){
//             changeTab(n);
//         }
//     })(i)
// }

// 添加自定义属性
// for (let i = 0; i < liList.length; i++) {
//     let li = liList[i];
//     li.nxIndex = i;
//     li.onclick = function(){
//         changeTab(this.nxIndex)
//     }
// }

//使用let
for (let i = 0; i < liList.length; i++) {
    liList[i].onclick = function(){
        changeTab(i)
    }
}

const changeTab = function(index){
    for (let i = 0; i <liList.length; i++) {
        // liList[i].className = divList[i].className = '';
        liList[i].classList.remove('active');
        divList[i].classList.remove('active');
    }
    liList[index].classList.add('active');
    divList[index].classList.add('active');
    console.log(index);
}