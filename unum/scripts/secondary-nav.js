import $ from "jquery";

$(function(){
    let scrolled = true;

    const categoryHeadings = $(".category__heading");
    const categoryLinks = Array.prototype.slice.call(document.querySelectorAll(".willow-secondary-nav__link"));
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
            
            if(scrollTop == 0) {
                return 0;
            } else if(scrollTop >= (curr - 100)) {
                return index;
            } else if(scrollTop === scrollBottom) {
                return lastLinkIndex;
            } 
            return prev;

        }, -1);

        if(currentSection !== activeLinkIndex) {
            categoryLinks.forEach((link) => {
                link.dataset.linkActive = "false";
            });

            categoryLinks[currentSection].dataset.linkActive = "true";
        }
    }

    $(window).on("scroll", function(){
        scrolled = true;
    });

    categoryLinks.forEach((link) => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetHash = e.target.href.match(/.*#(.*)/)[1]; 
            const targetSection = $(`#${targetHash}`);

            //Add HTML for FF scroll animation
            $("body, html").animate({
                scrollTop:  targetSection.offset().top
            }, function() {
                window.location.hash = targetHash;
                
                categoryLinks.forEach((link) => {
                    link.dataset.linkActive = "false";
                });

                e.target.dataset.linkActive = "true";
            });
        });
    });
});