//Mutate card items when sidebar is toggled
window.addEventListener("load", (event) => {

  const screenWidthA = window.matchMedia("(max-width:1430px)");
  const screenWidthB = window.matchMedia("(max-width: 800px)");
  const sideBar = document.querySelector(".nav-menu");
  const noOfHits = document.querySelector(".noOfHits");
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
      transitionCard(timestamp, lengthOfPath, 100); // 100px over 1 millisecond
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

  function transitionCard(timestamp, dist, duration) {
    let el = document.querySelectorAll(".card");
    el = Array.from(el); //convert to array
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    let time = timestamp || new Date().getTime();
    let runtime = time - starttime;
    let progress = runtime / duration;
    progress = Math.min(progress, 1);
    el.map(cardEl => cardEl.style.left = (dist * progress).toFixed(2) + "px");

    if (runtime < duration) {
      // if duration not met yet
      requestAnimationFrame(function (time) {
        // call requestAnimationFrame again with parameters
        transitionCard(time, dist, duration);
      });
    }
  }

  document.querySelector(".menu-icon").addEventListener("click", (event) => {
    const sideBar = document.querySelector(".nav-menu");
    if (!sideBar.classList.contains("active")) {
        noOfHits.style.display = "none";
        requestAnimationPath(-250);
    } else {
        noOfHits.style.display = "block";
        requestAnimationPath(0);
    }
  });

  screenWidthA.addEventListener("change", handleCardTransition);
  screenWidthB.addEventListener("change", handleCardDisplayNone);
  handleCardTransition(screenWidthA);
  handleCardDisplayNone(screenWidthB);
});

