/**
 * 
 * 
 * 
 * TODO
 * 
 * 
 * 
 */


function Calendar(params){
	var param = $.extend({
		elem : $(),
		date: new Date(),
		show: false,
		showCount: 3 // 日历打开显示多少个月份
		
	},params);
	/**对外提供显示接口*/
	this.show = function(){
		drawCalendar();
		console.log(initInfo());
	}
	
	function drawCalendar(){
		var ele = param.elem;
		var mToday = param.date;
		var info = initInfo(mToday);
		var Y = info.Y;
		var M = info.M;
		var D = info.D;
		var YM = info.YM;
		var First_Day_In_Week = info.First_Day_In_Week;
		var Day_Count = info.Day_Count;
		var plugin = $("<div/>").addClass("Calendar_BOX").css("width","300px");
		var mCalNAV = $("<div>").addClass("CAL_NAV").html(param.date.format("yyyy-MM")).css({
			'padding': '8px 0',
			'text-align': 'center',
			'border': '1px solid #eee'
		});
		var mWeekBar = $("<div>").addClass("WEEK_BAR").css({
			"width": "100%",
			'background': '#eee'
		});
		var mWeekBarTable = $("<table><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></table>").css({
			'width': "100%",
			'text-align': 'center'
		});
		var mCalendarBody = $("<div>").addClass("CAL_BODY");
		mCalNAV.appendTo(plugin);
		mWeekBarTable.appendTo(mWeekBar);
		mWeekBar.appendTo(plugin);
		plugin.appendTo(ele);
		var mCalendarBodyTable = $("<table>");
		
		
	}
	
	/**
	 * 构造日历所需要的数据封装
	 * 
	 */
	function initInfo(date){
		var mToday = date || new Date();
		var Y = mToday.getFullYear();
		var M = Number(mToday.getMonth())+1; //显示的月份（1-12）
		var D = mToday.getDate();
		var mFirstDate =  new Date(Y,M-1,1); // 这个月的第一天
		var First_Day_In_Week = mFirstDate.getDay(); //这个月的第一天是星期几
		var mLastDate = new Date(Y,M+1,0);  // 这个月的最后一天
		var Day_Count = mLastDate.getDate();  //这个月一共有多少天
		var data = {};
		data.Y = Y;
		data.M = M < 10 ? '0'+ M : M;
		data.D = D;
		data.YM = Y+""+data.M;
		data.First_Day_In_Week = First_Day_In_Week;
		data.Day_Count = Day_Count;
		return data;
	}
	
	Date.prototype.format = function(pattern){
		var Y = this.getFullYear();
		var M = Number (this.getMonth() )+1;
		var d = this.getDate();
		M = M > 10 ? M : '0'+M;
		d = d > 10 ? d : '0' + d;
		if("yyyy-MM" == pattern){
			return Y+"-"+M;
		}else if("yyyy-MM-dd" == parrern){
			return Y + "-" + M + "-" + d;
		}else{
			return this;
		}
	}
	
}



