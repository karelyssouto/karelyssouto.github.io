(function($) {
    "use strict";
    //portfolio close button 
    $('.ic-close').on('click', function(event) {
        $('.worksajax div').slideUp('slow', function() {
            $('.worksajax div').remove();
			setTimeout("$.stellar('refresh');", 600); //refresh stellar alignment
        });
        return false;
		
    });

    $(".worksajax .slider").owlCarousel({
        navigation: true,
        navigationText: ['<span class="slide-nav inleft"><i class="fa fa-long-arrow-left"></i></span >', '<span class="slide-nav inright"><i class="fa fa-long-arrow-right"></i></span >'],
        slideSpeed: 800,
        autoPlay: true,
        pagination: false,
        paginationSpeed: 800,
        singleItem: true,
        transitionStyle: "fade"
    });

    // portfolio Video responsive
    $(".worksajax .video").fitVids();

    // script popup image
    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    //easing portfolio scrolling
    $('.ic-close').on('click', function(event) {
        var $anchor = $('#works');
		var menuheigt = $( ".for-sticky" ).height();
        $('html, body').stop().animate({
            scrollTop: $($anchor).offset().top - menuheigt
        }, 1000, 'linear');
        event.preventDefault();
    });


})(jQuery);