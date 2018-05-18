js中的this会随着运行的改变而改变 不能第一时间确定 要等到运行到了才能确定
函数的局部变量在函数声明的时候就已经确定了函数域（或者说确定了调用哪里的）不会随运行的变化而变化
除了call和apply可以传入函数的作用域外 还可以通过bind()方法
var color = "blue;
var o = {color: red}
function sayColor(){
	alert(this.color);
}
sayColor();//blue
sayColor.call(o);//red
sayColor.apply(o);//red
sayColor.bind(o);//只是绑定 不会调起函数
sayColor();//red 因为上面一行绑定了sayColor的作用域

对比数组中的最大值：
var arr = [1,22,31,234,0,344,-1,6]
var max = Math.max.apply(Math , arr);
传值方式比较最大值：
var max = Math.max(12,43,1234,421,-2,5);
Math.max.apply方法运行的非常巧妙 因为apply第二个参数是一个数据 表示传进方法的参数，所以Math.max.apply(Math,arr)
就等价与Math.max(1,22,31.......);

Math.random() [0-1)
min-max随机数
Math.floor(Math.random()*可能值的总数+第一个可能的值)
1-10:
Math.floor(Math.random()*9+1);//因为Math.floor(Math.random()*9)始终返回0-8的数+1就是1-9
2-9
Math.floor(Math.random()*8+2);
编写一个函数：
function selectFrom(lowerValue , upperValue){
	var choose = upperValue - lowerValue + 1;
	return Math.floor(Math.random()*choose+lowerValue);
}

检查原型是否指向某个对象实例：
var person1 = new Person();
var person2 = new Person();
Person.prototype.isPrototypeOf(person1);//true
Person.prototype.isPrototypOf(person2);//true
有些浏览器支持getPrototypeOf();返回对象的原型
person1.getPrototypeOf();//Person.prototype;
hasOweProperty检查属性是否存在对象实例
Person.prototype.name = "ajie"
alert(person1.name); //ajie
alert(person1.hasOweProperty("name")) //false
person1.name = "mitnick"
alert(person1.name);//mitnick
alert(person1.hasOweProperty("name")) //true;
in 可以检测属性是否存在对象或原型中
Person.prototype.name = "ajie"
"name" in person1 //true
person.height = 170;
"height" in person1 //true
属性在原型而不再实例中（即实例没有重写原型的属性）
function hasPrototypeProperty(object , property){
	return (property in object) && !(object.hasOweProperty);
}
var person = new Person();
Person.prototype.weight = "65kg"
hasPrototypeProperty(person , weight); //true
person.weight = "67kg";
hasPrototypeProperty(person , weight);//false 被重写了 hasOweProperty会返回true取反后为false

function Person(){}
var person1 = new Person();
Person.prototype = {
	constructor: Person,
	name : 'ajie',
	sayName: function(){
		alert(this.name);
	}
}
person1.sayName();//报错 因为上面重写了整个原型 那么person1._proto_仍然指向就的原型 所以无法找到新原型的sayName();即使构造指回Person
但是在下面新实例化 就可以访问
var person2 = new Person();
person2.sayName();//normal

图示：

