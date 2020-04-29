
JavaScript中特殊的对象
Function Object

[[call]] 视为函数Function
[[Construct]] 可以被new 操作符调用，根据new的规则返回对象。
Array Object

[[DefineOwnProperty]]

Property == length

设置对象的length属性，根据length的变化对对象进行操作

newLength > length 用空扩充数组

newLength < length 截取数组

String Object

string的length是不可写不可配的。

Arguments Object

[[callee]] 视为函数参数对对象，伪数组 caller

Object

[[Get]] property被访问时调用 get

[[Set]] property被赋值时调用 set

[[GetPrototypeOf]] 对应getPrototypeOf方法 获取对象原型

[[SetPrototypeOf]] 对应setPrototypeOf方法 设置对象原型

[[GetOwnProperty]] getOwnPropertyDescriptor 获取对象私有属性的描述列表

[[HasProperty]] hasOwnProperty 私有属性判断

[[IsExtensible]] isExtensible对象是否可扩展

[[PreventExtensions]] preventExtension控制对象是否可以添加属性

[[DefineOwnProperty]] defineProperty 定义对象属性

[[Delete]] delete 操作符

[[OwnPropertyKeys]] Object.keys() Object.entries() Object.values()

[[Call]] 能够调用call

Module Namespece

[[Module]] 视为一个引入的模块

[[Exports]] 视为一个导出的模块



如何判断正0还是负0

function checkZero(zero) {
    if (1 % zero === Infinity) {
     return 1
   } 

  if ( 1 % zero === Infinity) {
    return 2
  }
}

function sign(num) {
        // 在判断之前需要判断 正0还是 -0 还有Infinity
        return num / Math.abs(num)
}


demo  把一个浮点数转换成比特位

做浮点数尽量减少运算,避免精度丢失
demo地址:https://jsfiddle.net/pLh8qeor/19/



Expression
Grammar --- 语法部分
Grammar Tree vs Priority
Left hand side & Right hand side
Runtime --- 运行时部分
Type Convertion
Reference
所谓的表达式优先级，表达式生成树的方式来实现的

程序员的角度来看
运算符优先级
语言的实现和定义来看
树的结构



----- 判断函数是否是被new调用的 new.target，可以防止伪造对象。

----- super不是一个普通的变量但是他可以调用父类构造器，以及父类的静态属性

----foo`string` 自己处理字符串模版

----- new Foo() 和 new Foo的优先级不一样，例子


先执行的new cls2("2") 而不是优先执行 new cls


MemberExpression 他不一定里面都是Member运算，跟member同级的运算已经有一大坨了

MemberExporeesion返回的是Reference类型

Refeference类型
两部分组成
.Object 
.Key

可以对Reference类型写的操作
.delete
.assign -- 赋值

只有Member运算可以保持引用特性




Reference类型，o.x + 2和 1 + 2是完全等效的，但是 delete o.x 和 delete 1不是等效的，因为
o.x返回的是引用类型，加法的时候自动的把Reference 转掉了，自动的找到了它的值。

这是reference假象的形式
class Reference(object, property) {
     constructor(object, property) {
          this.object = object
          this.property = property
     }
}

比new运算符更低的是Call表达式
.Call
.foo()
.super()
.foo()['b']
.foo().b
.foo()`abc` 返回一个函数来处理字符串模版

new foo()["b"], 后面的member表达式优先级又改变了,先new在取出来这个b,而不是先取出来这个b在去new的

这就是为什么call要产生一个新的优先级



Member New 和Call 这三层都是在处理 new的运算符的正确性，让new符合人们的预期

只要有Call(函数调用)参与的 Member Expression它的优先级就降到了比new更低
---------------------------------------------------------------------------------------------------

Member New Call 的Expression称为Left Handside Expression 再加上其它的称为 Right Handside Expression,
Left Handside 指等号左边，运行时必须是Reference类型，语法上必须是Left Handside
Right Handside .  指等号右边

以下这些都是符合语法的
foo() = 1
foo()["a"] = 1
new foo = 2


----------------------------------------------------------------------------------------------------------
Right Handside(右手值表达式)

其实是bc自增

bc自增的原因是

no LineTerminator here, a++不能有换行，有换行这个语法就不成立了

------------------------------------------------------------------------------------------------------------
单目运算符

java里void表示一个不返回任何值的函数，js里void是一个运算符，表示后面不管什么都变成undefined

生成undefined最稳妥的情况 void 0;


IFE(立即执行函数)
(function(){})()
建议大家用void实现IIFE
void function(){}()
原因
(function(){})()
(function(){})()
(function(){})()如果忘写分号连接在一起，容易形成BUG，相当于连接在一起执行


特殊的typeof
typeof null 结果"object"
typeof function(){} 结果 "function"

