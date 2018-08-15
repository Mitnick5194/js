var BODY = $(document.body)
function WindowPlugin(config){
	//r content = ele;
	var opts = $.extend({
		zIndex: 9999,
		css:''
	} , config);
	var mask = $("<div/>").addClass("modal-background").appendTo(BODY);
	var frame = $("<div/>").addClass("modal-dialog").appendTo(BODY);
	//ntent.appendTo(frame);
}