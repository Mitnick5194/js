var BODY = $(document.body);
var DOC = $(document);
$.extend($.fn , {
	getWindow: function(){
		return new WindowPlugin(this);
	}
})

function WindowPlugin(ele) {
	var content = $(ele);
	var win = $(window);
	var plugin = this;
	var mask = $("<div/>").addClass("window-plugin-background").appendTo(BODY);
	var dialog = $("<div/>").addClass("window-plugin-dialog").appendTo(BODY);
	var closer = $("<span/>").addClass("window-plugin-closer").appendTo(dialog).attr("title", "关闭");
	content.appendTo(dialog);
	var clickbackhide = false; //点击背景关闭 默认不关闭
	var callbackafterclose; //关闭后回调
	this.setCallbackafterclose = function (callbackafterclose) {
		this.callbackafterclose = callbackafterclose;
	}
	this.clickbackhide = function() {
		clickbackhide = true;
	}
	this.show = function() {
		mask.show();
		dialog.show();
		mask.removeClass("modal-background-hide");
		dialog.removeClass("modal-dialog-hide");
		mask.addClass("modal-background-show");
		dialog.addClass("modal-dialog-show");	
		center();
	}
	this.hide = function(callback) {
		mask.removeClass("modal-background-show");
		dialog.removeClass("modal-dialog-show");
		mask.addClass("modal-background-hide");
		dialog.addClass("modal-dialog-hide");
		setTimeout(function() {
			hideWindow(callback);
		} , 500)
	}
	this.setCloser = function(bool) { //显示||隐藏X关闭图标
		var b = typeof bool ==='boolean' ? bool :  true;
		if(b) {
			closer.show();
		}else {
			closer.hide();
		}
	}
	this.center = function(){
		center();
	}
	if(clickbackhide) {
		mask.bind("click" , function() {
			mask.attr("title" , "关闭");
			plugin.hide();
		});
	}
	
	function hideWindow(callback) {
		mask.hide();
		dialog.hide();
		if(typeof callback ==='function') {
			callback();
		}
		 //关闭后回调，用于不直接在外部调用hide(callback)函数关闭窗体时的回调（如点击背景modal关闭 ， 点击右上角X关闭）
		if(callbackafterclose){
			if(typeof callbackafterclose ==='function'){
				callbackafterclose();
			}
		}
	}
	closer.bind("click" , function() {
		plugin.hide();
	})
	function center(){ //使居中
		var height = DOC.height();
		var width = DOC.width();
		var dialogHeight = dialog.height();
		var dialogWidth = dialog.width();
		console.log(height+"  "+width);
		console.log(dialogHeight+"  "+dialogWidth);
		var top , left;
		if(dialogHeight > height){
			top = 0;
		}else{
			top = (height - dialogHeight) / 2;
		}
		if(dialogWidth > width){
			left = 0;
		}else{
			left = (width - dialogWidth) / 2;
		}

		dialog.css({
			top: top+"px",
			left: left+"px"
		})
	}
	win.bind("resize" , function() {
		if(dialog.is(":visible")) {
			center();
			mask.css({
				height: win.height(),
				width: win.width()
			})
		}
	})
}