js判断类型没有特别完美的
Object.prototype.toString.call() 是没有办法区分包装类型和原始类型
typeof  运行时和定义不太一致的问题，同一个对象里面不同的class(可以理解为不同的class 没法区分)

! 运算符 有个小技巧 可以做类型抓换，两个非 !! 1, booelan预算只有!有这个效果，||和&&没有这个效果


特殊性: ** 唯一一个右结合的运算符


==，=== 等号的优先级是 小于 。 < > <= >= instanceof in 的
in这个运算符很特殊，很多地方不能用比如for(in)循环里 就不能使用in运算符


上面漏了一个逗号表达式，优先级最低的是 逗号(,)表达式
MDN中的定义
逗号操作符
逗号操作符（,）对两个操作数进行求值并返回最终操作数的值。它常常用在 for 循环中，在每次循环时对多个变量进行更新。

&& || ? :  这三个表达式都是短路的， && 和||有时候可以当 if .  else 使用 ，




javascript里面有几种加法?
1. Number类型的加法
2.String类型的加法
javascript里面有几种乘法?
1.只有数字能能乘法

大部分运算符可以接受所有的类型这就涉及到 类型转换，例如加法要不然两边都是字符串，要不然两边都是数字
例如
Member类型
a.b -- a必须是对象 ,b必须是string或者Symbol
foo`string` --foo必须转换成函数
a++ .   
a--  自增自减必须都是
！按位取反不光是number,     必须点是整数型
移位运算符，不光number还点是整数型number  (为什么涉及到位元算必须点是整数型？)
in 后面点是对象


Type Convertion

Undefined 转换成NAN 是 上图表中的是错误的

-线代表转换成他自己，不需要转换，比较复杂的部分是Number 转 String的部分

会发现 String 转 Boolean 和 Boolean 转String是不对等的

Number String Boolean Symbol 都可以拆装箱，转换成Object, Object转换成 Number

-------------------------------------------------------------------------------------------------------------
JavaScritp中类和类型完全是两种东西，每种基本类型都对应一个不同的类

基本类型 和 类是两个完全不同的东西，上图通过string举例

装箱操作
String,Number,Bollean做为普通函数调用不使用new调用的时候，是转换成普通类型。
推荐不使用普通类型转换，使用手工转换
还有一种强制装箱的手段
Object("1") 直接调用Object("123"), 或者 new Object("1")

new Symbol("1") 是不允许 new 的，如何装箱
Object(Symbol("1"))
(function(){return this}).apply(Symbol("x")); // 也可以通过这个来转换

只有四种类型可以装箱，Object(undefined), Object(null) 是不可以的


拆箱操作
对象类型会默认拆箱优先级调用这几个函数

Symbol.toPrimitivel
valueOf
toString



toPrimitive相当于钩子函数 会去调用 valueOf 和 toString() 
valueOf 返回的值不适用于运行时的类型会toPrimitive会去调用toString
toString toString再不行才会报错

new Date().toJSON() ---------- 这个到底是什么意思没搞懂。。。
hint Number 转换为Number......


作业：小练习
这个需要自己先练习
StringToNumber
NumberToString


--------------------------------------------------------------------------------------------------------------------

Set结构存在的意义，hash结构

tc39/test262 验证所写的正则表达式


Statement ---- 语句
Grammar --- 语法 
.简单语句
.组合语句
.声明

Runtime --- 运行时(新增了两个运行时内部类型)
.Completion Record --- 重点介绍 ---早期的版本叫Completion, 什么完成了啊。。语句完成的结果
.Lexical Environment

Completion Record
    [[type]]: normal 语句完成的类型(执行完以后是个正常), break, continue, return, of throw---来源于                                    对应的四个语句
      [[value]]: Types --- 类型部分，7种基本类型，他可能是空，没有涉及到值
      [[target]]: label

简单语句
.ExpressionStatement 表达式语句一个表达式就是一个语句，相当于告诉计算机做一次运算
.EmptyStatement 空语句 最简单的一个 分号(;)
.DebufferStatement   debugger 也是一句话，给调试器用的，实际运行不会产生任何效果
.ThrowStatement
.ContinueStatement
.BreakStatement
.ReturnStatement
对应例子:
a = 1+2 从产生式的角度来讲，要有分号就一个有分号，从javascript语法规定来讲可以不加分号
;
debugger;
throw a;
continue label1;
break label2;
return 1 + 2;

复合语句
BlockStatement
IfStatement
SwitchStatement
IterationStatement
WithStatement
LabelledStatement
TryStatement


BlockStatement 地位很重要，当我们需要一条语句的地方，把它变成多条语句

一个语句是用大括号开头的，他一定是BlockStatement,不是对象

还未let const提供作用域

BlockStatement


