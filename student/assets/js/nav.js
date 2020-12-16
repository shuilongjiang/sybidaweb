
$(function() {
    var fadetimeM;
    $(".mod-header .nav .has-sub").hover(function() {
        var $this = $(this);
        var t = $(".mod-header").height() - $this.position().top;
        clearTimeout(fadetimeM);
        $this.find(".trigger").addClass("open");
        $this.siblings(".has-sub").find(".trigger").removeClass("open");
        $this.find(".sub-nav").stop().show().animate({
            "top": t,
            "opacity": "1"
        }, 200).css({
            "flter": "Alpha(Opacity=100)"
        });
        $this.siblings(".has-sub").find(".sub-nav").stop().animate({
            "top": t + 40,
            "opacity": "0"
        }, 200, function() {
            $(this).hide();
        }).css({
            "flter": "Alpha(Opacity=0)"
        });
    }, function() {
        var $this = $(this);
        var t = $(".mod-header").height() - $this.position().top;
        fadetimeM = setTimeout(function() {
            $this.find(".trigger").removeClass("open");
            $this.find(".sub-nav").stop().animate({
                "top": t + 40,
                "opacity": "0"
            }, 200, function() {
                $(this).hide();
            }).css({
                "flter": "Alpha(Opacity=0)"
            });
        }, 300);
    });

});

$(function() {

    $(window).scroll(function() {

        var h = $("body").height() - window.getHeight();
        //console.log(h);
        if ($(window).scrollTop() > 28 && h > 120) {
            $(".mod-header").addClass("is-fixed").find(".logo-txt").fadeOut(400);

        } else if ($(window).scrollTop() < 28) {
            $(".mod-header").removeClass("is-fixed").find(".logo-txt").fadeIn(400);

        }
    });

});

window.getHeight = function() {
    if (window.innerHeight != undefined) {
        return window.innerHeight;
    } else {
        var B = document.body
          , D = document.documentElement;
        return Math.min(D.clientHeight, B.clientHeight);
    }
}
