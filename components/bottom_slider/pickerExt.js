/**
  *
  *	底部滑动选择器
  *	
  * demo1 简单的提示：
  *	var data = {
  *	  data:["广州" , "肇庆" , "佛山"],
  *	  idx: 2,
  *	}
  *	var picker = new SingleSlider(data);
  * 取值：picker.getSelectedNode();返回元素对象，可以从元素对象的文本中获取数据
  *
  *	demo2 可以自定义dataset：
  *	var data = [{
  *		name: '广州',
  *		dataset:{id:1,provider:'广东'}
  *	},{
  *		name: '肇庆',
  *		dataset: {id:2 , provider: '广东'}
  *	},{
  *		name: '赣州',
  *		dataset: {id:3,provider:'江西'}
  *	},{
  *		name: '太原',
  *		dataset:{id:4,provider: '山西'}
  *	},{
  *		name: '西宁',
  *		dataset:{id:4,provider: '青海'}
  *	}]
  *	var picker = new SingleSlider({
  *		title:"请选择",
  *		//data:["广州1","肇庆2","广州3","肇庆4","广州5","肇庆6","广州7","肇庆8","广州9","肇庆10","广州11","肇庆12"],
  *		data:data,
  *		idx: 2,
  		type3D: true //开启3d滚动模式
  *	});
  *
  *取值：picker.getSelectedNode();返回元素对象，可以从元素对象的文本和dataset获取需要的属性
  *
  *
  *	@author niezhenjie
  */

  (function(){
  	var nood = function(){};
  	var cloneDiv = document.createElement("div");
  	var cloneSpan = document.createElement("span");
  	var cloneSection = document.createElement("section");
  	function SingleSlider(option){
  		var opts = extend({
			data:[], //数据,
			selectIdx: 0, //初始值
			dataset: [], //dataset数据
			bindele: '', //点击绑定元素后显示选择器
			confirmText: '确定', //确定按钮显示文字
			cancelText: '取消', //取消按钮显示文字
			title: '', //标题
			showcallback:null, //显示回调
			hidecallback: null, //隐藏回调,
			type3D: false, //是否使用3d效果
			itemcount: 2, //上层和下层显示多少个元素，默认是两个
		} , option);
  		var 
  		modal , //遮罩层
  		contain, //picker容器
  		cancelBtn, //取消按钮
  		confirmBtn //确定按钮
  		var callbacks = {}; //回调函数集
  		(function(){
  			contain = cloneDiv.cloneNode();
  			contain.classList.add("picker-bottom-container");
  			document.body.append(contain);
  			modal = cloneDiv.cloneNode();
  			modal.classList.add("picker-bottom-modal");
  			modal.addEventListener("click" , fnClickModal , true);
  			document.body.append(modal);
  			var nav = cloneDiv.cloneNode();
  			nav.classList.add("nav");
			//取消
			cancelBtn = cloneSpan.cloneNode();
			cancelBtn.classList.add("cancel");
			cancelBtn.innerText = opts.cancelText;
			cancelBtn.addEventListener("click", cancel , true);
			//确定
			confirmBtn = cloneSpan.cloneNode();
			confirmBtn.classList.add("confirm");
			confirmBtn.innerText = opts.confirmText;
			confirmBtn.addEventListener("click", confirm , true);
			//标题
			var title = cloneSpan.cloneNode();
			title.classList.add("title");
			if(opts.title){
				title.innerText = opts.title;
			}
			nav.append(cancelBtn);
			nav.append(title);
			nav.append(confirmBtn);
			contain.append(nav);
			createShodow();
			createScrollItems();
			if(opts.bindele){
				var ele = opts.bindele;
				ele.addEventListener("click" ,fnShow , true);
			}
		})()
		var items;
		/**创建滑动主体*/
		function createScrollItems(){
			var main = cloneDiv.cloneNode();
			main.classList.add("main");
			items  = cloneDiv.cloneNode();
			items.classList.add("items");
			if(opts.itemcount){
				var height = 35 * (opts.itemcount * 2 + 1);
				main.style.height = height+"px";
				items.style.paddingTop = (opts.itemcount*35)+"px";
				items.style.paddingBottom = (opts.itemcount*35)+"px";
			}
			if(opts.selectIdx){
				var trans = opts.selectIdx * 35;
				items.style.transform= "translateY(-"+trans+"px)  translateZ(0px)";//translate(0px, -216px) translateZ(0px)
			}
			bindEvent(items);
			main.append(items);
			var selectIdx = opts.selectIdx;
			opts.data.forEach(function(item , idx){
				var sec = cloneSection.cloneNode();
				if(is3Dtype()){
					sec.style.transform = "rotateX("+(idx-selectIdx)*25+"deg)";
				}
				sec.classList.add("item");
				if(typeof item === 'object'){
					sec.innerText = item.name;
					if(item.dataset){
						for(var k in item.dataset){
							sec.dataset[k] = item.dataset[k];
						}
					}
				}else{
					sec.innerText = item;
				}
				items.append(sec);
			})
			contain.append(main);
			
		}

		/**选择器模糊遮罩层*/
		function createShodow(){
			var shodowTop = cloneDiv.cloneNode();
			shodowTop.classList.add("shadow-top");
			var shodowBottom = cloneDiv.cloneNode();
			shodowBottom.classList.add("shadow-bottom");
			if(opts.itemcount){
				var height = 35 * opts.itemcount;
				shodowTop.style.height = height+"px";
				shodowBottom.style.height = height+"px";
				shodowBottom.style.top = (height+35 +35)+"px";
			}
			contain.append(shodowTop);
			contain.append(shodowBottom);
		}
		function bindEvent(ele){
			if(!ele){
				return;
			}
			ele.addEventListener("touchstart" , fnTouchstart , true);
			ele.addEventListener("touchmove" , fnTouchmove, true);
			ele.addEventListener("touchend" , fnTouchend, true);
		}

		var 
		startY, //开始滑动时的y轴坐标
		startTime, //开始触屏时的时间
		selectIdx = opts.selectIdx;
		movedistance = selectIdx ? (-selectIdx * 35) : 0;//已经滑动的距离,上一次滑动后离开屏幕后再次滑动时需要

		function fnTouchstart(event){
			var event = event || window.event;
			event.preventDefault();
			startY = event.changedTouches[0].clientY;
			startTime = event.timeStamp;
		}

		function fnTouchmove(event){
			var event = event || window.event;
			event.preventDefault();
			var curentY= event.touches[0].pageY;
			var translateY = curentY - startY + movedistance;
			if(!checkBonud(translateY)){
				return;
			}
			if(is3Dtype()){
				updateRotate(curentY - startY);
			}
			this.style.transform = "translateY("+translateY+"px)"; //实时响应移动
		}

		/**手指离开屏幕，需要处理选择的项不在选中框中间*/
		function fnTouchend(event){
			var event = event || window.event;
			event.preventDefault();
			var curMoveY = event.changedTouches[0].pageY;
			var trans = curMoveY - startY;
			updateMovedistance(trans , function(tran , dist){
				if(is3Dtype()){
					updateRotate(tran);
				}
			});
			updateIdx(movedistance);
			this.style.transform = "translateY("+movedistance+"px)"; //实时响应移动
		}

		/**更新旋转角度*/
		function updateRotate(trans){
			//console.log("trans:" +trans);
			var trans2deg = trans * 25 / 35; //滑动距离转换成角度
			//console.log("trans2deg: "+trans2deg);
			[].concat.apply([] , items.children).forEach(function(item , idx){
				var deg = (idx - selectIdx) * 25 + trans2deg; //原来的角度加上本次改变的角度
				item.style.transform = "rotateX("+deg+"deg)";
			})
		}

		/**touchend时，修正位置，如不是选择的项不是在两分割线中间，则需要调整至居中*/
		function updateMovedistance(trans , callback){
			//居中处理
			var mod =Math.floor(trans % 35);
			var n = parseInt(trans / 35);
			var dir = trans > 0 ? 1 : -1;
			if(mod*dir >= 17){
				trans =  (n+dir) * 35;
			}else{
				trans = n * 35;
			}
			movedistance += trans;
			//滑超处理
			if(movedistance > 0){
				trans = selectIdx *35; //置零 用于改变角度时
				movedistance = 0;
			} 
			var len = opts.data.length;
			if(Math.abs(movedistance) > (len-1) * 35){
				movedistance =  (len-1) * 35 * (-1);
				trans = (len - selectIdx -1) * 35 * -1;
			}

			typeof callback === 'function' && callback(trans , movedistance);
		}

		/**检查边界，禁止滑出可视范围*/
		function checkBonud(trans){
			var len = opts.data.length;
			return trans < 75 && trans >((len-1) * 35 +75) *(-1);
		}

		/**点击遮罩层*/
		function fnClickModal(){
			fnHide();
		}

		/**更新选中项下标*/
		function updateIdx(trans){
			var mod = movedistance % 35;
			var times = Math.abs(movedistance / 35);
			if(mod === 0){
				selectIdx = times;
			}else{
				times = parseInt(times);
				if(Math.abs(mod) > 17){
					selectIdx = times+1;
				}else{
					selectIdx = times-1;
				}
			}
			opts.selectIdx  = selectIdx;
		}

		function fnShow(){
			modal.style.display = "block";
			contain.style.transform = 'translateY(0%)';
			typeof callbacks["show"] === 'function' && callbacks["show"]();
		}

		function fnHide(){
			modal.style.display = "none";
			contain.style.transform = 'translateY(100%)';
			typeof callbacks["hide"] === 'function' && callbacks["hide"]();
		}

		/**获取选中元素对象*/
		function fnGetSelectedNode(){
			var children = items.children;
			var node = children[selectIdx];
			return node;
		}
		/**点击确定按钮*/
		function confirm(){
			var ele = opts.bindele;
			if(ele){
				var node = fnGetSelectedNode();
				ele.innerText = node.innerText;
				var data = node.dataset;
				if(Object.getOwnPropertyNames(data).length){
					var target = ele.dataset;
					for(var k in data){
						target[k] = data[k];
					}
				}
			}
			fnHide();
			typeof callbacks["confirm"] === 'function' && callbacks["confirm"]();
		}
		/**点击取消按钮*/
		function cancel(){
			fnHide();
			typeof callbacks["cancel"] === 'function' && callbacks["cancel"]();
		}

		function is3Dtype(){
			return opts.type3D;
		}

		/**暴露接口*/
		extend(SingleSlider.prototype , {
			show:  function(){
				fnShow();
			},
			hide: function(){
				fnHide();
			},
			getSelectedNode: function(){
				return fnGetSelectedNode();
			},
			setActionCallback: function(action , callback){
				if(typeof callback !== 'function'){
					return;
				} 
				callbacks[action] = callback;
			}
		})

	}
	window.SingleSlider = SingleSlider;
})()

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