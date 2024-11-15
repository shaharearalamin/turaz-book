// expert section carousel slider
$(".expertSectionCarousel").owlCarousel({
    loop: true,
    autoplay:true,
    autoplayTimeout:3000,
  margin: 10,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 3,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});

// user section carousel slider
$(".userCarouselSlider").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  margin: 10,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});
