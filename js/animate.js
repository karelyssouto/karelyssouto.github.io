(function($) {
    "use strict";
    if (!Modernizr.touch) {

        $.fn.queued = function() {
            var self = this;
            var func = arguments[0];
            var args = [].slice.call(arguments, 1);
            return this.queue(function() {
                $.fn[func].apply(self, args);
            });
        }

        //animate css
        $(window).on("load", function() { // makes sure the whole site is loaded
            $('.animated').each(function() {

                var self = $(this);

                $(this).waypoint(function(direction) {
                    self.each(function() {
                        var Animated = $(this).data('animated');
                        if ($(this).data('animated')) {
                            //change the class based on data-animated value
                            $(this).queued('addClass', Animated);
                            //remove all animated class to make it works better with isotope plugin

                            setTimeout(function() {
                                self.removeClass('animated').removeClass(Animated);
                            }, 3000);
                        } else {
                            self.removeClass('animated')
                        }
                    });
                }, {
                    offset: '95%',
                    triggerOnce: true
                });
            });

        });



    } else {
        $(window).on("load", function() { // makes sure the whole site is loaded
            $('.animated').each(function() {
                $(this).removeClass('animated');
            });
        });
    }
})(jQuery);