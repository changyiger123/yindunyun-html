
import $ from 'jquery';
/**固定滚动到指定位置**/
(function ($) {
	$.fn.extend({
		rollTo: function(options) {
			var o = {
				warpBody: ".data",   //滚动的区域
				oFinish: "body",	//要滚动到的元素
				sSpeed: 300,		//滚动速度
				bMonitor: true, 	//是否楼层监听
				sClass: "active",	//楼层监听时需要添加的样式
				iBias:-18,			//偏差调节
				fnAdditional: ""	//追加方法
			}
			o = $.extend(o,options);
			var oThis = $(this);
			var	thisCont = $(o.oFinish).offset();
			// console.log(thisCont);
            var targetOffset = parseInt(thisCont.top+o.iBias);
			oThis.click(function() {
				$(o.warpBody).stop(true, true).animate({
					scrollTop: targetOffset
				}, o.sSpeed);
				//oThis.addClass(o.sClass).siblings().removeClass(o.sClass);
				o.sSpeed == 0 && $("body").stop(true, true);
				o.fnAdditional && o.fnAdditional();
			});
			if (o.bMonitor) {

				$(o.warpBody).bind("scroll load", function(event) {
                    // oThis.removeClass(o.sClass).siblings().removeClass(o.sClass);
					if ($(this).scrollTop() >= targetOffset) {
						oThis.addClass(o.sClass).siblings().removeClass(o.sClass);
					}

                    // else if ($(this).scrollTop() == 0){
                     //    $(".info").addClass(o.sClass).siblings().removeClass(o.sClass);//默认第一个浮动侧导航点亮
                    // }
                    // else{
                     //    $(".info").addClass(o.sClass).siblings().removeClass(o.sClass);
					// }
				});
			}
			return $(this);
		}
	});
})($);
export default $