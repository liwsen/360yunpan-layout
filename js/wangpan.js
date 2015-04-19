/*!
 *Copyright www.amujz.com
 *Contact liwsen@sina.com
 *Date 2013-10-14
 */
// JavaScript Document
$(function() {
	$(".LeftPanel").height($(window).height());
	$(".MainPanel").height($(window).height()-90);
	$(".MainHeader").width($(window).width()-196);
	$("*[data-alert]").click(function(){
		alertBox();
		var id = $("#"+$(this).data("alert"));
		id.fadeToggle();
		$(".mask").fadeToggle();
	});
	fileEvent();//文件、文件夹操作事件
	//切换显示模式
	$(".display_mode span").click(function(){
		if($(this).hasClass("tbText")){
			$(".FileList>ul").hasClass("list_pic")?$(".FileList>ul").attr("class","list_text"):"";
		}else{
			$(".FileList>ul").hasClass("list_text")?$(".FileList>ul").attr("class","list_pic"):"";
		}
	});
	//新建文件夹
	$("#newfolder").click(function(){
		if($("#newfoldername").length>0){
			$("#newfoldername").select();
			return false;
		}
		var newf =  '<li class="folder">';
			newf += '<div class="column column_checkbox"><label></label></div>';
			newf += '<div class="column column_name">';
			newf += '<span class="icon"></span>';
			newf += '<span class="text"><input type="text" value="新建文件夹" id="newfoldername" /></span>';
			newf += '</div>';
			newf += '</li>';
		$("li.listtitle").after(newf);
		$("#newfoldername").select();
		folderNamed();
	});
	//右键菜单
	fun_contextMenu($('#filelist ul>li'));
	
	
});

/**
//function
********************************************/
//文件、文件夹操作事件
//	$(document).keydown(function(){
//		//alert("按键码："+event.keyCode+"  字符："+String.fromCharCode(event.keyCode));
//	});
function fileEvent(){
	var keycode = 0;
	$(document).keydown(function(event){
		keycode = event.keyCode;
	});
	$(document).keyup(function(event){
		keycode = 0;
	});
	$(".FileList li").not(".listtitle").click(function(){
		if(keycode==17){//当按下Ctrl键时
			$(this).hasClass("active")?$(this).removeClass("active"):$(this).addClass("active");
		}else{
			$(this).addClass("active");
			$(this).siblings("li").removeClass("active");
		}
	}).dblclick(function(){//双击文件夹或文件
		if($(this).hasClass("folder")){
			window.location.href=$(this).data("href");
		}else{
			file_operations($(this).attr("id"),$(this).data("format"));
		}
	});
	//点击文件上的名称
	$(".FileList li span.text").click(function(){
		if($(this).closest("li").hasClass("folder")){
			window.location.href=$(this).closest("li").data("href");
		}else{
			file_operations($(this).closest("li").attr("id"),$(this).closest("li").data("format"));
		}
	});
}
//弹窗大小设置
function alertBox(){
	$(".alertBox").each(function(index, element) {
        var boxw = $(this).width();
		var boxh = $(this).height();
		var mask = $('<div class="mask"></div>');
		$(this).css({"margin-left":-boxw/2,"margin-top":-boxh/2});
		$("dt",this).height("32px");
		$("dd",this).height(boxh-34);
		if($(".mask").length < 1){
			$("body").append(mask);
			$(".mask").height($(window).height());
			$(".mask").width($(window).width());
		}
    });
}
//鼠标离开命名新建文件夹
function folderNamed(){
	$("#newfoldername").blur(function(){
		var self = $(this);
		var foldername = self.val();
		var returnto = newfolder(foldername);
		if(returnto == false){
			$("#samefile .close[data-alert='samefile']").click();
		}else{
			self.closest(".text").html(foldername);
		}
	});
}
//新建文件夹返回True之前，运行的函数
function truebefore(id,href){
	$("#filelist").html($("#filelist").html());
	var newf = $("#filelist ul li:eq(1)");
	newf.attr("id",id);
	newf.data("href",href);
	fileEvent();
	fun_contextMenu($('#filelist ul>li'));
}