![image](https://github.com/Mitnick5194/js/blob/master/gaocheng3/images/overPrototype.png)
原型的最大缺点是共享数据 如果数据是引用类型的 那么一个改变 全部改变：
function Person(){}
Person.prototype = {
	name: 'ajie',
	friends:['Mitnick','Kobe']	//会共享引用类型的数据
}
var person1 = new Person();
person1.name= 'Curry';//并不会改变原型的那么
alert("person1的name:"+person1.name); //Curry
person1.friends.push("Durent");
var person2 = new Person();
alert("person2的name:"+person2.name);//ajie
alert(person2.friends.length);//3
alert("原型的name："+Person.prototype.name) //ajie

所以现在用得比较多的是动态原型加构造
//动态原型加构造 
function Person(name , friends){
	this.name = name;
	this.friends = friends;
	//只有第一次构造时才会加入sayName方法 以后的都不会
	if(typeof this.sayName !== 'function'){
		Person.prototype.sayName = function(){
			alert(this.name);
		}
	}	
}
var person1 = new Person("ajie" , ["Kobe" , "Durent"]);
var person2 = new Person("Mitnick" , ['JackMa' , 'Tom']);
alert("person1:"+ person1.name+" "+person1.friends[0]+" "+person1.friends[1]);
person1.sayName();
alert("person2:"+ person2.name+" "+person2.friends[0]+" "+person2.friends[1]);
person2.sayName();
//注意 使用动态原型 不能使用字面量重写原型 否则会断开_proto_链

//寄生构造函数模式 我们知道当一个构造函数又返回值是 那么这个构造函数的this就指向了返回值
//一般情况下 我们不要去修改js原生的对象（如Array String)所以我们可以使用该模式
function SpecialArray(){
	var arr = new Array();
	arr.push.apply(arr,arguments);//将构造函数传进来的值push进数组 就像数组一样
	//定义自定义方法
	//注意 这里要用arr 因为在调用该构造函数时 我们的this指针只能操控arr因为最后返回的是它
	arr.toPipeString = function(){
		return this.join("|");
	}
	return arr;
}

var sa = new SpecialArray("a","b","c");
alert(sa.toPipeString());

//函数表达式
函数声明会使函数自动提升 即在函数定义前面可以调用函数 而函数声明不可以（这没什么可说的）
下面做法很危险：
if(condition){
	function sayHi(){
		alert("true");
	}
}else{
	function sayHi(){
		alert("false");
	}	
}
实际上 这在ECMAScript中属于错误语法 不过js引擎会尝试修复 问题就在这里 不同的浏览器的修复方式不一样 大多数浏览器会返回第二个声明
即无论condition是true||false都alert(false);但Firefox会在condition为true时返回第一个声明 false时返回第二个声明 所以说这种做法很危险 不可以使用
下面的做法是正确的
var sayHi;
if(condition){
	sayHi = function sayHi(){
		alert("true");
	}
}else{
	sayHi = function sayHi(){
		alert("false");
	}	
}

闭包：有权访问另一个函数的作用域的变量的函数
function createComparitionFunction(propertyName){
	return function(object1 , object2){
		var value1 = obj1[property];
		var value2 = obj2[property]
		if(value1>value2) return -1;
		else if(value1 <value2) return 1;
		else return0;
	}
}
var compare = createComparitionFunction("name");
var result = compare({name:1},{name:2});
个函数的作用域链：
全局作用域链 包含所有的全局变量
com作用域链 包含comp函数的左右变量和全局变量
compare（就是comp下面的匿名函数返回的函数）作用域链 compare作用域的所有变量 comp作用域的变量和全局作用域变量
图示：

![image](https://github.com/Mitnick5194/js/blob/master/gaocheng3/images/zuoyongyuchain.png)
在createComparitionFunction函数执行完成后 createComparitionFunction 作用域的变量不会立即释放 因为compare函数在调用时包含了
createComparitionFunction的作用域 所以闭包会占用跟多的内存
注意 经典问题来了：
作用域链的上述机制会引出一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值（重点 如果值被改变了 只能取得最后一个）
别忘了闭包所保存的是整个变量对象（对象 不是值）,而不是某个特殊的变量，看题：
function createFunction(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = function(){
			return i;
		}
	}
	return result;
}
表面看 每个函数都有自己的索引值，即位置0的函数返回0 位置1返回1 以此类推 但实际上 每个都返回10 因为每个函数的作用域链中都保存在createFunction
函数的活动对象（var i其实是属于createFunctino的作用域）所以他们引用都是同一个变量i 当createFunction返回后 变量i都为10（正如上述所说 最后一个）
可以通过下面达到目的：
function createFunction(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = (function(num){
			return num
		})(i);
	}
}
通过一个匿名自调用函数 可以将createFunction作用域的变量i通过传值传递传给匿名函数作用域的num变量 而最终返回的是num 所以每个函数都有属于自己的
num变量副本 所以能实现最初的设计
