/**
  *
  *  常用工具类
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