function mobileViewUpdate() {
    var viewportWidth = $(window).width();
    
    if (viewportWidth < 415) {
    	$("ul").appendTo("#social");
    	$(".container-fluid").css("bottom", " ");
    	$(".container-fluid").css("position", " ");
    	$(".site-footer").css("padding-top","0px");
    	
    }


    if (viewportWidth > 415 && viewportWidth < 700) {
       $("ul").appendTo("#social");
       $(".container-fluid").css("bottom","128px");
       $(".site-footer").css("padding-top","0px");
       $(".container-fluid").css("position", "fixed");


    }
    else if (viewportWidth > 700) {
    	$("ul").appendTo("#subheading");
    	$(".container-fluid").css("bottom","110px");
    	$(".site-footer").css("padding-top","30px");
    	$(".container-fluid").css("position", "fixed");
    }
}

$(window).ready(mobileViewUpdate);
$(window).resize(mobileViewUpdate);
