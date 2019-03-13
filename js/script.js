(function($) {
    "use strict";


    $(window).on("load", function() { // makes sure the whole site is loaded
        //preloader
        $("#status").fadeOut(); // will first fade out the loading animation
        $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website. 



        //move to hash after loading
        if (window.location.hash) {
            var menuheigt = $(".for-sticky").height();
            $('html, body').stop().animate({
                scrollTop: $(window.location.hash).offset().top - menuheigt
            }, 300, 'linear');
        }




    });

    //slider homepage setting
    if ($('.home-slider').find('.slide').length > 1) {

        $(".home-slider").owlCarousel({
            navigation: false,
            slideSpeed: 300,
            autoplay: true,
            autoHeight: true,
            pagination: true,
            paginationSpeed: 300,
            singleItem: true,
            transitionStyle: "fade"
        });
    }

    //slider in team
    if ($('.team-slider').find('.team-box').length > 2) {

        $(".team-slider").owlCarousel({
            navigation: true,
            navigationText: ['<span class="slide-nav inleft"><i class="fa fa-long-arrow-left"></i></span >', '<span class="slide-nav inright"><i class="fa fa-long-arrow-right"></i></span >'],
            slideSpeed: 300,
            stopOnHover: true,
            autoplay: true,
            autoHeight: true,
            pagination: true,
            paginationSpeed: 300,
            singleItem: false,
            transitionStyle: "fade",
            items: 2,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [768, 1],
        });
    }

    //slider in client
    if ($('.client-slider').find('div').length > 4) {

        $(".client-slider").owlCarousel({
            navigation: false,
            slideSpeed: 300,
            autoplay: true,
            autoHeight: true,
            pagination: false,
            paginationSpeed: 300,
            singleItem: false,
            transitionStyle: "fade",
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
        });
    }




    //about slider setting
    if ($('.about-slider').find('.slide').length > 1) {
        $(".about-slider").owlCarousel({
            navigation: false, // Hide next and prev buttons
            slideSpeed: 300,
            autoplay: true,
            autoHeight: true,
            pagination: false,
            paginationSpeed: 300,
            singleItem: true,
            transitionStyle: "fade"
        });
    }

    //post slider setting
    if ($('.post-slider').find('.slide').length > 1) {
        $(".post-slider").owlCarousel({
            navigation: false, // Hide next and prev buttons
            slideSpeed: 300,
            autoplay: true,
            autoHeight: true,
            pagination: false,
            paginationSpeed: 300,
            singleItem: true,
            transitionStyle: "fade"
        });
    }


    // script popup image
    $('.popup-img').magnificPopup({
        type: 'image'
    });
    //replace the data-background into background image
    $(".img-bg").each(function() {
        var imG = $(this).data('background');
        $(this).css('background-image', "url('" + imG + "') "

        );
    });

    //create menu for tablet/mobile
    $(".menu-box .navigation").clone(false).find("ul,li").removeAttr("id").remove(".sub-menu").appendTo($(".mobile-menu"));
    $(".mobile-menu .sub-menu").remove();
    $('.mobile-menu').on('show.bs.collapse', function() {
        $('body').on('click', function() {
            $('.mobile-menu').collapse('hide');
        })
    })

    //toggle menu
    $('.menu-btn').on('click', function() {
        $('.mobile-menu').collapse({
            toggle: false
        });
    })




    //menu for tablet/mobile,slider button, about button scrolling
    $('.mobile-menu a,.sl-btn,.ab-btn').on('click', function() {
        var $anchor = $(this);
        var menuheigt = $(".for-sticky").height();
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - menuheigt
        }, 800, 'linear');
    });


    //Page scrolling
    var menuheigt = $(".for-sticky").height();
    $('.home-section .menu-box .navigation').onePageNav({
        filter: ':not(.external)',
        scrollThreshold: 0.25,
        scrollOffset: menuheigt
    });

    //sticky navigation
    $(".for-sticky").sticky({
        topSpacing: 0
    });

    // Video responsive
    $("body").fitVids();


    if (Modernizr.touch) {
        //add class on touch device
        $('body').addClass('no-para');
    } else {
        //stellar/parallax trigger
        $(window).stellar({
            horizontalScrolling: false,
            hideDistantElements: false,
            responsive: true
        });
    }

    //script for navigation(superfish)
    $('.menu-box ul').superfish({
        delay: 400, //delay on mouseout
        animation: {
            opacity: 'show',
            height: 'show'
        }, // fade-in and slide-down animation
        animationOut: {
            opacity: 'hide',
            height: 'hide'
        },
        speed: 200, //  animation speed
        speedOut: 200,
        autoArrows: false // disable generation of arrow mark-up
    })

    //portfolio ajax & scroll on click
    $('.port-ajax').on('click', function() {

        //portfolio ajax setting
        var toLoad = $(this).attr('data-link') + ' .worksajax > *';
        $('.worksajax').slideUp('slow', loadContent);

        function loadContent() {
            $('.worksajax').load(toLoad, '', showNewContent)
        }

        function showNewContent() {
            $.getScript("js/portfolio.js");
            $('.worksajax').slideDown('slow');
            $.stellar('refresh'); //refresh stellar alignment
        }


        //portfolio scrolling
        var menuheigt = $(".for-sticky").height();
        $('html, body').stop().animate({
            scrollTop: $('#works').offset().top - menuheigt

        }, 1000, 'linear');
        return false;
    });



    //background ticker (testimonial)
    $('.big-ticker:has(>div:eq(1))').list_ticker({
        speed: 7000,
        effect: 'fade'
    });

    //isotope setting(portfolio)
    var $container = $('.portfolio-body');
    $container.imagesLoaded(function() {
        $container.isotope();
    });

    //isotope setting(team)
    var $tbody = $('.team-body');
    $tbody.imagesLoaded(function() {
        $tbody.isotope();
    });

    //isotope on window resize
    $(window).on('resize', function() {
        $('.portfolio-body,.team-body').isotope('reLayout');
    });

    // filter items when filter link is clicked
    $('.port-filter a').on('click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            itemSelector: '.port-item',
            filter: selector
        });
        return false;
    });

    //adding active state to portfolio filtr
    $(".port-filter a").on('click', function() {
        $(".port-filter a").removeClass("active");
        $(this).addClass("active");
		setTimeout("$.stellar('refresh');", 600); //refresh stellar alignment
		
    });

    //button scroll
    $('.spc-btn,.go-btn').on('click', function(event) {
        var $anchor = $(this);
        var menuheigt = $(".for-sticky").height();
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - menuheigt
        }, 800, 'linear');
        event.preventDefault();
    });

    //google map load
    $('#map_canvas').gmap({
        'center': '-6.94010,107.62575',
        'zoom': 15,
        scrollwheel: false,
        'disableDefaultUI': false,
        'styles': [{
            stylers: [{
                lightness: 7
            }, {
                saturation: -100
            }]
        }],
        'callback': function() {
            var self = this;
            self.addMarker({
                    'position': this.get('map').getCenter(),
                    icon: 'images/office-building.png',
                })
        }
    });

    //typed jquery
    var typed = new Typed('.personal-color', {
        strings: ["Dance", "Creat", "Code", "Design", "Work", ],
        typeSpeed: 120,
        smartBackspace: true,
        backDelay: 500,
        loop: true,
        showCursor: false
    });

    //skill progress bar
    $('.progress .progress-bar').waypoint(function(direction) {
        $('.progress .progress-bar').each(function() {
            $('.progress .progress-bar').css("width",
                function() {
                    return $(this).attr("aria-valuenow") + "%";
                }
            )
        });
    }, {
        offset: 'bottom-in-view',
        triggerOnce: true
    });



})(jQuery);