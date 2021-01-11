(function($) {
    "use strict"
    jQuery(document).ready(function() {

        // Search Popup 
        var bodyOvrelay =  $('#body-overlay');
        var searchPopup = $('#search-popup');

        $(document).on('click','#body-overlay',function(e){
            e.preventDefault();
        bodyOvrelay.removeClass('active');
            searchPopup.removeClass('active');
        });
        $(document).on('click','#search',function(e){
            e.preventDefault();
            searchPopup.addClass('active');
        bodyOvrelay.addClass('active');
        });

        // Navbar fix  
        $(document).on('click','.navbar-area .navbar-nav li.menu-item-has-children>a',function(e){
            e.preventDefault();
        }) 

        // Hero Slider 
        $('.cropium-hero-slider').slick({
            dots: true,
            infinite: true,
            speed: 1200,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false,
        });

        // Feature Slider
        $('.feature-slider').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<i class="prev-arrow fa fa-long-arrow-left"></i>',
            nextArrow: '<i class="next-arrow fa fa-long-arrow-right"></i>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    }
                },
                    {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, 
            ]
        });

        // CounterUp 
        $('.counter').counterUp({
            delay: 10,
            time: 1500
        });

        // Pricing Tab 
        $(".tab-accordion ul li").on('click', function() {
            var tabClass = $(this).attr("class");
            $(this).addClass("active").siblings().removeClass("active");
            $("." + tabClass + "-content").addClass("active").siblings().removeClass("active");
        });

        // Video Play Button
        $('.video-play-button a').magnificPopup({
            type: 'iframe'
        }); 

        // Client Slider
        $('.client-slider').slick({
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: true,
            prevArrow: '<i class="prev-arrow fa fa-long-arrow-left"></i>',
            nextArrow: '<i class="next-arrow fa fa-long-arrow-right"></i>',
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    }
                },
            ]
        });

        // Blog Slider
        $('.blog-slider').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<i class="prev-arrow fa fa-long-arrow-left"></i>',
            nextArrow: '<i class="next-arrow fa fa-long-arrow-right"></i>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    }
                },
                    {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, 
            ]
        });

        // Service Slider
        $('.service-slider').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<i class="prev-arrow fa fa-long-arrow-left"></i>',
            nextArrow: '<i class="next-arrow fa fa-long-arrow-right"></i>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    }
                },
                    {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, 
            ]
        });
        
        // Brand Slider
        $('.brand-slider').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: false,
                    }
                },
                    {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, 
            ]
        });

        // Case Study Slider
        $('.case-study-slider').slick({
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<i class="prev-arrow fa fa-long-arrow-left"></i>',
            nextArrow: '<i class="next-arrow fa fa-long-arrow-right"></i>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    }
                },
                    {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, 
            ]
        });

        // Client Slider Home 
        $('.client-slider-home-2').slick({
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }, 
            ]
        });

        // Service Details Tab 
        $(".service-widget-tab ul li").on('click', function() {
            var tabClass = $(this).attr("class");
            $(this).addClass("active").siblings().removeClass("active");
            $("." + tabClass + "-content").addClass("active").siblings().removeClass("active");
        });


    });

    jQuery(window).on('load', function() {

        // WOW JS
        new WOW().init();

        // Preloader
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

    });
})(jQuery);
