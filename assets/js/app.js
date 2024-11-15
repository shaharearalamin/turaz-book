// navbar dropdown
$(function () {
  // DropDown toggle and hover effect er jonne
  $(".dropDown").hover(
    function () {
      $(this).find("span svg").css("transform", "rotate(180deg)");
      $(this).find(".dropdownContent").slideDown(200);
    },
    function () {
      $(this).find("span svg").css("transform", "rotate(0deg)");
      $(this).find(".dropdownContent").slideUp(200);
    }
  );
});
// end navbar dropdown

// start values section tabs js

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function togglecard() {
  document.querySelectorAll(".valuesCol").forEach((card) => {
    if (isInViewport(card)) {
      card.classList.add("visibleValuesCol");
    } else {
      card.classList.remove("visibleValuesCol");
    }
  });
}

window.addEventListener("scroll", togglecard);
window.addEventListener("load", togglecard);

// Add click event for each button to change image, text and trigger animation
document.querySelectorAll(".valuesColWrapper ul li a").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all buttons
    document.querySelectorAll(".valuesColWrapper ul li a").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the clicked button
    this.classList.add("active");

    // Get the index of the clicked button
    const buttonClass = this.classList[0];

    // Determine which image and text to show based on the button clicked
    let imgSrc, imgText;
    switch (buttonClass) {
      case "Btn1":
        imgSrc = "./assets/image/tabs/img-(1).jpg";
        imgText =
          "Simplicity: Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        break;
      case "Btn2":
        imgSrc = "./assets/image/tabs/img-(2).jpg";
        imgText =
          "Reliability: Nulla facilisi. Integer ac elit et nisi auctor tincidunt.";
        break;
      case "Btn3":
        imgSrc = "./assets/image/tabs/img-(3).jpg";
        imgText =
          "Customization: Sed cursus velit sit amet nulla venenatis, a fringilla orci mollis.";
        break;
      case "Btn4":
        imgSrc = "./assets/image/tabs/img-(4).jpg";
        imgText =
          "Efficiency: Fusce tincidunt auctor massa at gravida. Morbi tempor urna nec elit.";
        break;
      case "Btn5":
        imgSrc = "./assets/image/tabs/img-(2).jpg";
        imgText =
          "Innovation: Curabitur vehicula erat a libero feugiat, et euismod elit tincidunt.";
        break;
    }

    // Change the image source and text content
    const imgElement = document.querySelector(".ImgClass");
    const textElement = document.querySelector(".imgText");
    imgElement.src = imgSrc;
    textElement.textContent = imgText;

    // Add the slide-in animation class (Right for image, Bottom for text)
    imgElement.classList.add("slideInFromRight");
    textElement.classList.add("slideInFromBottom");

    // Remove the animation class after it finishes (optional)
    imgElement.addEventListener("animationend", function () {
      imgElement.classList.remove("slideInFromRight");
    });

    textElement.addEventListener("animationend", function () {
      textElement.classList.remove("slideInFromBottom");
    });
  });
});

//end  values section tabs js

// code for navbar offcanvas
$(function () {
  $(".offcanvasDropdown a").click(function (event) {
    var submenu = $(this).next(".submenu");
    submenu.toggleClass("show");

    // Specific icon toggle
    $(this).find(".submenuicon").toggleClass("show2");
    event.stopPropagation();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest(".offcanvasDropdown").length) {
      $(".submenu").removeClass("show");
      $(".submenuicon").removeClass("show2"); // Close all icons
    }
  });

  $(".offcanvasDropdown").click(function (event) {
    event.stopPropagation();
  });
});

// code for navbar offcanvas

// code for events card

// Intersection Observer to detect when cards come into view
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".eventsColWrapper"); // Target all the event cards

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.5, // Trigger when 50% of the card is in the viewport
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const card = entry.target;

      if (entry.isIntersecting) {
        // Add the 'in-view' class when the card is in the viewport
        card.classList.add("in-view");
      } else {
        // Remove the 'in-view' class when the card is out of the viewport
        card.classList.remove("in-view");
      }
    });
  }, observerOptions);

  // Observe each card
  cards.forEach((card, index) => {
    // Add different classes for each card depending on its position
    if (index % 2 === 0) {
      card.classList.add("card-left"); // Cards 2nd and 4th will animate from the left
    } else {
      card.classList.add("card-right"); // Cards 1st and 3rd will animate from the right
    }

    observer.observe(card); // Start observing each card
  });
});

// code for events card

// start intigrate section
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".integratecard");

  // Animation types for each card
  const animations = {
    left: "slideFromLeft",
    top: "slideFromTop",
    right: "slideFromRight",
    bottom: "slideFromBottom",
  };

  // Intersection Observer Options
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Adjusted threshold to 30% for better responsiveness
  };

  // Intersection Observer callback
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;

      if (entry.isIntersecting) {
        const animationType = card.getAttribute("data-animation");
        card.classList.remove("out-of-view");
        card.style.animation = `${animations[animationType]} 1s forwards`;
      } else {
        card.classList.add("out-of-view");
        card.style.animation = "";
      }
    });
  }, observerOptions);

  // Set data-animation attribute and observe each card
  cards.forEach((card, index) => {
    card.classList.add("out-of-view");
    card.setAttribute("data-animation", getAnimationType(index));
    observer.observe(card);
  });

  // Determine animation type based on index for responsive layout
  function getAnimationType(index) {
    if (window.innerWidth >= 768) {
      // For desktop and larger tablets
      if (index < 2) return "left";
      if (index < 4) return "top";
      if (index < 6) return "right";
      return "bottom";
    } else {
      // For mobile devices
      return "top"; // Apply top animation for all on mobile for consistency
    }
  }

  // Reapply animations on window resize for responsiveness
  window.addEventListener("resize", () => {
    cards.forEach((card, index) => {
      card.setAttribute("data-animation", getAnimationType(index));
    });
  });
});

// end intigrate section

// start get section
document.addEventListener("DOMContentLoaded", function () {
  const getSection = document.querySelector("#getSection");

  // Set up the Intersection Observer
  const observerOptions = {
    root: null,
    threshold: 0.1, // Trigger when 10% of the element is in view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class when in viewport
        getSection.classList.add("animate");
      } else {
        // Remove animation class when out of viewport
        getSection.classList.remove("animate");
      }
    });
  }, observerOptions);

  // Start observing the getSection
  observer.observe(getSection);
});
// end get section
