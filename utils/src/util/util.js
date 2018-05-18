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

