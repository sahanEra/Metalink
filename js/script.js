'use strict';

/*====================
add event on element
====================*/
const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (var i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
}



/*====================
    toggle navbar
====================*/
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);


const closeNavbar = function () {
    navbar.classList.remove("active");
    navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/*====================
    header active
====================*/
const header = document.querySelector("[data-header]");

addEventOnElem(window, "scroll", function () {
    if (window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
})



/*====================
       slider
====================*/
const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {
    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-item"));
    const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    var currentSlidePos = 0;

    const moveSliderItem = function () {
        sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    //next slide
    const slideNext = function () {
        const slidEnd = currentSlidePos >= totalSliderItems;

        if (slidEnd) {
            currentSlidePos = 0;
        } else {
            currentSlidePos++;
        }

        moveSliderItem();
    }

    addEventOnElem(sliderNextBtn, "click", slideNext);

    //prev slide
    const slidePrev = function () {
        if (currentSlidePos <= 0) {
            currentSlidePos = totalSliderItems;
        } else {
            currentSlidePos--;
        }

        moveSliderItem();
    }

    addEventOnElem(sliderPrevBtn, "click", slidePrev);

    const dontHaveExtraItem = totalSliderItems <= 0;
    if (dontHaveExtraItem) {
        sliderPrevBtn.setAttribute("disabled", "");
        sliderNextBtn.setAttribute("disabled", "");
    }

    //auto slide 
    var autoSlideInterval;

    const startAutoSlide = () => autoSlideInterval = setInterval(slideNext, 3000);
    startAutoSlide();

    const stopAutoSlide = () => clearInterval(autoSlideInterval);
    addEventOnElem(currentSlider, "mouseover", stopAutoSlide);
    addEventOnElem(currentSlider, "mouseout", startAutoSlide);

    //responsive
    addEventOnElem(window, "rezize", moveSliderItem);
}

for (var i = 0, len = sliders.length; i < len; i++) {
    sliderInit(sliders[i]);
}



/*====================
    Accordion
====================*/
const accordions = document.querySelectorAll("[data-accordion]");
var lastActiveAccordion;

const accordionInit = function (currentAccordion) {
    const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

    addEventOnElem(accordionBtn, "click", function () {
        if (currentAccordion.classList.contains("active")) {
            currentAccordion.classList.toggle("active");
        } else {
            if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
            currentAccordion.classList.add("active");
        }

        lastActiveAccordion = currentAccordion;
    });
}

for (let i = 0, len = accordions.length; i < len; i++) { accordionInit(accordions[i]); }



/*====================
    Back to top
====================*/
const backToTopBtn = document.querySelector("[data-back-to-top-btn]");

addEventOnElem(window, "scroll", function () {
    if (window.scrollY > 150) {
        backToTopBtn.classList.add("active");
    } else {
        backToTopBtn.classList.remove("active");
    }
})