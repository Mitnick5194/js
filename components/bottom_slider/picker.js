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
  * 取值：picker.getSelectedNode();返回元素对象，可以从元素对象的文本和dataset获取需要的属性
  *
  	demo2 可以自定义dataset：
  	var data = [{
			name: '广州',
			dataset:{id:1,provider:'广东'}
		},{
			name: '肇庆',
			dataset: {id:2 , provider: '广东'}
		},{
			name: '赣州',
			dataset: {id:3,provider:'江西'}
		},{
			name: '太原',
			dataset:{id:4,provider: '山西'}
		},{
			name: '西宁',
			dataset:{id:4,provider: '青海'}
		}]
		var picker = new SingleSlider({
			title:"请选择",
			//data:["广州1","肇庆2","广州3","肇庆4","广州5","肇庆6","广州7","肇庆8","广州9","肇庆10","广州11","肇庆12"],
			data:data,
			idx: 2
		});


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
			selectIdx: 0,
			dataset: [],
			bindele: '', //点击绑定元素显示选择器
			confirmText: '确定',
			cancelText: '取消',
			title: '',
			showcallback:null,
			hidecallback: null,
		} , option);
  		var 
  		modal , 
  		contain,
  		cancelBtn,
  		confirmBtn;
  		(function(){
  			contain = cloneDiv.cloneNode();
  			contain.classList.add("picker-bottom-container");
  			document.body.append(contain);
  			modal = cloneDiv.cloneNode();
  			modal.classList.add("picker-bottom-modal");
  			modal.addEventListener("click" , fnClickModal , false);
  			document.body.append(modal);
  			var nav = cloneDiv.cloneNode();
  			nav.classList.add("nav");
			//取消
			cancelBtn = cloneSpan.cloneNode();
			cancelBtn.classList.add("cancel");
			cancelBtn.innerText = "取消";
			cancelBtn.addEventListener("click", cancel , false);
			//确定
			confirmBtn = cloneSpan.cloneNode();
			confirmBtn.classList.add("confirm");
			confirmBtn.innerText = "确定";
			confirmBtn.addEventListener("click", confirm , false);
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
			createScroll();
			if(opts.bindele){
				var ele = opts.bindele;
				ele.addEventListener("click" ,fnShow , false);
			}
		})()
		var items;
		function createScroll(){
			var main = cloneDiv.cloneNode();
			main.classList.add("main");
			items  = cloneDiv.cloneNode();
			items.classList.add("items");
			if(opts.selectIdx){
				var trans = opts.selectIdx * 35;
				items.style.transform= "translateY(-"+trans+"px)";
			}
			bindEvent(items);
			main.append(items);
			opts.data.forEach(function(item){
				var sec = cloneSection.cloneNode();
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
			createShodow();
		}

		function createShodow(){
			var ShodowTop = cloneDiv.cloneNode();
			ShodowTop.classList.add("shadow-top");
			var ShodowBottom = cloneDiv.cloneNode();
			ShodowBottom.classList.add("shadow-bottom");
			contain.append(ShodowTop);
			contain.append(ShodowBottom);
		}
		function bindEvent(ele){
			if(!ele){
				return;
			}
			ele.addEventListener("touchstart" , fnTouchstart , false);
			ele.addEventListener("touchmove" , fnTouchmove, false);
			ele.addEventListener("touchend" , fnTouchend, false);
		}

		var 
		startY, //开始滑动时的y轴坐标
		startTime, //开始触屏时的时间
		movedistance = opts.selectIdx ? (-opts.selectIdx * 35) : 0;//已经滑动的距离,上一次滑动后离开屏幕后再次滑动时需要
		function fnTouchstart(event){
			var event = event || window.event;
			startY = event.changedTouches[0].clientY;
			startTime = event.timeStamp;
		}

		function fnTouchmove(event){
			
			var event = event || window.event;
			var curentY= event.touches[0].pageY;
			var translateY = curentY - startY + movedistance;
			if(!checkBonud(translateY)){
				return;
			}
			this.style.transform = "translateY("+translateY+"px)"; //实时响应移动
		}

		/**手指离开屏幕，需要处理选择的项不在选中框中间*/
		function fnTouchend(event){
			var event = event || window.event;
			var curMoveY = event.changedTouches[0].pageY;
			var trans = curMoveY - startY;
			trans = fixPositino(trans);
			movedistance += trans;
			if(movedistance > 0){
				movedistance = 0;
			} 
			var len = opts.data.length;
			if(Math.abs(movedistance) > (len-1) * 35){
				movedistance =  (len-1) * 35 * (-1);
			}
			changeIdx(movedistance);
			this.style.transform = "translateY("+movedistance+"px)"; //实时响应移动
		}

		/**修正位置，如不是选择的项不是在两分割线中间，则需要调整至居中*/
		function fixPositino(trans){
			var mod =Math.floor(trans % 35);
			var n = parseInt(trans / 35);
			var dir = trans > 0 ? 1 : -1;
			if(mod == 0){
				return trans;
			}
			if(mod*dir >= 17){
				trans =  (n+dir) * 35;
			}else{
				trans = n * 35;
			}
			return trans;
		}

		/**检查边界，禁止滑出可视范围*/
		function checkBonud(trans){
			var len = opts.data.length;
			return trans < 75 && trans >((len-1) * 35 +75) *(-1);
		}

		function fnClickModal(){
			fnHide();
		}

		function changeIdx(trans){
			var mod = movedistance % 35;
			var times = Math.abs(movedistance / 35);
			if(mod === 0){
				opts.selectIdx = times;
			}else{
				times = parseInt(times);
				if(Math.abs(mod) > 17){
					opts.selectIdx = times+1;
				}else{
					opts.selectIdx = times-1;
				}
			}
		}


		this.show = function(){
			fnShow();
		}
		function fnShow(){
			modal.style.display = "block";
			contain.style.transform = 'translateY(0%)';
		}

		this.hide = function(){
			fnHide();
		}

		function fnHide(){
			modal.style.display = "none";
			contain.style.transform = 'translateY(100%)';
		}
		this.getSelectedNode = function(){
			return fnGetSelectedNode();
		}

		function fnGetSelectedNode(){
			var idx = opts.selectIdx;
			var children = items.children;
			var node = children[idx];
			return node;
		}

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
		}

		function cancel(){
			fnHide();
		}

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
