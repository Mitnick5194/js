(function(){

	var 
	iVersion = '1.0.0',
	iElement;
	try{
		iElement = Node; //使用节点 范围更小
	}catch(e){
		iElement = Element;
	}
	console.log(iElement);
	var $ = window.$ =  window.Query = Query;

	function Query(selector , content){
		
	}

	Query.prototype = {
		constructor: Query,
		version: iVersion
	}

	function getFloorInteger(n){
  	//也可以使用~~n 和 n|0
  	return n>>0;
  }

	 /**
  *   字符串缓冲区
  *
  *  @param size 缓冲区大小，超出大小抛出异常	
  *
  *  @return 
  */
  function StringBuffer(size){
  	var arr = [];
  	this.append = function(data){
  		if(size && arr.length >= size){
  			throw new Error("IndexOutOfBoundsException,缓冲区最大容量："+size+" 当前容量："+arr.length);
  		}
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
	 *	倒计时
	 *
	 *	@param second 秒数
	 *	@param callback 倒计时完毕时调用
	 */
	 function fnCountdown(options,callback){
	 	var opts = extend({
	 		ele: options.ele, //ele 倒计时父元素
	 		second: options.second,
	 		maxUnit: "min",//最大单位值，默认分min,可选值：hour,sec
	 		marks: ["h","m","s"], //时分秒的表示形式,即使最大单位是min或sec，也要把三个都传进来
	 		inteval: 1,//多久变一次，默认1s
	 		completeContent:null, //执行完毕后显示什么内容
	 	},options);

	 	var ele = opts.ele;
	 	var unit = opts.maxUnit;
	 	var second = opts.second;
	 	var marks = opts.marks;
	 	var sb = new StringBuffer();
	 	if(unit == "hour"){
	 		var h = getFloorInteger(second / 3600);
	 		var m = getFloorInteger((second % 3600) / 60);
	 		var s = getFloorInteger(((second % 3600)% 60)/60);
	 		sb.append(h);
	 		sb.append(" ");
	 		sb.append(marks[0]);
	 		sb.append(" ");
	 		sb.append(m);
	 		sb.append(" ");
	 		sb.append(marks[1]);
	 		sb.append(" ");
	 		sb.append(s);
	 		sb.append(" ");
	 		sb.append(marks[2]);
	 	}else if(unit == "min"){
	 		var m = getFloorInteger(second / 60);
	 		var s = getFloorInteger(second % 60);
	 		sb.append(m);
	 		sb.append(" ");
	 		sb.append(marks[1]);
	 		sb.append(" ");
	 		sb.append(s);
	 		sb.append(" ");
	 		sb.append(marks[2]);
	 	}else if(unit == "sec"){
	 		sb.append(second);
	 		sb.append(" ");
	 		sb.append(marks[2]);
	 	}else{
	 		throw new Error("maxunit类型错误，expect hour or min or sec,but "+unit);
	 	}
	 	ele.html(sb.toString());
	 	if(second <=0){
	 		if(opts.completeContent){
	 			ele.html(opts.completeContent)
	 		}
	 		typeof callback && callback();
	 		return;
	 	}
	 	opts.second = opts.second - opts.inteval;
	 	var timer = setTimeout(function(){
	 		fnCountdown(opts,callback)
	 	},(opts.inteval)*1000);
	 	if(timer > 1){
	 		clearTimeout(timer-1);
	 	}
	 }


	 extend( iElement.prototype, {
	 	sayHello: function(){
	 		alert("hello world");
	 	},

	 	html: function(content){
	 		this.innerHTML = content;
	 	},

		/**
		 *	倒计时
		 *
		 *	@param second 秒数
		 *	@param callback 倒计时完毕时调用
		 */
		 getCountdown: function(options,callback){
		 	options.ele = this;
		 	fnCountdown.call(this,options,callback);
		 },

		 
		})

	 function extend() {
	 	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;
	 	if (typeof target === "boolean") {
	 		deep = target;
	 		target = arguments[1] || {};
	 		i = 2;
	 	}
	 	if (typeof target !== "object" && ! typeof target !=="function") {
	 		target = {};
	 	}
	 	if (length == i) {
	 		target = this;
	 		--i;
	 	}
	 	for (; i < length; i++) if ((options = arguments[i]) != null) for (var name in options) {
	 		var src = target[name], copy = options[name];
	 		if (target === copy) {
	 			continue;
	 		}
	 		if (deep && copy && typeof copy === "object" && !copy.nodeType) {
	 			target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
	 		} else if (copy !== undefined) {
	 			target[name] = copy;
	 		}
	 	}
	 	return target;
	 }
	})()

