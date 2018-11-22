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
	extend( iElement.prototype, {
		sayHello: function(){
			alert("hello world");
		}
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