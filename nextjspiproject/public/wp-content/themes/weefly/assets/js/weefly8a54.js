(function($) {

    'use strict';



    new WOW().init();

    /*-----------------------------------------

       Mobile Navigation and Child Trigger

    ------------------------------------------*/
    // nav fix
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('header').addClass('fixed');
            $('.wd-top-nav').addClass('d-none');
        } else {
            $('header').removeClass('fixed');
            $('.wd-top-nav').removeClass('d-none');
        }
    });
    $(document).ready(function() {
        $('#cssmenu li.has-sub>a').on('click', function() {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            } else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });

        $('#cssmenu>ul>li.has-sub>a').append('<span class="holder"></span>');


    });

    $('#menu-mobile-menu li.menu-item-has-children > a').after('<div class="child-trigger"><i></i></div>');



    $('#nav-toggle-label, #nav-toggle-label2, .mobile-trigger').on('click', function() {

        $('body').toggleClass('mobile-open');

        $('.child-trigger').removeClass('child-open');

        $('.mobile-menu .sub-menu').slideUp(250);

        return false;

    });



    $('.mobile-trigger2').on('click', function() {

        $('body').toggleClass('mobile-open-2');

        $('.child-trigger').removeClass('child-open');

        $('.mobile-menu .sub-menu').slideUp(250);

        return false;

    });



    $('.child-trigger').on('click', function() {

        var $parent = $(this).parent().siblings('#menu-mobile-menu li.menu-item-has-children');

        $parent.find('.child-trigger').removeClass('child-open');

        $parent.find('.sub-menu').slideUp(250);



        $(this).next('.sub-menu').slideToggle(250);

        $(this).toggleClass('child-open');

        return false;

    });




    /*-----------------------------------------

       Next to Section

    ------------------------------------------*/

    jQuery.fn.extend({

        scrollTo: function(speed, easing) {

            return this.each(function() {

                var targetOffset = $(this).offset().top;

                $('html,body').animate({
                    scrollTop: targetOffset
                }, speed, easing);

            });

        }

    });



    $('.next-section').click(function(e) {

        e.preventDefault();

        var $this = $(this),

            $next = $this.parent().next();



        $next.scrollTo(1000, 'linear');

    });



    if ($('#preloader-wrap').length > 0) {

        $(window).on('load', function() {

            $('#preloader-wrap').fadeOut();

        })

    }


    /*-----------------------------------------

       Slick Slider

    ------------------------------------------*/

    //%%%%%% weefly %%%%%%//

    // Banner Slider  //



    $('.wd-hero-slider').slick({

        draggable: true,

        autoplay: true,

        autoplaySpeed: 3000,

        arrows: false,

        dots: true,

        fade: true,

        speed: 500,

        infinite: true,

        cssEase: 'ease-in-out',

        touchThreshold: 100

    });



    //Product-slider


    $('.wd-shop-product-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrow: true,
        prevArrow: $('.wd-shop-product-left-arrow'),
        nextArrow: $('.wd-shop-product-right-arrow'),
        dots: false,
        asNavFor: '.wd-shop-slider-main',
        centerPadding: '0px',
        centerMode: true,
        autoplay: true,
        speed: 1000,
        focusOnSelect: true,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,

                    arrow: false,
                }
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            }

        ]
    });

    $('.wd-shop-slider-main').slick({
        slidesToShow: 1,
        speed: 1000,
        arrows: false,
        asNavFor: '.wd-shop-product-slider'
    });
    // home-blog-slider
    $('.home-blog-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        dots: false,
        infinite: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
            }
        }]
    });
    // home-blog-slider
    $('.home-products-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 100000,
        infinite: true,
        focusOnSelect: true,
    });

    $('.related-blogs').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        dots: false,
        infinite: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
            }
        }]
    });

    //Shop Assesories Slider

    $('.slider-shop-accer').slick({

        slidesToShow: 4,

        slidesToScroll: 1,

        dots: false,

        centerPadding: '9px',

        centerMode: false,

        arrows: true,

        prevArrow: $('.wd-product-bottom-left-arrow'),

        nextArrow: $('.wd-product-bottom-right-arrow'),

        focusOnSelect: true,

        responsive: [{

                breakpoint: 1200,

                settings: {

                    slidesToShow: 3,

                    slidesToScroll: 1,

                    dots: false,

                    arrows: false

                }

            },

            {

                breakpoint: 991,

                settings: {

                    slidesToShow: 2,

                    slidesToScroll: 1,

                    dots: false,

                    arrows: false

                }

            },

            {

                breakpoint: 768,

                settings: {

                    slidesToShow: 2,

                    slidesToScroll: 1,

                    dots: false,

                    arrows: false

                }

            },



            {

                breakpoint: 568,

                settings: {

                    slidesToShow: 1,

                    slidesToScroll: 1,

                    dots: false,

                    arrows: false

                }

            }

        ]

    });




    //about Testimonial Slider

    $('.slider-about-page').slick({

        dots: false,

        infinite: true,

        speed: 300,

        fade: true,

        arrows: false,

        cssEase: 'linear'

    });



    //Shop Details Slider

    $('.wd-shop-des-slider-for').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        arrows: true,

        infinite: true,

        centerMode: false,

        fade: true,

        asNavFor: '.wd-shop-des-slider-nav'

    });



    $('.wd-shop-des-slider-nav').slick({

        slidesToShow: 2,

        slidesToScroll: 1,

        asNavFor: '.wd-shop-des-slider-for',

        arrows: false,

        infinite: true,

        focusOnSelect: true,

        responsive: [

            {

                breakpoint: 768,

                settings: {

                    slidesToShow: 2,

                    slidesToScroll: 1,

                    arrows: false,

                    infinite: true,

                    focusOnSelect: true

                }

            }

        ]

    });

    /*----------- Our team slider -----------*/


    $('.our-team-wrap-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });



    // Index Page:- For Banner Section //

    $('#banner-1 .banner-area').slick({

        infinite: true,

        speed: 300,

        dots: true,

    });



    // Index Page:- For Product Section //



    $('.product-main-slider').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        arrows: false,

        fade: true,

        asNavFor: '.product-slider'

    });



    $('.product-slider').slick({

        slidesToShow: 4,

        slidesToScroll: 1,

        asNavFor: '.product-main-slider',

        dots: false,

        centerMode: false,

        focusOnSelect: true,

        responsive: [{

                breakpoint: 1200,

                settings: {

                    slidesToShow: 3,

                    slidesToScroll: 1,

                    dots: false

                }

            }, {

                breakpoint: 991,

                settings: {

                    slidesToShow: 3,

                    slidesToScroll: 1,

                    dots: false

                }

            },

            {

                breakpoint: 768,

                settings: {

                    slidesToShow: 1,

                    slidesToScroll: 1

                }

            }



        ]

    });



    // Index Page:- For Strain Section //



    $('.product-details').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        arrows: false,

        fade: true,

        dots: false,

        centerMode: false,

        focusOnSelect: true,

        asNavFor: '.product-list'

    });



    $('.product-list').slick({

        slidesToShow: 3,

        slidesToScroll: 1,

        asNavFor: '.product-details',

        dots: false,

        centerMode: true,

        focusOnSelect: true,

        responsive: [{

                breakpoint: 767,

                settings: {

                    slidesToShow: 3,

                    slidesToScroll: 1,

                    dots: false

                }

            },

            {

                breakpoint: 479,

                settings: {

                    slidesToShow: 1,

                    slidesToScroll: 1

                }

            }

        ]

    });



    // Blog Page:- For Related Articles Section //



    $('.related-post').slick({

        centerMode: true,

        dots: false,

        centerPadding: '0',

        slidesToShow: 3,

        responsive: [{

                breakpoint: 767,

                settings: {

                    arrows: false,

                    centerMode: false,

                    centerPadding: '0',

                    slidesToShow: 1,

                    dots: false,

                    infinite: true,

                    adaptiveHeight: true

                }

            },

            {

                breakpoint: 480,

                settings: {

                    arrows: false,

                    centerMode: false,

                    centerPadding: '0',

                    slidesToShow: 1,

                    adaptiveHeight: true

                }

            }

        ]

    });



    // Shop Detail:- For Product Section //



    $('.shop-detail-slider-top').slick({

        slidesToShow: 1,

        arrows: false,

        fade: true,

        asNavFor: '.shop-detail-slider-btm'

    });



    $('.shop-detail-slider-btm').slick({

        slidesToShow: 3,

        slidesToScroll: 1,

        asNavFor: '.shop-detail-slider-top',

        dots: false,

        centerPadding: '9px',

        centerMode: false,

        focusOnSelect: true,

        responsive: [{

                breakpoint: 991,

                settings: {

                    slidesToShow: 3,

                    slidesToScroll: 1,

                    dots: false

                }

            },

            {

                breakpoint: 768,

                settings: {

                    slidesToShow: 1,

                    slidesToScroll: 1

                }

            }



        ]

    });



    // Shop Detail:- For Related Products Section //



    $('.related-pro-container, .simple-slider').slick({

        centerMode: false,

        dots: false,

        infinite: true,

        centerPadding: '10px',

        slidesToShow: 4,

        responsive: [{

                breakpoint: 991,

                settings: {

                    centerMode: false,

                    centerPadding: '0',

                    slidesToShow: 3,

                    dots: false,

                    infinite: true,

                    adaptiveHeight: true

                }

            },

            {

                breakpoint: 767,

                settings: {

                    centerMode: false,

                    centerPadding: '0',

                    slidesToShow: 1,

                    adaptiveHeight: true

                }

            }

        ]

    });



    $('.blog-related-product').slick({

        centerMode: false,

        dots: false,

        centerPadding: '10px',

        slidesToShow: 3,

        responsive: [{

                breakpoint: 991,

                settings: {

                    centerMode: false,

                    centerPadding: '0',

                    slidesToShow: 3,

                    dots: false,

                    infinite: true,

                    adaptiveHeight: true

                }

            },

            {

                breakpoint: 767,

                settings: {

                    centerMode: false,

                    centerPadding: '0',

                    slidesToShow: 1,

                    adaptiveHeight: true

                }

            }

        ]

    });




    //Hover Mega Menu Navigation

    $('.nav-tabs-menu > li').mouseover(function() {

        $(this).find('a').click();

    });

    $('.nav-tabs-menu > li').mouseout(function() {

        $(this).find('a').click();

    });




    /*-----------------------------------------

           Video

        ------------------------------------------*/


    jQuery('.popup-youtube').magnificPopup({

        type: 'iframe'

    });

    jQuery('.popup-vimeo').magnificPopup({

        type: 'iframe'

    });

    jQuery('.popup-video').magnificPopup({

        type: 'iframe'

    });




    /*-------------------------------------------------------------------------------

          Quantity Add/Subtract

        -------------------------------------------------------------------------------*/

    $(function() {



        $('.weight-btn-2').on('click', function() {

            event.preventDefault();

            var holdText = $(this).html();

            var unit = $(this).data('unit');

            $('#unit').html(unit);

            $('#weight-btn').html(holdText);

        });



        $(".buttonDecimal").on('click', function() {

            var $buttonDecimal = $(this);

            var oldValue = $buttonDecimal.parent().find("input").val();

            if ($buttonDecimal.find('i').hasClass('fa-plus')) {

                var newVal = parseFloat(oldValue) + 0.1;

            } else {

                if (oldValue >= 0.1) {

                    var newVal = parseFloat(oldValue) - 0.1;

                } else {

                    var newVal = 0;

                }

            }



            $buttonDecimal.parent().find("input").val(Math.round((newVal * 100)) / 100);

        });



    });



    /*------------------------------------------------------------------

		back to top

	-------------------------------------------------------------------*/

    var offset = 220;

    var duration = 500;

    $(window).on('scroll', function() {

        if ($(this).scrollTop() > offset) {

            $('.back-top').fadeIn(duration);

        } else {

            $('.back-top').fadeOut(duration);

        }

    });



    $('.back-top').on('click', function(event) {

        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, "slow");

        return false;

    });



    if ($(window).scrollTop() > offset) {

        $('.back-top').fadeOut(0);

    }

    $('a[href="#"]').click(function(e) {

        e.preventDefault ? e.preventDefault() : e.returnValue = false;

    });



    /*-------------------------------------------------------------------------------

        Range Slider | Shop sidebar Page

    -------------------------------------------------------------------------------*/

    $(".js-range-slider2").ionRangeSlider({

        type: "double",

        skin: "round",

        hide_min_max: true,

        min: 0,

        max: 100,

        from: 0,

        to: 100,

        grid: false,

        postfix: "%"

    });



    $(".js-range-slider3").ionRangeSlider({

        type: "double",

        skin: "round",

        hide_min_max: true,

        min: 0,

        max: 1000,

        from: 1,

        to: 1000,

        grid: false,

        prefix: "$"

    });



    $(".js-range-slider").ionRangeSlider({

        type: "double",

        skin: "round",

        hide_min_max: true,

        min: 0,

        max: 1000,

        from: 1,

        to: 1000,

        grid: false,

        prefix: "$"

    });



    $(".js-range-slider4").ionRangeSlider({

        type: "double",

        skin: "round",

        hide_min_max: true,

        min: 5,

        max: 1000,

        from: 5,

        to: 1000,

        grid: false,

        postfix: "$"

    });



    /*-------------------------------------------------------------------------------

              Perfect Scrollbar Js

            -------------------------------------------------------------------------------*/

    $(".pop-scroll").each(function() {

        const ps = new PerfectScrollbar($(this)[0]);

    });

    // gallery
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });



    /*-------------------------------------------------------------------------------

      Quantity Increment | Shop Details Page

    -------------------------------------------------------------------------------*/



    var quantitiy = 0;

    $('.quantity-right-plus').on('click', function(e) {



        // Stop acting like a button

        e.preventDefault();

        // Get the field name

        var quantity = parseInt($('#quantity').val());



        // If is not undefined



        $('#quantity').val(quantity + 1);



    });



    $('.quantity-left-minus').on('click', function(e) {



        // Stop acting like a button

        e.preventDefault();

        // Get the field name

        var quantity = parseInt($('#quantity').val());



        // Increment

        if (quantity > 0) {

            $('#quantity').val(quantity - 1);

        }



    });

    /*-------------------------------------------------------------------------------

              Thc and cbd level Js

            -------------------------------------------------------------------------------*/

    $('.wd-progress').each(function() {

        var number = $(this).children('.progress-bg').data('number');



        if ($.isNumeric(number)) {

            var truenumber = number;

            $(this).parent().children('.thc-label-wrpr').find('.thc-label').html(truenumber + "%");

        } else {

            var nonumber = "Null";

            $(this).parent().children('.thc-label-wrpr').find('.thc-label').html(nonumber);

        }



        if (number > 100) {

            var lnumber = 100;

            $(this).children('.progress-bg').css('width', lnumber + '%');



        } else {

            $(this).children('.progress-bg').css('width', number + '%');

        }



    });
    /*-------------------------------------------------------------------------------
          Products Check
        -------------------------------------------------------------------------------*/

    $('.tick-type').on('click', function() {

        $(this).toggleClass('checked');

    });

    /*-------------------------------------------------------------------------------
  	  Quantity Add/Subtract
	-------------------------------------------------------------------------------*/
  $(document).on('click', '.plus',  function () {
  	$(this).prev().val(+$(this).prev().val() + 1);
    var qty = $(this).prev().val();

    $(this).prev().attr('value', qty);
    if(qty > 1) {$("[name='update_cart']").removeAttr('disabled');}
    else{$("[name='update_cart']").attr('disabled');}

    $('.hm-add-to-cart').attr('data-quantity', qty);
  });

  $(document).on('click', '.minus', function () {
		if ($(this).next().val() > 1) {
    	if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
      var qtyminus = $(this).next().val();


      $(this).next().attr('value', qtyminus);
      if(qtyminus < 1) {$("[name='update_cart']").attr('disabled', 'disabled');}
      else{$("[name='update_cart']").removeAttr('disabled');}

    $('.hm-add-to-cart').attr('data-quantity', qtyminus);
		}
  });

    /*-------------------------------------------------------------------------------
       Tooltop Js
      -------------------------------------------------------------------------------*/
    $(function() {

        $('[data-toggle="tooltip"]').tooltip();

    });

    /*------ Blog gallery slider Js ---------*/
    $('.blog-slider').slick({
        draggable: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: false,
        speed: 800,
        infinite: true,
        cssEase: 'ease-in-out',
        touchThreshold: 100
    });

    $('.blog-details-slider').slick({
        draggable: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: false,
        speed: 800,
        infinite: true,
        cssEase: 'ease-in-out',
        touchThreshold: 100
    });
    $('.wd-catg-slider-roll').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrow: false,
        dots: false,
        centerPadding: '9px',
        centerMode: false,
        focusOnSelect: true,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            },

            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            }

        ]
    });

})(jQuery);


jQuery(function() {

    jQuery('.woocommerce-product-gallery__image a').on("click", function(e) {

        e.preventDefault();

    });
    // nice selct
    jQuery(document).ready(function() {
        jQuery('select.custom-select').niceSelect();
    });
    baguetteBox.run('.popup-gallery');

});
