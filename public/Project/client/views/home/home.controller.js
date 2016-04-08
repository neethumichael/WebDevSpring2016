/**
 * Created by neethu on 4/7/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("HomeController", HomeController);

    function HomeController() {
        $('.myCarousel').carousel ({
            interval: 5000,
            pause: "hover",
            wrap: true
        })
            .on('click', '.carousel-control', handle_nav);

        var handle_nav = function(e) {
            e.preventDefault();
            var nav = $(this);
            nav.parents('.carousel').carousel(nav.data('slide'));
        }
    }}());
