//your code here
document.addEventListener("DOMContentLoaded", () => {
  const images = ["img1", "img2", "img3", "img4", "img5"];
  const imageContainer = document.getElementById("image-container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");
  let selectedImages = [];
  let identicalImageClass = "";

  function getRandomImageClass() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  function initializeImages() {
    const allImageClasses = [...images];
    identicalImageClass = getRandomImageClass();
    allImageClasses.splice(
      Math.floor(Math.random() * allImageClasses.length),
      0,
      identicalImageClass
    );

    imageContainer.innerHTML = "";
    allImageClasses.forEach((cls, index) => {
      const img = document.createElement("img");
      img.className = cls;
      img.dataset.id = index;
      img.addEventListener("click", handleImageClick);
      imageContainer.appendChild(img);
    });
  }

  function handleImageClick(event) {
    const img = event.target;
    if (selectedImages.length < 2 && !img.classList.contains("selected")) {
      img.classList.add("selected");
      selectedImages.push(img);

      if (selectedImages.length === 1) {
        resetBtn.style.display = "block";
      }

      if (selectedImages.length === 2) {
        verifyBtn.style.display = "block";
      }
    }
  }

  function handleReset() {
    selectedImages.forEach((img) => img.classList.remove("selected"));
    selectedImages = [];
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    para.style.display = "none";
  }

  function handleVerify() {
    if (selectedImages[0].className === selectedImages[1].className) {
      para.innerText = "You are a human. Congratulations!";
    } else {
      para.innerText =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
    para.style.display = "block";
    verifyBtn.style.display = "none";
  }

  resetBtn.addEventListener("click", handleReset);
  verifyBtn.addEventListener("click", handleVerify);

  initializeImages();
});
