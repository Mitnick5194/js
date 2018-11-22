代替原生select控件

demo
var ele = $("#mBox");
var sel = new Select(ele,{title:"载客座位数",kwsearch: true});
ele.on("change",function(){
	var s = sel.getSelected();	
})
