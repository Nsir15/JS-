// 1
console.log(a);
var a = 12;
function fn(){
    console.log(a);
    var a = 13;
}
fn();
console.log(a);





// 2
console.log(a);
var a = 12;
function fn(){
    console.log(a);
    a = 13;
}
fn();
console.log(a);




//3
console.log(a);
a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);

//4
var foo = 1;
function bar(){
    if (!foo){
        var foo = 10;
    }
    console.log(foo);
}
bar();

//5
var n = 0;
function a (){
    var n = 10;
    function b(){
        n++;
        console.log(n);
    }
    b();
    return b;
}
var c = a();
c();
console.log(n);

//6
var a = 10,b = 11,c = 12;
function test(a){
  a = 1;
  var b = 2;
  c = 3;
}
test(10);
console.log(a);
console.log(b);
console.log(c);

//7
if (!('a' in window)){
    var a = 1;
}
console.log(a);

//8
// 在JS非严格模式下，函数中的形参和arguments存在映射关系，（映射：相互之间影响）
var a = 4;
function b(x,y,a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1,2,3);
console.log(a);

//9
var foo = 'hello';
(function () {
    console.log(foo);
    var foo = foo || 'world';
    console.log(foo);
})(foo);
console.log(foo);

// 10
var a = 9;
function fn(){
    a = 0;
    return function(b){
        return b + a++;
    }
}
var f = fn();
console.log(f(5));
console.log(fn()(5));
console.log(f(5));
console.log(a);






/******               **** */

// 1.
var ary = [1, 2, 3, 4];
function fn(ary) {
    ary[0] = 0;
    ary = [0];
    ary[0] = 100;
    return ary;
}
var res = fn(ary);
console.log(ary);
console.log(res);


// 2,
function fn(i) {
    return function (n) {
        console.log(n + (i++));
    }
}
var f = fn(10);
f(20);
fn(20)(40);
fn(30)(50);
f(30);

// 3.
var i = 10;
function fn(){
    return function (n){
        console.log(n + ++i);     
    }
}
var f = fn();
f(20);
fn()(20);
fn()(30);
f(30);

// 4.

var num =10;
var obj = {num:20};
obj.fn = (function(num){

    this.num = num * 3;
    num ++;
    return function (n){
        this.num += n;
        num ++;
        console.log(num);
    }
})(obj.num)

var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num,obj.num);


// 5。

function Fn(){
    this.x = 100;
    this.y = 200;
    this.getX = function (){
        console.log(this.x);
    }
}

Fn.prototype.getX = function (){
    console.log(this.x);
}

Fn.prototype.getY = function (){
    console.log(this.y);
}

var f1 = new Fn;
var f2 = new Fn;
console.log(f1.getX === f2.getX);   // false
console.log(f1.getY === f2.getY);   // true
console.log(f1.__proto__.getY === Fn.prototype.getY);  //ture
console.log(f1.__proto__.getX === f2.getX);  // fasle
console.log(f1.getX === Fn.prototype.getX);  // false
console.log(f1.constructor);  // Fn
console.log(Fn.prototype.__proto__.constructor); //Object
f1.getX(); // 100
f1.__proto__.getX(); // 100
f2.getY(); // 200
Fn.prototype.getY(); //200


// 三、