在BlockStatement里面，BlockStatement里面一旦产生非normal的结构，就禁止直行了。



例如continue，return，throw这些可以改变我们代码基础的逻辑

简单：语句顺序执行
复杂：一旦碰到非normal的结果，他就产生代码结构化的这样的一个特点。

其实控制语句执行不执行，执行的次序完全由type来决定的。

Block执行的过程就是一条一条执行Statement的过程

Iteration(是一个表达式 加一个 Expression)

.while()
.do  while() 
.for(;;)
.for( in )
.for( of )
for await(of)以后讲

.var
.const/let
.in

Iteration 和 BlockStatement相似之处，碰到 throw和 return整个while语句就会变成return throw，但是碰到 break和continue则会继续消费，如果有label会根据label来消费(我对消费的理解就是产生作用，这个语句和这个表达式产生作用)

Completion Recode [[target]]: label 就是为break,continue准备的，其它的也没有地方用

for (这里可以声明变量 let =1,const = 1 都可以;;) {console.info(i)};当为let const的时候相当于
{
    let i = 1;
    {
        console.info(i);
    }
}相当于一个嵌套的声明

for in 获取对象的每一个key值

for of .  循环遍历数组(for of最安全的一个用法)，任何一个具有迭代特点对象他都可以使用 。 for of 背后对应的机制是Iterator
for of => Iterator => Generator/Array，小小的副作用，看着很简单，其实很复杂


只有在Switch,Itration中才能去消费break label continue label

魔法代码
function test() {
    public:
        this.a = 3
        this.b = 4;
      private:
         var a = 3;
         var b = 4;
}
其实代码是：
function test() {
    public:this.a = 3
    this.b = 4;
     private:var a = 3;
     var b = 4;
}
这里面的label没有任何作用
不要干模仿形状语法的这件事，我们要去模仿内在能力

-----------------------------------------------------------------------------------------------------

try， catch这个地方必须要有花括号的，不能省略花括号, 不是Block但是会产生作用域，
产生throw效果的1.运行时错误，2.function里有throw行为

作用域：一个声明，有效的文本范围是什么

throw是唯一一个从函数里面蔓延到函数外面的 Completion Type


catch的作用域和for的作用域还是有区别的

作用域和上下文的区别是什么？
作用域：源代码文本里边的这个范围，在代码的范围里（变量能作用的文本范围）
上下文是指 在用户的电脑上，内存里面存变量的那个地方（在用户的电脑上执行的时候所需的Js对象）

声明
FunctionDeclaration
function test () {

}

// 函数表达式可以没有名字
var test = function () {

}

一个是函数声明，一个是函数表达式，class也是类似的道理

GeneratorDeclaration   (可以理解为返回多个值的函数)
function* next(){
     yield 1
     yield 2
      yield 3
}

generic 和 await没有任何关系，只是刚好它的结构可以帮助异步编程
AsyncFunctionDeclaration
  function sleep(time) {
      return new Promise(function(resolve){
           setTimeout(resolve, time); 
      })
  }
 async function testAsyncFunction() {
      let i = 0;
      while(true) {
          console.log(i);
          await sleep(1000);
      }
}
testAsyncFunction();
AsyncGeneratorDeclaration
//使用上面的sleep函数
 async function* testAsyncGeneratorFunction() {
      let i = 0;
      while(true) {
          yield i++;
          await sleep(1000);
      }
}
async function executeAsyncGeneratorFunction() {
        let g = testAsyncGeneratorFunction();
        console.log(await g.next());
        console.log(await g.next());
        console.log(await g.next());
        console.log(await g.next());
}

async function executeAsyncGeneratorFunction() {
        let g = testAsyncGeneratorFunction();
        for await(let e of g) {
             console.info(e)   
        }
}
VariableStatement
神奇的地方在于只要出现在function中的任何一个地方，它的效果都是相通的，例子
var x = 0;
function foo() {
       var o = {x: 1};
        x = 2;
        with(o){
               var x = 3
         } 
         console.log(x)
}
console.log(x)
结果2, 0
var x = 0;
function foo() {
       var o = {x: 1};
        x = 2;
        with(o){
               x = 3
         } 
         console.log(x)
}
console.log(x)
结果2, 2

这块是很明显的一个javascript作用域设计的错误

 如果有var，不建议写在任何的语句子结构里面，一定要写在function范围内
和var 声明类似的是 function声明，例子

都会有变量提升，但是function要比var 强点最少内容生效了

ClassDeclaration
class let const 行为类似，都不允许重复声明，必须先声明后使用
LexicalDeclaration


预处理变量

正式执行的的时候声明又给去掉了，执行和预处理是两遍不同的独立的过程
---------------------------------------------------------------------------------------------------
Object 即是类型，也有一些结构化编程的知识
Object可以理解为世间万物

