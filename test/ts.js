function say(person) {
    //console.log('hellow' + person)
}
say('liuyang');
var createBoolean = Boolean(1);
//console.log(typeof createBoolean)
var num = 10;
num = 4;
//console.log(typeof num)
//undefined & null 是所有类型的子集，可以赋值给任意类型的变量
var u = undefined;
num = u;
//console.log(num)
//空值变量只能赋值 null undefined
var v = undefined;
v = null;
//console.log(v === null)
//任意类型的值与普通类型不同的是可以改变值的类型
var any = 'seven';
any = 7;
any.myname;
//没有指明类型会自动推论类型
var noType = 'seven';
//等同于 let noType:string = 'seven'
//联合类型
var more;
more = 'seven';
more = 7;
//定义tom变量为Person类型，tom被约束为Person类的形状，属性不能多也不能少
var tom = {
    name: 'tom',
    age: 20
};
var myinterface = {
    name: null,
    add: undefined
};
var last = {
    id: 123456 //id是只读属性，不能修改值
};
//数组的类型
var arr = [1, 2, 3, 4];
//三种表示法
var arr2 = [1, 2, '3'];
var arr3 = [12, 3];
var arr4 = [1, 2, 3];
var arr5 = [1, [], 4];
//函数类型
//输入输出都要定义类型
function sum(x, y) {
    return (x + y).toString();
}
//函数表达式,相当于前置一个箭头函数
var sum2 = function (x, y) {
    return x + y;
};
var ownFuntion;
ownFuntion = function (x) {
    return x;
};
var highfunc = function (y, z) {
    if (z === void 0) { z = 1; }
    return z;
};
//类型断言
//在访问一个不确定类型的属性时可能会报错
/**
 * function a(x:number|string):number{
    if(x.length)  报错  x可能是string
    return 1
}
 *  */
function a(x) {
    if (x.length) {
        return 2;
    }
    else if (x > 1) {
        return 3;
    }
}
console.log(a(2));
