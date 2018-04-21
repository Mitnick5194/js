/**
 * 
 * author: niezhenjie
 */

var ICON_URL = "/home/mitnick/arrow_down.png"
	function  Select(ele,config){
		var ops = $.extend({
			kwsearch: {flag:false,isLike:true}, //flag是否支持关键字搜索 isLike是否为模糊查询 如果为false 则 1 12 123 ‘1’只匹配1 不会匹配12和123
			shownum: 8, // 超出多少个后显示滚动条
			slideevent: 'click',  //打开下拉框是以点击事件还是mouseenter方式
			css: '', //显示框的样式
			title: '', 
			titlecss:'',
			ulcss: '' //下拉框样式
		},config);
		var selected;
		var ele = ele;
		var sel = ele.find("select");
		sel.hide();
		var options = sel.find("option");
		var firstOpt = options.eq(0); //第一个选项
		var width = ele.width();
		var height = ele.height()-2;

		var isSelected = false; //当前是否有选择的项
		var selectIdx = 0 ;// 当前选择的项的下标
		var flag = true; //标记是否为第一次点击打开ul 如果不是第一次 则不执行滚动条滚动操作

		//包裹在最外层的div
		var plugin = $("<div/>").css({
			height: height,
			width: width,
			display: "inline-block",
			border: "1px solid #eee",
			cursor: "pointer",
			padding: "0 5px",	
		}).addClass("_select_dv");
		
		plugin.appendTo(ele);	

		// 标题
		var title = $("<span>").addClass("_select_title").css({display: "inline-block",height: height,"line-height": height+'px',"vertical-align" : "top"});	
		if(ops.title){
			title.html(ops.title).css({color: "#808080"}).appendTo(plugin);
			if(ops.titlecss && $.isPlainObject(ops.titlecss)){
				title.css(ops.titlecss);
			}
		}
		var title_width = title.width();
		var input = $("<input>").css({
			height: height,
			width: width-title_width-30,
			border: "none",
			outline: "none",
			padding: 0 ,
			cursor: "pointer",
			"vertical-align" : "top",
			"padding-left": "10px"
		}).addClass("_select_input").val(firstOpt.html()).attr("data-value",firstOpt.attr("value")).attr("readonly","readonly").appendTo(plugin); //默认显示第一个
		if(sel.attr("name")){
			input.attr("name",sel.attr("name"));
		}
		if(ops.css && $.isPlainObject(ops.css)){
			input.css(ops.css);
		}
		//下拉图片
		var icon = $("<span>").css({
			display: "inline-block",
			width: 20,
			height: height,
			background: "url("+ICON_URL+") no-repeat", 
			"background-position": "center",
			"background-size": "20px 10px",
			"vertical-align" : "top"
		}).addClass("_select_icon").appendTo(plugin);


		var parentPos = ele.offset();

		//下拉面板
		var ul = $("<ul>").css({
			display: "inline-block",
			position: "absolute",
			top: parentPos.top+height+1,
			left: parentPos.left+title_width,
			width: width - title_width,
			margin: 0,
			"padding-left": 0,
			"list-style-type" : "none",
			padding: "0 5px",
			background: "#fff",
			index: 1000,
			border: "1px solid #eee",
			"text-align": "center",
			display: "none",
			"max-height": ops.shownum * 40, //40是li大概高度
			"overflow-y": "scroll",
		}).addClass("wtl-scroll _select_ul").appendTo(plugin);
		if(ops.ulcss && $.isPlainObject(ops.ulcss)){
			ul.css(ops.ulcss);
		}
		//下拉面板内容
		$.each(options,function(idx){
			var _this = $(this);
			var li = $("<li>").css({
				padding: "10px 0",
				"word-wrap": "break-word",

			}).attr("value",_this.attr("value")).html(_this.html()).hover(function(){
				$(this).css("background","#eee");
			},function(){
				if($(this).hasClass("selected")){
					return;
				}
				$(this).css("background","#fff");
			}).appendTo(ul);
			if(_this.hasClass("selected")){
				isSelected = true;
				selectIdx = idx;
				li.addClass("selected").css({
					background: "#eee"
				});
				changeInput(li);
			}	
		})
		if("mouse" == ops.slideevent){  //使用mouseover下拉 点击选中后不会自动收起 适用于点击后跳转场景
			plugin.on("mouseenter",function(){
				slideUl("fast");
			});
			plugin.on("mouseleave",function(){
				ul.slideUp("fast");
			})
		}else{
			plugin.on("click",function(){  //使用点击
				slideUl("fast");
			});
			$(document).on("click",function(e){
				if(e.target != plugin[0] && plugin.has(e.target).length == 0){
					ul.slideUp("fast");
				}
			})
		}
		
		plugin.on("click","li",function(){			
			var _this = $(this)
			changeInput(_this);
			_this.siblings(".selected").removeClass("selected").css("background","#fff");
			_this.addClass("selected").css("background","#eee");
			var idx = _this.index(); //取得当前li所在的位置
			selected = options.eq(idx); //改变处在同样位置的option
			selected.siblings(".selected").removeClass("selected");
			selected.addClass("selected");
			//ul.slideUp("fast");
			ele.trigger("change"); //触发ele的change事件
		});


		if(ops.kwsearch.flag){
			input.removeAttr("readonly");
			input.on("keyup",function(){
				var key = $(this).val();
					searchByKeyword(key);
			})
		}

		function slideUl(speed){
			ul.slideToggle(speed);
			var li = ul.find("li").eq(0);
			var offsetTop = parseInt(selectIdx / ops.shownum);
			if(offsetTop==0){
				return;
			}
			if(flag){
				flag = false;
				ul.animate({
					scrollTop: offsetTop*ops.shownum * li.outerHeight()
				},300)
			}
		}
		 /**
		  * 关键字搜索
		  * @param keyword 
		  */
		 function searchByKeyword(keyword){
			 var items = ul.find("li").show();
			 items.each(function(){
			 	//确保isLike有传 并且为true 才进入此处 否则默认模糊 如果没有ops.kwsearch.isLike判断 则不传的时候 ops.kwsearch.isLike为undefined 
			 	//取反则为true 会进入此处 变成了默认是精确查询了 不符合要求
			 	if(ops.kwsearch.isLike && !ops.kwsearch.isLike ){ 
			 		if(keyword && $(this).html()!= keyword){
					 $(this).hide();
				 }
			 	}else{
			 		if($(this).html().indexOf(keyword) ==- 1){
					 $(this).hide();
				 }
			 	}
				  
			 });
		}

		function changeInput(obj){
			input.val(obj.html()).attr("data-value",obj.attr("value")).attr("title",obj.html());
		}
		this.getUl = function(){
			return ul;
		}
		this.getSelected = function(){
			return selected;
		}
		this.getInput = function(){
			return input;
		}	
	}