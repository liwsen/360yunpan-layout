// JavaScript Document
function TestTip(msgs,_width,_height,_timeout){
	_width = _width==''?"300":_width;
	_height = _height==''?"100":_height;
	_timeout = _timeout==''?"2000":_timeout;
	if(msgs!=''){
		var box = "<div class='TestTip'>"+msgs+"</div>";
		$("body").append(box);
		$(".TestTip").css({"width":_width,"height":_height,"border":"3px solid #F90","padding":"17px","margin-left":-(_width/2+20)+"px","margin-top":-(_height/2+20)+"px","background-color":"rgba(255,255,255,0.85)","opacity":"0","color":"#F00","text-align":"center","font-size":"18px","font-weight":"bold","overflow":"hidden","position":"fixed","left":"50%","top":"50%","z-index":"999999","box-shadow":"0 0 12px #999","-moz-box-shadow":"0 0 12px #999","-webkit-box-shadow":"0 0 12px #999","border-radius":"8px","-moz-border-radius":"8px","-webkit-border-radius":"8px"});
		$(".TestTip").animate({opacity:"1"},500,"",function(){
			setTimeout("thisout()",_timeout);
		});
	}
}
function thisout(){
	$(".TestTip").animate({opacity:"0",marginTop:"-500px"},300,"",function(){
		$(this).remove();
	});
}