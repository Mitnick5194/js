/**
  *
  *  常用工具类 纯工具类 不重写原型
  *
  *  @verson 1.0
  *  @author niezhenjie
  *  
  */

//注释模板 不用每次手打
/**
 *  
 *  @param
 *
 *  @return 
 */

/**
 *  从[lowerValue , upperValue]中获取一个随机整数（random取值范围 [0-1) ）
 *
 *  @return 
 */
 function  selectFrom(lowerValue , upperValue){
 	var choose  = upperValue -  lowerValue +1;
 	return Math.floor(Math.random() * choose + lowerValue);
 }

/**
 *  返回数组中的最大项
 *
 *  @param array 数组
 *
 *  @return  数组中的最大项
 */
 function getMaxFromArray(array){
 	return  Math.max.apply(Math , array);
 }

 /**
  *   忽略大小写对比两个字符串是否已相等
  *
  *  @param
  *
  *  @return 
  */
  function equalsIgnoreCase(str1 , str2){
  	return str1.toLowerCase() == str2.toLowerCase();
  }

 /**
  *   字符串缓冲区
  *
  *  @param
  *
  *  @return 
  */
  function StringBuffer(){
  	var arr = [];
  	this.append = function(data){
  		arr.push(data);
  	}
  	this.clear = function(){
  		arr = [];
  	}
  	this.toString = function(){
  		return arr.join("");
  	}
  }

 /**
  *  求n的值的递归结果（注意 在严格模式下arguments.callee会导致错误）
  *
  *  @param
  *
  *  @return 
  */
  function recursion(n){
  	if(1 >= n)
  		return 1;
	//arguments有一个callee属性 永远指向arguments所属的函数（对象）
	return n* arguments.callee(n-1);
}


/**
  *  比较str字符串的每个字符是否都一样
  *
  *  @param
  *
  *  @return 
  */
function isAllRepeat(str){
  for(var i=0,len=str.length;i<len-1;i++) {
    if(str.charAt(i) != str.charAt(i+1)) {
      return false;
    }
  }
  return true;
}

/**
  *  使用二分法比较str字符串的每个字符是否都一样
  *
  *  @param
  *
  *  @return 
  */
function isAllRepeatByBinary(str){
  var len = str.length;
  if(len ==2){ //长度为2（也是递归的临界值） 直接对比 
    if(str.charAt(0) == str.charAt(1))
      return true;
    else
      return false;
  }
  var mod = len % 2;
  var mid = Math.floor(len / 2);
  var str1 = str.substring(0 , mid);
  var str2 = str.substring(mid);
  if(!mod){ //余数是0 正好对半
    if(str1 != str2)
      return false;
    else
      return isAllRepeatByBinary(str1); //str1==str2 使用其中一段在进行二分法对比
  }else{ //有余数 不能折半 将中间数放入其中一段 在进行二分法对比
    str2 = str2.substring(1);//去掉中间值
    if(str1 != str2)
      return false;
    else
     return isAllRepeatByBinary(str.substring(mid));
  }
}

/**
  *  获取一段随机的字符串 字符串长度不可知
  *
  */
function getRandomString(){
  //首先获取一串0-1的随机数 然后将其转换成36进制 再把前面的0.去掉
  return Math.random().toString(36).substring(2);
}

/**
  *  小数向下取整
  *
  */
function getFloorInteger(n){
  //也可以使用~~n 和 n|0
  return n>>0;
}

/**
  *  将两个整数交换 以为是按值传递 所以需要返回 反则原来的数不会吧
  *  使用：var a = 6;var b = 19;var ret = swapInteger(a , b);a = ret[0];b=ret[1];
  *
  *  @param
  *
  *  @return 交换后的数组
  */
function swapInteger(a , b){
  a ^= b;
  b ^= a;
  a ^= b;
  return [a , b];
}

 /**
  *  验证数组中是否有重复值  数组的元素只能是基本类型，不支持对象
  *
  *  @param
  *
  *  @return  存在重复值 返回true 否则返回false
  */
  function hasRepeat(arr){
  	var has = {};
  	for(var i=0,len=arr.length;i<len;i++){
  		if( has[arr[i]] ) {
  			return true;
  		}
  		has[ arr[i] ] = true;
  	}
  	return false;
  }

 /**
  *  验证数组中的对象某个属性是否有重复值 不支持基本类型 
  *
  *  @param objArr 对象集合
  *  @param attribute 需要验证的对象属性
  *
  *  @return  存在重复值 返回true 否则返回false
  */
  function hasRepeatAttr(objArr , attribute){
  	var has = {};
  	for(var i=0,len=objArr.length;i<len;i++){
  		var obj = objArr[i];
  		if( has[obj[attribute]] ){
  			return true;
  		}
  		has[ obj[attribute] ] = true;
  	}
  	return false;
  }

 /**
  *  是否为空对象
  *
  *  @param obj
  *
  *  @return 
  */
  function isEmptyObj(obj){
  	return !(Object.getOwnPropertyNames(obj).length);
  }

 /**
  *  保留n位有效数字
  *
  *  @param obj
  *
  *  @return 
  */
  function formatNumber(number , index){
  	return Math.round(number * Math.pow(10,index)) / Math.pow(10,index);
  }



