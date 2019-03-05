(function(window , undefined){
	var cloneDiv = document.createElement("div");
	var cloneSpan = document.createElement("span");
	var cloneSection = document.createElement("section");
	var cloneUl = document.createElement("ul");
	var cloneLi = document.createElement("li");
	const types = ["year" , "month" , "day"];
	function Calendar(options){
		var opts = extend({
			min: '1900-11-11', //最小年月日 格式yyyy-MM-dd或者yyyy/MM/dd
			max: '2100-01-01', //最大年月日
			value:'', //默认显示今天
			bindele:'',//绑定点击节点
			cancelText: '取消',
			confirmText: '确定',
			itemcount: 3 //上层和下层各显示多少个元素，默认是两个
		} , options);
	var mindate = new Date((opts.min).replace(/-/g , "/")), //开始时间
		maxdate = new Date((opts.max).replace(/-/g,"/")), //结束时间
		minyear = mindate.getFullYear(), // mindate的年份
		minmonth = mindate.getMonth(), // mindate的月份 0-11
		minday = mindate.getDate(), //mindate的日
		maxyear = maxdate.getFullYear(), //maxdate的年份
		maxmonth = maxdate.getMonth(), //maxdate的月份 0-11
		maxday = maxdate.getDate(), //maxdate的日
  		currentdate, //当前位于选中线间的日期
  		currentyear, // 当前位置的年份
  		currentmonth, // 当前位置的月份
  		currentday, //当前位置的日
  		callbacks = {}; //回调函数集
  		(function(){
  			console.log("min: "+mindate);
  			console.log("max: "+maxdate);
  			if(opts.value.length){
  				currentdate = new Date((opts.value).replace(/-/g,"/"));
  				if(currentdate.getTime() > maxdate.getTime() || currendate.getTime() < mindate.getTime()){
  					currentdate = new Date();
  				}
  			}else{
  				currentdate = new Date();
  			}
  			console.log(currentdate);
  			currentyear = currentdate.getFullYear();
  			currentmonth = currentdate.getMonth();
  			currentday = currentdate.getDate();
  			createContainer();
  		})()

	var modal , //遮罩层
  		contain, //picker容器
  		cancelBtn, //取消按钮
  		confirmBtn;//确定按钮
  		/**创建底部容器*/
  		function createContainer(){
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
			createScrollItems();
			createShodow();
			if(opts.bindele){
				var ele = opts.bindele;
				ele.addEventListener("click" ,fnShow , true);
			}
		}

		var items;
		/**创建滑动主体*/
		function createScrollItems(){
			var main = cloneDiv.cloneNode();
			main.classList.add("main");
			contain.append(main);
			for(let i=0;i<3;i++){
				var col = cloneDiv.cloneNode();
				col.classList.add("scroll-wrapper")
				var ul = cloneUl.cloneNode();
				fillcontent(ul , types[i]);
				bindEvent(ul , types[i]);
				
				col.append(ul);
				main.append(col);
			}		
			main.append(col);
		}

		function fillcontent(ul , type){
			switch(type)
			{
				case 'year':
				createYearItem(ul);
				break;
				case 'month':
				createMonthItem(ul);
				break;
				case 'day':
				createDayItem(ul);
				break;
			}

		}

		function createYearItem(parentUl){
			var itemcount = maxyear - minyear;
			for(let i=0;i<=itemcount;i++){
				var li = cloneLi.cloneNode();
				li.innerText = parseInt(minyear)+i;
				parentUl.append(li);
			}
			var offset = currentyear - minyear;
			adjustposition(parentUl , offset*35);
			parentUl.addEventListener("touchstart" , fnYearTouchStart , true);
			parentUl.addEventListener("touchmove" , fnYearTouceMove , true);
			parentUl.addEventListener("touchend" , fnYearTouchEnd , true);

		}

		function createMonthItem(parentUl){
			var startmonth = 1;
			var endmonth = 12;
			if(currentyear == minyear){
				startmonth = minmonth+1; //开始日期可能设置为非1月
			}
			if(currentyear == maxyear){
				endmonth = maxmonth+1; //结束日期可能设置为非1月
			}
			for(let i=startmonth;i<=endmonth;i++){
				var li = cloneLi.cloneNode();
				li.innerText = formatstr(i);
				parentUl.append(li);
			}
			var offset = getViewMonth(currentmonth) - startmonth;
			adjustposition(parentUl , offset*35);
		}

		function createDayItem(parentUl){
			var startday = 1;
			var endday = 31;
			if(currentyear == minyear && currentmonth == minmonth){
				startday = minday
			}else{
				startday = 1;
			}
			if(currentyear == maxyear && currentmonth == maxmonth){
				endday = maxday;
			}else{
				endday = getMaxDayByMonth(currentdate);
			}
			for(let i=startday;i<=endday;i++){
				var li = cloneLi.cloneNode();
				li.innerText = formatstr(i);
				parentUl.append(li);
			}
			var offset = currentday - startday;
			adjustposition(parentUl , offset*35);
		}


		/**位数不足前面带0补齐*/
		function formatstr(ori){
			var i = parseInt(ori);
			if(i < 10){
				i = '0'+i;
			}
			return i;
		}

		/**0-11月份转换成1-12*/
		function getViewMonth(month){
			return month+1;
		}

		/**本月最后一天的日期*/
		function getMaxDayByMonth(date){
			var monthlast = new Date(date.getFullYear() , date.getMonth()+1 ,0);
			return monthlast.getDate();
		}

		function adjustposition(element , offset){
			element.style.transform = "translateY(-"+offset+"px)";
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

		function fnShow(callback){
			modal.style.display = "block";
			contain.style.transform = 'translateY(0%)';
			typeof callbacks["show"] === 'function' && callbacks["show"]();
			typeof callback === 'function' && callback();
		}

		function fnClickModal(){
			modal.style.display = "none";
			contain.style.transform = 'translateY(100%)';
			typeof callbacks["hide"] === 'function' && callbacks["hide"]();
		}

		function bindEvent(element , type){
			element.addEventListener("touchstart" , function(e){
				fnTouchStart.call(element , e , type);
			} , true);

			element.addEventListener("touchmove" , function(e){
				fnTouchMove.call(element , e , type);
			} , true);

			element.addEventListener("touchend" , function(e){
				fnTouchEnd.call(element , e , type);
			} , true);

		}
		
		var startY = 0;
		function fnTouchStart(event , type){
			var event = event || window.event;
			event.preventDefault();
			startY = event.changedTouches[0].clientY;
		}

		function fnTouchMove(event , type){
			var event = event ||window.event;
			event.preventDefault();
			var curentY= event.touches[0].pageY;
			var translateY = curentY - startY; //触摸移动的距离
			/*if(!checkBonud(translateY)){
				return;
			}*/
			var offset = -((currentyear - minyear) * 35) + translateY;
			adjustposition(this , -offset);//实时响应移动
		}

		function fnTouchEnd(event , type){

		}
		//TO continue 根据不同类别，计算出滑动的距离
		function getTypeSelectOffset(type){
			var offset = 0;
			switch(type){
				case 'year':
					offset = currentyear - minyear;
					break;
				case 'month':
					offset = currentmonth - minmonth
			}
		}

		function fnYearTouchStart(event){
			var event = event ||window.event;
			event.preventDefault();
			console.log(event);
			yearStartY = event.changedTouches[0].clientY;
		}

		function fnYearTouceMove(event){
			var event = event ||window.event;
			event.preventDefault();
			var curentY= event.touches[0].pageY;
			var translateY = curentY - yearStartY; //触摸移动的距离
			/*if(!checkBonud(translateY)){
				return;
			}*/
			var offset = -((currentyear - minyear) * 35) + translateY;
			console.log(offset);
			adjustposition(this , -offset);//实时响应移动
		}

		function fnYearTouchEnd(event){
			var event = event ||window.event;
			event.preventDefault();
		}

		function cancel(){

		}

		function confirm(){

		}
	}

	window.Calendar = Calendar;

})(window , undefined)


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


