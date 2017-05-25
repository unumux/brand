import $ from "jquery";

$(function(){
    let scrolled = true;

    const categoryHeadings = $(".category__heading");
    const categoryLinks = $(".secondary-nav__link");
    let activeLinkIndex = -1;

    function getHeadingPositions() {
        return $.map(categoryHeadings, function(heading) {
            return $(heading).offset().top;
        });
    }

    function animationFrame() {
        if(scrolled) {
            updateActiveLink();
            scrolled = false;
        }
        requestAnimationFrame(animationFrame);
    }
    requestAnimationFrame(animationFrame); 

    function updateActiveLink() {
        let categoryHeadingPositions = getHeadingPositions();
        //Changed body to window for FF
        const scrollTop = $(window).scrollTop();
        const scrollBottom = $(document).height() - $(window).height();
        const lastLinkIndex = categoryLinks.length - 1;
    
        const currentSection = categoryHeadingPositions.reduce(function(prev, curr, index) {
            if(scrollTop === scrollBottom) {
                return lastLinkIndex;
            } else if(scrollTop >= (curr - 100)) {
                return index;
            }
            return prev;
        }, -1);
        if(currentSection !== activeLinkIndex) {
            categoryLinks.attr("data-link-active", false);
            categoryLinks.eq(currentSection).attr("data-link-active", true);
            // categoryLinks.removeClass("willow-secondary-nav__link--active").addClass("willow-secondary-nav__link");
            // categoryLinks.eq(currentSection).removeClass("willow-secondary-nav__link").addClass("willow-secondary-nav__link--active");
        }
    }

    $(window).on("scroll", function(){
        scrolled = true;
    });

    categoryLinks.on("click", function(e) {
        e.preventDefault();
        const targetHash = e.target.href.match(/.*#(.*)/)[1]; 
        const targetSection = $(`#${targetHash}`);

        //Add HTML for FF scroll animation
        $("body, html").animate({
            scrollTop:  targetSection.offset().top
        }, function() {
            window.location.hash = targetHash;
            categoryLinks.attr("data-link-active", false);
            $(e.target).attr("data-link-active", true);
            // categoryLinks.removeClass("willow-secondary-nav__link--active").addClass("willow-secondary-nav__link");
            // $(e.target).removeClass("willow-secondary-nav__link").addClass("willow-secondary-nav__link--active");
        });
    });
});