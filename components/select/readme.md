����ԭ��select�ؼ�

demo
var ele = $("#mBox");
var sel = new Select(ele,{title:"�ؿ���λ��",kwsearch: true});
ele.on("change",function(){
	var s = sel.getSelected();	
})
