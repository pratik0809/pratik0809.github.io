function mobileViewUpdate() {
    var viewportWidth = $(window).width();

    if (viewportWidth < 375) {
      $("img#smug").css("display", "none");
      $("#subheading").css("padding-left", "15px");

    }

    if (viewportWidth < 415) {
    	$("ul").appendTo("#social");
    	/*$(".container-fluid").css("bottom", " ");
    	$(".container-fluid").css("position", " ");*/
      $("#smug").css("max-height", "450px");
      $("h2").css("font-size","2em");
    }


    if (viewportWidth > 374 && viewportWidth < 700) {
       $("ul").appendTo("#social");


       $(".site-footer").css("padding-top","0px");
       $("h2").css("margin-top", "0px");
       $("h2").css("margin-bottom", "10%");
       $("h1").css("margin-bottom", "0px");

    }
    else if (viewportWidth > 738) {
    	$("ul").appendTo("#subheading");
      $("img#smug").css("display", "inline");

    }
}

$(window).ready(mobileViewUpdate);
$(window).resize(function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(mobileViewUpdate, 250);
});