对象本身不是一种数据存储的工具，讲对象这个概念不是数据存储的工具，讲结构体是数据存储的工具







1.所有对象有一个唯一性
2.对象是有状态的，对象它不是不变的。
3.对象的状态改变即是行为


C++里面状态--成员变量  行为-成员函数，唯一标志性 对象指针

封装其实是编程上面的一种基本要求

封装，解偶，复用，架构上的概念，描述代码架构的合理性，
封装的好，不容易见到里面细节，就不容易犯错。
解偶：不同模块之间的关联性比较弱，这叫解偶。
内聚：
复用性： 力度又合适，抽象又合理，总能用上了

继承 是面向对象的一个子系统，class base origention

多态性： 其实是描述一个系统动态性的程度

最后的结论是对是错没那么重要，而是这个东西怎么影响自己的思想，影响自己在工作中的行为
目前最成功的流派 class-base-object


归类继承容易产生,  例子一盆豆 分出来蚕豆还有绿豆，产生的问题多重继承，有些东西既属于这个类也属与这个类，代表语言C++,菱形继承（一个类的两个父类，继承了同一个基类）

分类，要么属于这个类，要么属于那个类，不可能同时属于两个类，采用分类语言的肯定最后有一个最终的基类，难点，两个分支的类型抽象到一起去，又有了interface接口机制，分类复用的问题，才会出现mixin的问题

分类归类，都有自己的优势和缺点

对象的本质   属性和行为

-----------------------------------------------------------------------------------------------------JavaScript对象

class 并不是面向对象的唯一途径


例如 描述羊，我们找一只羊非常典型的羊描述清楚，其它的羊我们在这只羊的基础上 高点，胖点，瘦点。

(ni ge long..拼音)。。虚无。用代码表示就是null，Object.protoype的原型就是null

javascript最开始是 函数式和原型，后来被强灌了java



例子：
"狗咬人" 这个行为该如何使用对象抽象


"狗咬的行为绝不是面向对象里的行为，它没有改变状态，狗急了才是面向对象的行为（状态发生改变）"

我们状态的改变即是行为


对象所有的行为都必须是改变自身状态的行为，跟我们平常所说的行为是不一样的。

程序员误解，所谓的面向对象，尽量用贴近生活的语言去命名，尽量用贴近生活的语言去描述其实不是这样，
程序员先进行有效抽象，在用我们认为正确的抽象的语言来描述

千万不要按照产品经理的文档来命名对象

看一个Class好不好，一个Prototype好不好，对着每一个方法去看一遍命名就知道好不好了，看他们每一个行为是否改变了状态

学习面向对象，学习的是 。 在设计对象的状态和行为时，我们总是遵循"行为改变状态"的原则

------------------------------------------------------------------------------------------------

JS对象里面一堆 属性和  一个原型




属性就是kv对

key值 Symbol String
属性两类，数据型属性，访问器型属性


javascript在运行时 没有方法的概念，都是属性









writable 是否可写
enumerable 是否可枚举
configurable 属性是否可设置。。如果configurable设置为false,则其它的enmuerable writeable这些设置类的属性都不能改变

access建议还是保守用 o.a的时候不会认为里面还隐藏着很多复杂的逻辑
1.只用在基础库中
2.尽量能不用就不用



.一个key值没有，会延这原型链网上查找

Object API/Grammar

{}. [] Object.defineProperty--基本的对象能力，不带任何object base和prototype base
Object.create / Object.setPrototypeOf / Object.getPrototypeOf(ES5 加入的，纯粹的原型API))--适合用原型的思想来抽象，来解决问题。
new / class / extends 。 在原型层面模拟基于类的面向对象的方法（主要使用这一组范式）
（建议使用前三套）
new / function / prototype 运行时向原型，语法上向java，实际上不知道是什么的一套东西

-------------------------------------------------------------------------------------------------------------------------
说一下javascript中特殊的对象



call是一个行为，这个行为并不是用property描述的，带了call就是function,带了constructor就是构造器

原生对象定义出来的东西，即是function又是构造器，这俩者没有什么本质上的关系

javascript中new和不new是两种行为

凡是用于new的我们全用class

host对象，宿主对象



特殊对象

作业：总结出JS里所有的特殊的Special Object







 
  .
特殊对象 在ECMASCript 9.4


[[]]代表他不是一个正常的属性，javascript里面所有的slot和Intnal Methods


StringLiteral






































Number String Symbol Boolean

Number String Boolean 不带new起到自动转换的作用

强制转换Object

Symbol new不了

可以通过Object(Symboy("1"))装箱

Symbol只支持对象类型的参数，其它的都会转掉

Symbol.toPrimitive()
valueOf()
toString()
