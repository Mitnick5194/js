
/**
 * 使用：调用实例的move方法，方法传入回调retWrap.getRet实例，可以获取retWrap.getRet里的相关值
 * 在success回调用同样可以拿到上述的实例，拿到实例自己做业务处理，success只会在触摸完成时调用，
 * 可能不触发，详情查看触发条件，触发后需要在调用者把最新的滑动距离传入控件中保存，
 * 调用Slider.setOffset(offset)方法传入
 * 如果不触发success,则会触发recovery回调（两者互斥），同样有上述实例传入，因为位置复原，所以不用调用Slider.setOffse()方法
 * complete回调同样可以拿到上述的实例，在触摸完成后一定会触发
 * 
 *
 * @param slider 滑动的元素
 * 
 * @param target 跟随滑动的元素（一般和slider一样，滑动和跟随滑动一般是同一个元素）
 *
 * @version 1.0
 * @author niezhenjie
 */

 (function(window,factory){
 	window.Slider = factory;
 })(window,function(slider , target){
	var config = {
		fireDistX: 200,//x轴滑动距离超过fireDistX，不管用时多长都会触发成功
		notFireDistX:5,//x轴滑动距离不超过notFireDistX，不管用时多长都不会触发成功
		fireSpeed: 0,//x轴滑动距离超过notFireDistX但不超过fireDistX时，只有速度达到fireSpeed才回触发成功
		length: 0,//滑动元素的总长度
		pageLength: 0,//每一页的宽度
	}

	var callbacks = {};//回调集合

	/**本次滑动时的滑动数据*/
	function poi(x,y,t){
		var _x = x;
		var _y = y;
		var _t = t;
		return {
			setX: function(x){
				_x = x;
			},
			getX: function(){
				return _x;
			},
			setY: function(y){
				_y = y;
			},
			getY: function(){
				return _y;
			},
			setT:function(t){
				_t = t;
			},
			getT:function(){
				return _t;
			}
		}
	}

	/**全局且单例，保存在sliderWrap实例中*/
	function retWrap(distX,distY,duration){
		var _distX = distX;
		var _distY = distY;
		var _duration = duration;
		var _offsetX = 0;//上一次的滑动距离，本次滑动需要加上上一次的滑动距离
		var _offsetY = 0;//上一次的滑动距离，本次滑动需要加上上一次的滑动距离
		return {
			getRet: function(){
				return{
					distX: _distX,
					distY: _distY,
					absDistX: Math.abs(_distX),
					absDistY: Math.abs(_distY),
					duration: _duration,
					direction: _distX > 0 ? 1 :-1//1右滑-1左滑
				}
				
			},
			update: function(distX,distY,duration){
				_distX = distX + _offsetX; //和上次的滑动距离相加
				_distY = distY + _offsetY;
				_duration = duration;
			},
			setOffsetX: function(offset){
				_offsetX = offset;
			},
			setOffsetY: function(offset){
				_offsetY = offset;
			}
		}

	}

	var UTILS = {
		createPoi: function(event){
			return poi(event.changedTouches[0].clientX,event.changedTouches[0].clientY,event.timeStamp);
		},
		updatePoi:function(event,poi){
			if(!poi){
				this.createPoi(event);
				return poi;
			}
			poi.setX(event.changedTouches[0].clientX);
			poi.setY(event.changedTouches[0].clientY);
			poi.setT(event.timeStamp);
			return poi;
		},
		calCurrent:function(){ //滑动时动态计算滑动的结果
			var s = sliderWrap.start;
			var c = sliderWrap.current;
			if(!s || !c){
				return;
			}
			var distX = c.getX() - s.getX();
			var distY = c.getY() - s.getY();
			var duration = c.getT() - s.getT();
			var ret = sliderWrap.ret;
			if(!ret){
				sliderWrap.ret = retWrap(distX,distY,duration);
				return;
			}
			ret.update(distX,distY,duration);
		},
		cal:function() { //滑动完成后计算结果
			var s = sliderWrap.start;
			var e = sliderWrap.end;
			if(!s || !e){
				return;
			}
			var distX = e.getX() - s.getX();
			var distY = e.getY() - s.getY();
			var duration = e.getT() - s.getT();
			var ret = sliderWrap.ret;
			if(!ret){
				sliderWrap.ret = retWrap(distX,distY,duration);
				return;
			}
			ret.update(distX,distY,duration);
		},
		clear: function() { //本次滑动完成后清楚滑动数据
			sliderWrap.start = null;
			sliderWrap.end = null;
			sliderWrap.move = null;
		}
	}

	/**全局且单例*/
	var sliderWrap = {
		start:null,
		current:null,
		end:null,
		ret: null,
		
	}
	slider.addEventListener("touchstart",function(e){
		handleTouchStart.call(this,e);
	},false)

	slider.addEventListener("touchmove",function(e){
		handleTouchMove.call(this,e);
	},false)

	slider.addEventListener("touchend",function(e){
		handleTouchEnd.call(this,e);
	},false)

	function handleTouchStart(event){
		var e = event || window.event;
		e.preventDefault();//禁止页面随着滚动
		sliderWrap.start = UTILS.createPoi(e);
	}
	function handleTouchMove(event){
		var e = event || window.event;
		e.preventDefault();//禁止页面随着滚动
		var current = sliderWrap.current
		if(!current){ //单例
			current = sliderWrap.current = UTILS.createPoi(e);
		}else{
			UTILS.updatePoi(e,current);
		}
		UTILS.calCurrent();
		notify("move");
	}
	function handleTouchEnd(event){
		var e = event || window.event;
		e.preventDefault();//禁止页面随着滚动
		sliderWrap.end = UTILS.createPoi(e);
		UTILS.cal();
		var ret = sliderWrap.ret;
		ret.setOffsetX(ret.getRet().distX);
		notify("end");
		UTILS.clear();
	}

	/**根据类型做响应的回调处理*/
	function notify(type){
		if(!sliderWrap.ret){
			return;
		}
		var ret = sliderWrap.ret.getRet();
		var distX = ret.absDistX;
		var duration = ret.duration;
		var conf = config;
		if(type == "move"){
			move(ret);
		}else if(type == "end"){
			//判断触发条件
			if(distX < conf.notFireDistX){
				//小于notFireDistX不触发成功，并还原
				fireRecovery(ret);
				return;
			}
			var speed = distX / duration;
			if(distX >= conf.fireDistX || speed > conf.fireSpeed){
				fireSuccess(ret);
			}
			fireComplete(ret);
		}
	}

	function move(ret){
		typeof callbacks["move"] === 'function' && callbacks["move"](ret);
	}
	function fireRecovery(ret){
		typeof callbacks["recovery"] === 'function' && callbacks["recovery"](ret);
	}
	function fireSuccess(ret){
		typeof callbacks["success"] === 'function' && callbacks["success"](ret);
	}
	function fireComplete(ret){
		typeof callbacks["complete"] === 'function' && callbacks["complete"](ret);
	}

	this.config = function(param){
		  Object.assign(config, param);
		  return this;
	}
	this.move = function(callback){
		callbacks["move"] = callback;
		return this;
	}
	this.recovery = function(callback){
		callbacks["recovery"] = callback;
		return this;
	}
	this.complete = function(callback){
		callbacks["complete"] = callback;
		return this;
	}
	this.setOffset = function(offset){
		var ret = sliderWrap.ret;
		ret.setOffsetX(offset);
	}
	this.success = function(callback,newOffset){
		callbacks["success"] = callback;
		return this;
	}
})
