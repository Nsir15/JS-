let subscribe = new Subscribe;
let fn1 = function(){
    console.log(1);
        subscribe.remove(fn1)

};
let fn2 = function () {
    console.log(2);
};
let fn3 = function () {
    console.log(3);
    
};
let fn4 = function () {
    console.log(4);
};

subscribe.add(fn1);
subscribe.add(fn2);
subscribe.add(fn3);
subscribe.add(fn4);

// setTimeout(() => {
//     subscribe.fire();
// }, 1000);


setTimeout(() => {
    subscribe.fire();
}, 1000);

