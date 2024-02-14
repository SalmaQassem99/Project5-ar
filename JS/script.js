const playButton = document.querySelector(".play-button");
const volumeButton = document.querySelector(
  ".game .volume.icon"
);
const homePage = document.querySelector(".homepage");
const gamePage = document.querySelector(".game");
const gameImages = document.querySelectorAll(".game-images .img-container");
const infoIcon = document.querySelector(".bottom.icon");
const scoreElement = document.querySelector(".scoreWrapper .score");
const successModal = document.querySelector(".success-card");
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
let counter = 0;
let soundOn = true;
const animateInfo = () => {
  infoIcon.classList.add("show");
  infoIcon.addEventListener("animationend", () => {
    setTimeout(() => {
      infoIcon.classList.remove("show");
      infoIcon.classList.add("hide");
    }, 1000);
  });
};
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  homePage.classList.add("hide");
  homePage.addEventListener("animationend", () => {
    homePage.classList.remove("hide");
    homePage.style.visibility = "hidden";
    gamePage.style.visibility = "visible";
    animateInfo();
  });
});
gameImages.forEach((image) => {
  image.addEventListener("click", () => {
    document.querySelector(`audio[id="${image.dataset.id}"]`).play();
    image.classList.add("clicked");
    if (!image.classList.contains("colored")) {
      image.classList.add("colored");
      counter += 1;
    }

    image.addEventListener("animationend", () => {
      image.classList.remove("clicked");
    });
    const text = image.querySelector(".card-text");
    text.classList.add("show");
    text.addEventListener("animationend", () => {
      text.classList.remove("show");
    });
    scoreElement.textContent = `${counter}/${gameImages.length}`;
    document
      .querySelector(":root")
      .style.setProperty("--width", `${(100 / gameImages.length) * counter}%`);
    if (counter === gameImages.length) {
      const text = document.querySelector(".text-card .score-text");
      text.textContent = `${counter}/${gameImages.length}`;
      successModal.classList.add("show");
      overlay.classList.add("show");
    }
  });
});
infoIcon.addEventListener("click", () => {
  infoIcon.classList.remove("hide");
  animateInfo();
});
document.addEventListener('click', function (event) {
  const isVisible = window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside = successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    successModal.classList.remove("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 400);
  }
});
document.querySelector(".closeModal").addEventListener("click", () => {
  successModal.classList.remove("show");
  setTimeout(() => {
    overlay.classList.remove("show");
  }, 400);
});
volumeButton.addEventListener("click", () => {
  const onIcon = volumeButton.querySelector(".fa-solid:not(.off)");
  const offIcon = volumeButton.querySelector(".off");
  onIcon.classList.add("off");
  offIcon.classList.remove("off");
  if (soundOn) {
    soundOn = false;
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = true;
    });
  } else {
    soundOn = true;
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = false;
    });
  }
});
window.addEventListener("load", () => {
  scoreElement.textContent = `0/${gameImages.length}`;
});