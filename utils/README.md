Select0.js代替原生的select下拉框，可以使用下面方法访问选择项的值（值需要放在option的value标签)
ele.find("select").find(".selected");
或者：
sel.getSelected();
或者
xxx.find("input[name=selectName]").attr("data-value);
其中ele sel是上述Demo里的变量xxx是select的父元素，selectName是select定义的name
