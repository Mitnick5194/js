js�е�this���������еĸı���ı� ���ܵ�һʱ��ȷ�� Ҫ�ȵ����е��˲���ȷ��
�����ľֲ������ں���������ʱ����Ѿ�ȷ���˺����򣨻���˵ȷ���˵�������ģ����������еı仯���仯
����call��apply���Դ��뺯������������ ������ͨ��bind()����
var color = "blue;
var o = {color: red}
function sayColor(){
	alert(this.color);
}
sayColor();//blue
sayColor.call(o);//red
sayColor.apply(o);//red
sayColor.bind(o);//ֻ�ǰ� ���������
sayColor();//red ��Ϊ����һ�а���sayColor��������

�Ա������е����ֵ��
var arr = [1,22,31,234,0,344,-1,6]
var max = Math.max.apply(Math , arr);
��ֵ��ʽ�Ƚ����ֵ��
var max = Math.max(12,43,1234,421,-2,5);
Math.max.apply�������еķǳ����� ��Ϊapply�ڶ���������һ������ ��ʾ���������Ĳ���������Math.max.apply(Math,arr)
�͵ȼ���Math.max(1,22,31.......);

Math.random() [0-1)
min-max�����
Math.floor(Math.random()*����ֵ������+��һ�����ܵ�ֵ)
1-10:
Math.floor(Math.random()*9+1);//��ΪMath.floor(Math.random()*9)ʼ�շ���0-8����+1����1-9
2-9
Math.floor(Math.random()*8+2);
��дһ��������
function selectFrom(lowerValue , upperValue){
	var choose = upperValue - lowerValue + 1;
	return Math.floor(Math.random()*choose+lowerValue);
}

���ԭ���Ƿ�ָ��ĳ������ʵ����
var person1 = new Person();
var person2 = new Person();
Person.prototype.isPrototypeOf(person1);//true
Person.prototype.isPrototypOf(person2);//true
��Щ�����֧��getPrototypeOf();���ض����ԭ��
person1.getPrototypeOf();//Person.prototype;
hasOweProperty��������Ƿ���ڶ���ʵ��
Person.prototype.name = "ajie"
alert(person1.name); //ajie
alert(person1.hasOweProperty("name")) //false
person1.name = "mitnick"
alert(person1.name);//mitnick
alert(person1.hasOweProperty("name")) //true;
in ���Լ�������Ƿ���ڶ����ԭ����
Person.prototype.name = "ajie"
"name" in person1 //true
person.height = 170;
"height" in person1 //true
������ԭ�Ͷ�����ʵ���У���ʵ��û����дԭ�͵����ԣ�
function hasPrototypeProperty(object , property){
	return (property in object) && !(object.hasOweProperty);
}
var person = new Person();
Person.prototype.weight = "65kg"
hasPrototypeProperty(person , weight); //true
person.weight = "67kg";
hasPrototypeProperty(person , weight);//false ����д�� hasOweProperty�᷵��trueȡ����Ϊfalse

