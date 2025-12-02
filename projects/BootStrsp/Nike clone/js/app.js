  window.onscroll = function () {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 100) {
      nav.classList.add("sticky-navbar");
    } else {
      nav.classList.remove("sticky-navbar");
    }
  };

