简单日历控件，适用PC端
calendar1.0.0 html说明:
日历只做显示使用 不能用于选择和回显 使用方法：
var ele = xxx jquery dom对象
var config = {} 对象属性可参考源码里的opt对象 其中 weekstart接收0-6的数字 分别代表星期栏的开始日期是星期天 星期一 以此类推
构造 ：ele.getCalendar(config);
或 ： getCalendar(ele , config);
