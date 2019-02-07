/*global $,owl,smoothScroll,WOW*/
$(document).ready(function () {
    "use strict";


    /* ---------------------------------------------
     Mix it up
    --------------------------------------------- */

    $('#mixContainer').mixItUp({
        load: {
            filter: '.product-off'
        }
    });

    /*Products*/
    $('#mixProducts').mixItUp({

    });
    
    
    /*Profile*/
$('#mixProfile').mixItUp({
load: {
            filter: '.orders'
        }
    });
    
    
    

    /* ---------------------------------------------
     Owl Carousel
    --------------------------------------------- */
    $('#customerCarousel').owlCarousel({
        loop: true,
        nav: true,
        navText: ["", ""],
        rewindNav: true,
        dots: false,
        rtl: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })



    /* ---------------------------------------------
     Loader Screen
    --------------------------------------------- */
    $(window).load(function () {
        $("body").css('overflow-y', 'auto');
        $('#loading').fadeOut(1000);
    });


    //for smoth scroll
    smoothScroll.init({
        speed: 800,
        updateURL: false,
        offset: 85
    });

    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true,
        offset: 0,
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();



    /* ---------------------------------------------
     Scrool To Top Button Function
    --------------------------------------------- */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".toTop").css("right", "20px");
        } else {
            $(".toTop").css("right", "-60px");
        }
    });

    $(".toTop").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });


    //customize the header
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.main-head').addClass('sticky');
            $('.divider').css('display', 'none');
        } else {
            $('.main-head').removeClass('sticky');
            $('.divider').css('display', 'block');
        }
    });

    $('.side-nav').mCustomScrollbar({
        autoHideScrollbar: false,
        setTop: 0,
        scrollInertia: 50,
        theme: "light-1"
    });

    $('.open-sidebar').on('click', function () {
        $('.sidebar').toggleClass('opened');
        $('.overlay_gen').fadeIn();
        $('body').addClass('sided');
    });

    $('.overlay_gen').on('click', function () {
        $('.sidebar').toggleClass('opened');
        $('.overlay_gen').fadeOut();
        $('body').removeClass('sided');
    });
    // FancyBox Initialize
    $(".fancybox").fancybox({
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
    //    mixItUp Plugin Initilize
    //    if ($('.gallery-box').length) {
    //        $('.gallery-box').mixItUp();
    //    }
    //
    //    $('.gallery-filters li').on("click", function () {
    //        $(this).addClass('active').siblings().removeClass('active');
    //    });

});