function Person(){}
var person1 = new Person();
Person.prototype = {
	constructor: Person,
	name : 'ajie',
	sayName: function(){
		alert(this.name);
	}
}
person1.sayName();//���� ��Ϊ������д������ԭ�� ��ôperson1._proto_��Ȼָ��͵�ԭ�� �����޷��ҵ���ԭ�͵�sayName();��ʹ����ָ��Person
������������ʵ���� �Ϳ��Է���
var person2 = new Person();
person2.sayName();//normal
ͼʾ��
![image](https://github.com/Mitnick5194/js/blob/master/gaocheng3/images/overPrototype.png)
ԭ�͵����ȱ���ǹ������� ����������������͵� ��ôһ���ı� ȫ���ı䣺
function Person(){}
Person.prototype = {
	name: 'ajie',
	friends:['Mitnick','Kobe']	//�Ṳ���������͵�����
}
var person1 = new Person();
person1.name= 'Curry';//������ı�ԭ�͵���ô
alert("person1��name:"+person1.name); //Curry
person1.friends.push("Durent");
var person2 = new Person();
alert("person2��name:"+person2.name);//ajie
alert(person2.friends.length);//3
alert("ԭ�͵�name��"+Person.prototype.name) //ajie

���������õñȽ϶���Ƕ�̬ԭ�ͼӹ���
//��̬ԭ�ͼӹ��� 
function Person(name , friends){
	this.name = name;
	this.friends = friends;
	//ֻ�е�һ�ι���ʱ�Ż����sayName���� �Ժ�Ķ�����
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
//ע�� ʹ�ö�̬ԭ�� ����ʹ����������дԭ�� �����Ͽ�_proto_��

//�������캯��ģʽ ����֪����һ�����캯���ַ���ֵ�� ��ô������캯����this��ָ���˷���ֵ
//һ������� ���ǲ�Ҫȥ�޸�jsԭ���Ķ�����Array String)�������ǿ���ʹ�ø�ģʽ
function SpecialArray(){
	var arr = new Array();
	arr.push.apply(arr,arguments);//�����캯����������ֵpush������ ��������һ��
	//�����Զ��巽��
	//ע�� ����Ҫ��arr ��Ϊ�ڵ��øù��캯��ʱ ���ǵ�thisָ��ֻ�ܲٿ�arr��Ϊ��󷵻ص�����
	arr.toPipeString = function(){
		return this.join("|");
	}
	return arr;
}

var sa = new SpecialArray("a","b","c");
alert(sa.toPipeString());

//�������ʽ
����������ʹ�����Զ����� ���ں�������ǰ����Ե��ú��� ���������������ԣ���ûʲô��˵�ģ�
����������Σ�գ�
if(condition){
	function sayHi(){
		alert("true");
	}
}else{
	function sayHi(){
		alert("false");
	}	
}
ʵ���� ����ECMAScript�����ڴ����﷨ ����js����᳢���޸� ����������� ��ͬ����������޸���ʽ��һ�� �����������᷵�صڶ�������
������condition��true||false��alert(false);��Firefox����conditionΪtrueʱ���ص�һ������ falseʱ���صڶ������� ����˵����������Σ�� ������ʹ��
�������������ȷ��
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

�հ�����Ȩ������һ��������������ı����ĺ���
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
������������������
ȫ���������� �������е�ȫ�ֱ���
com�������� ����comp���������ұ�����ȫ�ֱ���
compare������comp����������������صĺ������������� compare����������б��� comp������ı�����ȫ�����������
ͼʾ��
![image](https://github.com/Mitnick5194/js/blob/master/gaocheng3/images/zuoyongyuchain.png)
��createComparitionFunction����ִ����ɺ� createComparitionFunction ������ı������������ͷ� ��Ϊcompare�����ڵ���ʱ������
createComparitionFunction�������� ���Ահ���ռ�ø�����ڴ�
ע�� �����������ˣ�
�����������������ƻ�����һ��ֵ��ע��ĸ����ã����հ�ֻ��ȡ�ð����������κα��������һ��ֵ���ص� ���ֵ���ı��� ֻ��ȡ�����һ����
�����˱հ���������������������󣨶��� ����ֵ��,������ĳ������ı��������⣺
function createFunction(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = function(){
			return i;
		}
	}
	return result;
}
���濴 ÿ�����������Լ�������ֵ����λ��0�ĺ�������0 λ��1����1 �Դ����� ��ʵ���� ÿ��������10 ��Ϊÿ�����������������ж�������createFunction
�����Ļ����var i��ʵ������createFunctino�������������������ö���ͬһ������i ��createFunction���غ� ����i��Ϊ10������������˵ ���һ����
����ͨ������ﵽĿ�ģ�
function createFunction(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = (function(num){
			return num
		})(i);
	}
}
ͨ��һ�������Ե��ú��� ���Խ�createFunction������ı���iͨ����ֵ���ݴ������������������num���� �����շ��ص���num ����ÿ���������������Լ���
num�������� ������ʵ����������