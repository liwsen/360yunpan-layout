/*!
 *Copyright www.amujz.com
 *Contact liwsen@sina.com
 *Date 2013-3-12
 */
// JavaScript Document
$(function() {
	//lazyload_img
	$(".Lazyload img").lazyload({placeholder : "cssframe/images/nopicture.gif",effect:"fadeIn"}); 
	//AutoTextarea
	fn_autoTextarea();
	//Form
	var originalvalue="";
	$("input[type='text'],input[type='password'],input[type='tel'],input[type='url'],input[type='email'],textarea").hover(
		function(){
			$(this).addClass("Hover").select();
		},
		function(){
			$(this).removeClass("Hover");
		}
	).focus(function(){
		if($(this).is(".DefaultValue")){
			originalvalue==''?originalvalue = $(this).val():'';
			if( $.trim($(this).val()) == originalvalue ){
				$(this).val('');
			}
		}
		$(this).addClass("Focus");
	}).blur(function(){
		if($(this).is(".DefaultValue")){
			if( $.trim($(this).val()) == '' ){
				$(this).val(originalvalue);
			}
		}
		$(this).removeClass("Hover").removeClass("Focus");
	});
	//Data-width
	datawidth();
});

//function
function fn_autoTextarea(){
	$(".AutoTextarea").each(function(index, element) {
		var str_length = $(this).val().split("\n").length;
		$(this).css({"overflow":"hidden","height":24*str_length});
		$(this).bind("paste cut keydown keyup focus blur",function(){
			var str = $(this).val();
			var arr = str.split("\n");
			var str_length = arr.length;
			var cols = $(this).width()/14;
			
			var aa='';
			for(var i=0;i<arr.length;i++){
				var add_cols = Math.floor(arr[i].length/cols);
				if(add_cols>0){
					str_length = str_length+add_cols;
				}
			}
			if(str_length>15){
				var str_length = 15;
				$(this).css({"overflow":"auto"});
			}else{
				$(this).css({"overflow":"hidden"});
			}
			$(this).css({"line-height":"24px","height":24*str_length});
		});
	});
}

function datawidth(){
	$("div[data-width]").each(function(index, element) {
		var width = $(this).attr("data-width")+"px";
        $(this).css({"width":width});
    });
}