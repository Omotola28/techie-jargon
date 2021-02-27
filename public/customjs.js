
window.addEventListener("load", (event) => {

  const screenWidthA = window.matchMedia("(max-width:1440px)");
  const screenWidthB = window.matchMedia("(max-width: 800px)");
  const sideBar = document.querySelector(".nav-menu");
  let cards = document.querySelector(".card");
  let carousel = document.querySelector(".card-carousel"); 

  let starttime;

  function handleCardTransition(e) {
    if (e.matches) {
      document
        .querySelector(".menu-icon")
        .addEventListener("click", (event) => {
          if (!sideBar.classList.contains("active")) {
            requestAnimationPath(-450);
          } else {
            requestAnimationPath(0);
          }
        });
    }
  }

  function requestAnimationPath(lengthOfPath) {
    requestAnimationFrame(function (timestamp) {
      starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
      moveit(timestamp, cards, lengthOfPath, 100); // 100px over 1 millisecond
    });
  }

  function handleCardDisplayNone(e) {
    if (e.matches) {
      document
        .querySelector(".menu-icon")
        .addEventListener("click", (event) => {
          const sideBar = document.querySelector(".nav-menu");
          if (!sideBar.classList.contains("active")) {
            carousel.style.display = "none";
          } else {
            carousel.style.display = "flex";
          }
        });
    }
  }

  function moveit(timestamp, el, dist, duration) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime();
    var runtime = timestamp - starttime;
    var progress = runtime / duration;
    progress = Math.min(progress, 1);
    el.style.left = (dist * progress).toFixed(2) + "px";
    if (runtime < duration) {
      // if duration not met yet
      requestAnimationFrame(function (timestamp) {
        // call requestAnimationFrame again with parameters
        moveit(timestamp, el, dist, duration);
      });
    }
  }

  document.querySelector(".menu-icon").addEventListener("click", (event) => {
    const sideBar = document.querySelector(".nav-menu");
    if (!sideBar.classList.contains("active")) {
        requestAnimationPath(-250);
    } else {
        requestAnimationPath(0);
    }
  });

  screenWidthA.addEventListener("change", handleCardTransition);
  screenWidthB.addEventListener("change", handleCardDisplayNone);
  handleCardTransition(screenWidthA);
  handleCardDisplayNone(screenWidthB);
});

