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


