底部滑动选择器

demo1 简单的提示：
var data = {
data:["广州" , "肇庆" , "佛山"],
idx: 2,
}
var picker = new SingleSlider(data);
取值：picker.getSelectedNode();返回元素对象，可以从元素对象的文本和dataset获取需要的属性

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

