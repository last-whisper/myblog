function say(person:string){
    //console.log('hellow' + person)
}

say('liuyang')

let createBoolean: boolean = Boolean(1)

//console.log(typeof createBoolean)

let num:number = 10
num = 4

//console.log(typeof num)

//undefined & null 是所有类型的子集，可以赋值给任意类型的变量
let u:undefined = undefined
num = u 
//console.log(num)

//空值变量只能赋值 null undefined
let v:void = undefined
v = null

//console.log(v === null)

//任意类型的值与普通类型不同的是可以改变值的类型
let any:any = 'seven'
any = 7

any.myname
//没有指明类型会自动推论类型

let noType = 'seven'
//等同于 let noType:string = 'seven'

//联合类型
let more:string | number;
more = 'seven'
more = 7

//访问联合类型的属性方法
/*
function(x:string | number){
    return x.length
}
报错 因为 length属性不是 string类和number类的共有属性

function(x:string | number){
    return x.toString()
}
正常，因为toString是number | string 的共有属性

* */

//类和类型赋值时

/*
 * function(x:string | number){
     x = 'seven'
     console.log(x.length)
     x赋值后被推论成string,所以可以访问其length属性
 }
 *  */

 //对象类型--接口（有点像数据模型）

 //定义一个接口
 interface Person{
     name:string;
     age:number
 }
//定义tom变量为Person类型，tom被约束为Person类的形状，属性不能多也不能少
 let tom:Person = {
     name:'tom',
     age:20
 }

 interface Score{
     name:string;
     age?:number //age为可选属性
 }

 //任意属性
 /**
  * interface Any{
     name:string;
     age?:num; 
     [propName:string]:any; 任意属性的定义（定义了任意属性后，
     确定属性和可选属性必须是任意属性类型的子集 num不是string的子集
   ）
 }
  *  */

 interface Test{
    name:string;
    age?:number;
    [propName:string]:string | number
 } 

 let myinterface:Test = {
    name:null,
    add:undefined
 }


/**
 * 关于子集的重点
 * null 和 undefined 类型是任意类型的子集，所以任意类型都可以赋值null undefined
 * 所有类型都是any的子集，any类型可以赋值任意类型
 * 如果改变类，改变的类必须是定义的类的子集
 *  */


 //只读属性
 interface Last{
    readonly id:number
 } 

 let last:Last = {
     id:123456  //id是只读属性，不能修改值
 }


 //数组的类型
 let arr:number[] = [1,2,3,4]
 //三种表示法
 let arr2:(string|number)[] = [1,2,'3']
 let arr3:Array<number> = [12,3]
 interface Arr{
     [index:number]:number;
 }
let arr4:Arr=[1,2,3]
let arr5:any = [1,[],4]

//函数类型
//输入输出都要定义类型
function sum(x:number,y:number):string{
    return (x+y).toString()
}

//函数表达式,相当于前置一个箭头函数
let sum2:(x:number,y:number) => number = function(x:number,y:number){
    return x+y
}

//用接口定义函数形状
interface Myfunction{
    (x:number):number
}
let ownFuntion:Myfunction;
ownFuntion = function(x:number){
    return x
}

//默认值和可选参数
interface HighFunction{
    (y:number,z:number,w?:number):number
}
let highfunc:HighFunction = function(y:number,z:number=1){
    return z
} 

//类型断言
//在访问一个不确定类型的属性时可能会报错
/**
 * function a(x:number|string):number{
    if(x.length)  报错  x可能是string 
    return 1
}
 *  */

 function a(x:number|string):number{
     //断言类型只是让不报错 不返回布尔
     if((<string>x).length){
         return 2
     }else if((<number>x)>1){
        return 3
     }
 }

 //声明文件
 declare var jQuery:(selector:string)=>any
 /**
  * 引入第三方库，使用declare var const let 定义该变量的类型，让编译阶段不会出错
  * 声明文件以.d.ts结尾
  * 声明文件类型大概分为全局和模块导入两种
  * 大部分的第三方库有声明文件，使用 npm i @types/xxx --save-dev 统一管理第三方声明文件
  * 如果没有@types可以换一种类似的库或者自己书写声明文件 
  * 
  * 全局变量（使用script标签引入的全局变量）
  * declare var const let 
  * declare function 
  * declare class 声明全局类
  * declare enum 声明全局枚举类型
  */