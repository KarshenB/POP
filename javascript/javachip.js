function scrollFooter(scrollY, heightFooter) {
  if (scrollY >= $(document).height() - $(window).height() - heightFooter) {
      $('footer').css({
          'bottom': '0px'
      });
  } else {
      $('footer').css({
          'bottom': '-' + heightFooter + 'px'
      });
  }
}

// Scroll to anchor links
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  var target = $($.attr(this, 'href'));

  if (target.length) {
    $('html, body').scrollTop(target.offset().top);
}
});

// Start Action to load the whole page
$(window).on('load', function () {
  var windowHeight = $(window).height(),
      footerHeight = $('footer').height(),
      heightDocument = windowHeight + $('.content').height() + footerHeight;

  // Defining the size of the element to animate
  $('#scroll-animate, #scroll-animate-main').css({
      'height': heightDocument + 'px'
  });

  // Defining the size of the header and content elements
  $('header').css({
      'height': windowHeight + 'px',
      'line-height': windowHeight + 'px'
  });

  $('.wrapper-parallax').css({
      'margin-top': windowHeight + 'px'
  });

  // Verify the position of the scroll and hide the footer
  scrollFooter(window.scrollY, footerHeight);

  // Start Action on scrolling
  window.onscroll = function () {
      var scroll = window.scrollY;

      // Smooth animation of content using scroll.
      $('#scroll-animate-main').css({
          'top': '-' + scroll + 'px'
      });

      // Parallax effect in the header background.
      $('header').css({
          'background-position-y': 50 - (scroll * 100 / heightDocument) + '%'
      });

      // Verify the position of the scroll and hide the footer
      scrollFooter(scroll, footerHeight);

      // Top bar logic
      var topBar = document.getElementById('topBar');
      var mainBar = document.getElementById('mainBar');

      if (window.pageYOffset > 50) {
          topBar.style.top = '-50px';
          mainBar.style.top = '0';
      } else {
          topBar.style.top = '0';
          mainBar.style.top = '50px';
      }
  };
});

const texts = ["Programmer.", "Gamer.", "Graphic Designer.", "Tech Nerd.", "Web Developer."];
const textElement = document.querySelector('.hybrid span');
let index = 0;
let isDeleting = false;
let charIndex = 0;
const typingSpeed = 200; 
const deletingSpeed = 100; 
const pauseTime = 1200; 
const prefix = "I'm a "; // Keeps this part intact

function type() {
    const currentText = texts[index];
    if (isDeleting) {
        if (charIndex > 0) {
            textElement.textContent = prefix + currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, deletingSpeed);
        } else {
            isDeleting = false;
            index = (index + 1) % texts.length;
            setTimeout(type, pauseTime);
        }
    } else {
        if (charIndex < currentText.length) {
            textElement.textContent = prefix + currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            isDeleting = true;
            setTimeout(type, pauseTime);
        }
    }
}




type();



let state = false; // Play
let currentSong = null;
const btn = document.querySelector(".btn");
const record = document.querySelector(".record");
const toneArm = document.querySelector(".tone-arm");
const song = document.getElementById("audio-player");
const volume = document.querySelector(".volume");

const songs = document.querySelectorAll(".song-container");

function updatePlayPause(play) {
if (play) {
record.classList.add("on");
song.play();
// delays para mag sync in yung tonearm sa song
toneArm.classList.add("delay");
setTimeout(() => {
    toneArm.classList.add("play");
}, 400); // 1000 ms = 1 second so this be 0.4s delay
} else {
record.classList.remove("on");
toneArm.classList.remove("play", "delay");
song.pause();
}
state = play;
}

function playSong(audioSrc) {
song.src = audioSrc;
updatePlayPause(true);
}

// functions the song container
songs.forEach((songElem) => {
songElem.addEventListener("click", () => {
// unhighlights the song when it staps playing
document.querySelectorAll(".song-container.active").forEach(el => el.classList.remove("active", "inactive"));

// highlights when playing slay
songElem.classList.add("active");

const audioSrc = songElem.getAttribute("data-audio");

if (currentSong !== audioSrc) {
    // Stops the current song if a new song is selected
    if (currentSong) {
    updatePlayPause(false);
    }
    playSong(audioSrc);
    currentSong = audioSrc;
} else {
    // play and pausa feature
    if (state) {
    // Pausing
    updatePlayPause(false);
    songElem.classList.remove("active");
    songElem.classList.add("inactive");
    } else {
    // Playing
    updatePlayPause(true);
    songElem.classList.add("active");
    songElem.classList.remove("inactive");
    }
}
});
});

// play and pause mecahnic
btn.addEventListener("click", () => {
if (toneArm.classList.contains("touch")) {
updatePlayPause(!state);
if (state) {
    // Playing
    document.querySelectorAll(".song-container.inactive").forEach(el => el.classList.remove("inactive"));
} else {
    // Pausing
    document.querySelectorAll(".song-container.active").forEach(el => el.classList.add("inactive"));
}
}
});

// Volume slide stuf
volume.addEventListener("input", (e) => {
song.volume = Number(e.target.value);
});

// to make sure na ma intouch siya sa tone arm
document.addEventListener("DOMContentLoaded", () => {
toneArm.classList.add("touch");
});


function setActive(element, bgColor, textColor) {
  // Get all the song containers
  var songs = document.querySelectorAll('.song-container');

  // Loop through each song to reset its background and text color
  songs.forEach(function(song) {
    var defaultBg = song.getAttribute('data-default-bg'); // Get the default background color
    var defaultText = song.getAttribute('data-default-text'); // Get the default text color

    // Reset background and text color to the default values
    song.style.backgroundColor = defaultBg;
    song.querySelector('h3').style.color = defaultText;
    song.querySelector('p').style.color = defaultText;
  });
  
  // Set the clicked element's background and text color to the active colors
  element.style.backgroundColor = bgColor;
  element.querySelector('h3').style.color = textColor;
  element.querySelector('p').style.color = textColor;

  // Play the selected song (optional)
  var audio = document.getElementById('audio-player');
  audio.src = element.getAttribute('data-audio');
  audio.play();
}




let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");

function rotateCards() {
  let angle = 0;
  cards.forEach((card) => {
    if (card.classList.contains("active")) {
      card.style.transform = `translate(-50%, -120vh) rotate(-48deg)`;
    } else {
      card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      angle = angle - 10;
    }
  });
}

rotateCards();

window.addEventListener("scroll", () => {
  let proportion =
    stackArea.getBoundingClientRect().top / window.innerHeight;
  if (proportion <= 0) {
    let n = cards.length;
    let index = Math.ceil((proportion * n) / 1);
    index = Math.abs(index) - 1;
    for (let i = 0; i < n; i++) {
      if (i <= index) {
        cards[i].classList.add("active");
      } else {
        cards[i].classList.remove("active");
      }
    }
    rotateCards();
  }
});

// Code for responsiveness
function adjust() {
  let windowWidth = window.innerWidth;
  let left = document.querySelector(".left");
  left.remove();
  if (windowWidth < 800) {
    stackArea.insertAdjacentElement("beforebegin", left);
  } else {
    stackArea.insertAdjacentElement("afterbegin", left);
  }
}
adjust();

// Detect Resize
window.addEventListener("resize", adjust);


function toggleFlip(cardId) {
  const card = document.getElementById(cardId);
  card.classList.toggle('flipped');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


VanillaTilt.init(document.querySelectorAll(".category_item"), {
  max: 25,
  speed: 400,
  easing:"cubic-bezier(.03,.98,.52,.99)",
  perspective:500,
  transition:true
});

// Scroll to top function for HOME button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Enables smooth scrolling
  });
}

// Scroll to bottom function for CONTACT button
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' // Smooth scrolling to bottom
  });
}



// Function to toggle the dropdown for the "RESUME" button
function toggleDropdown() {
  const dropdownContent = document.getElementById('dropdownContent');
  dropdownContent.classList.toggle('active');
}

// Function to close the dropdown when other buttons are clicked
function closeDropdown() {
  const dropdownContent = document.getElementById('dropdownContent');
  if (dropdownContent.classList.contains('active')) {
      dropdownContent.classList.remove('active');
  }
}

// Add event listeners for the other buttons to close the dropdown
document.querySelectorAll('.buttons a:not([href="#resume"])').forEach(button => {
  button.addEventListener('click', () => {
      closeDropdown();
  });
});





function triggerMotionPath() {
  const gifContainer = document.querySelector('.gif-container');
  gifContainer.classList.toggle('gif-active');
}


let currentSlide = 0;

// Define images for each gallery image
const albumImages = {
"Album 1": [
[["./me/church.jpg", "Filmed Romeo and Juliet for our last major English PETA in Grade 9. Drank coffee afterwards O_O"], "./me/church1.jpg", "./me/church2.jpg", "./me/church3.jpg", "./me/church4.jpg"],
[["./me/drink.jpg", "MILKIS ON TOP!!!"], "./me/drink1.jpg"],
[["./me/tak2.jpg", "Pure Randomness."], "./me/tak.jpg", "./me/tak1.jpg"],
[["./me/myhoney2.jpg", "Cinema Date with my Future Wife<333"], "./me/myhoney.jpg", "./me/myhoney3.jpg", "./me/myhoney1.jpg"],
[["./me/cutie2.jpg", "Modular Things"], "./me/cutie1.jpg", "./me/cutie3.jpg", "./me/cutie.jpg"],
[["./me/birdy2.jpg", "BIRDDD!!!"],"./me/birdy.jpg", "./me/birdy1.jpg"],
[["./me/rec.jpg", "Grade 9 Recognition. Missing Iverson :<"], "./me/rec1.jpg", "./me/rec2.jpg", "./me/rec3.jpg"],
[["./me/spark1.jpg", "Audio Tech sa Spark 2024."], "./me/spark.jpg", "./me/spark2.jpg"],
[["./me/hat.jpg", "Gala with Prends"], "./me/hat1.jpg", "./me/hat2.jpg"],
[["./me/baby.jpg", "Me with my Dadi"]],
[["./me/kewl.jpg", "Sunny Days"], "./me/kewl1.jpg", "./me/kewl2.jpg", "./me/kewl3.jpg"],
[["./me/paolo.jpg", "Iverson Phase"], "./me/paolo1.jpg", "./me/paolo2.jpg", "./me/paolo3.jpg", "./me/paolo4.jpg"],
[["./me/womp.jpg", "Young Rascal"], "./me/womp1.jpg"],
[["./me/flowa.jpg", "Flower Power!"], "./me/flowa1.jpg", "./me/flowa2.jpg", "./me/flowa3.jpg"],
[["./me/bday.jpg", "Happy Badu"], "./me/bday1.jpg"],
[["./me/sky1.jpg", "Beautiful Skies"], "./me/sky.jpg", "./me/sky2.jpg", "./me/sky3.jpg"],
[["./me/cat.jpg", "MEOW MEOW SIOPAO!"], "./me/cat1.jpg", "./me/cat2.jpg", "./me/cat3.jpg", "./me/cat4.jpg", "./me/cat5.jpg"],
[["./me/rizz.jpg", "Purple bruh"], "./me/rizz2.jpg"],
[["./me/popp.jpg", "BABY PICS"], "./me/popp1.jpg", "./me/popp2.jpg", "./me/popp3.jpg"],
[["./me/sunkissed.jpg", "Sunkissed"]],

],

"Album 2": [
[["./mutuals/zoe1.jpg", "Mavie Cruz (My Baby<3)"], "./mutuals/zoe.jpg", "./mutuals/zoe2.jpg", "./mutuals/zoe3.jpg", "./mutuals/zoe4.jpg"],
[["./mutuals/keith.jpeg", "Keith Gabriel"], "./mutuals/keith1.jpeg", "./mutuals/keith2.jpg"],
[["./mutuals/imee.jpg", "Imee Lalic"], "./mutuals/imee1.jpg", "./mutuals/imee2.jpg"],
[["./mutuals/cy.jpg", "Cyrus Lansangan"], "./mutuals/cy1.jpg", "./mutuals/cy2.jpg"],
[["./mutuals/eos.jpg", "Eos Aguilar"], "./mutuals/eos1.jpg"],
[["./mutuals/josh.jpg", "Josh Ocampo"], "./mutuals/josh1.jpg", "./mutuals/josh2.jpg"],
[["./mutuals/andrei.jpg", "Andrei Ceñido"], "./mutuals/andrei1.jpg", "./mutuals/andrei2.jpg"],
[["./mutuals/carmeli.jpg", "Carmeli Tacbad"], "./mutuals/carmeli1.jpg", "./mutuals/carmeli2.jpg"],
[["./mutuals/ivan.jpg", "Ivan Masbang"], "./mutuals/ivan1.jpg", "./mutuals/ivan2.jpg"],
[["./mutuals/janeah.jpg", "Janeah Catubig"], "./mutuals/janeah1.jpg"],
]
};



// Function to show the album
function showAlbum(index) {
    const tabs = document.querySelectorAll('.tab');
    const containers = document.querySelectorAll('.image-container');

    tabs.forEach(tab => tab.classList.remove('active'));
    containers.forEach(container => container.classList.remove('active'));

    tabs[index].classList.add('active');
    containers[index].classList.add('active');
}

// Function to open the viewer
// Function to open the viewer
function openViewer(index, album) {
const viewer = document.getElementById('viewer');
viewer.style.display = 'flex';

// Fetch the images and captions based on album and index
const images = albumImages[album][index].map(item => Array.isArray(item) ? item[0] : item); // Extract the image paths
const captions = albumImages[album][index].map(item => Array.isArray(item) ? item[1] : ""); // Extract the captions

// Create the carousel
const carousel = document.getElementById('carousel');
carousel.innerHTML = images.map((src, i) => `<img src="${src}" alt="${captions[i] || 'Image ' + (i + 1)}">`).join('');

// Create the dots for navigation
const dotsContainer = document.getElementById('dots');
dotsContainer.innerHTML = images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="setSlide(${i})"></span>`).join('');

currentSlide = 0;
showSlide(currentSlide);
}


// Function to change slides
function changeSlide(n) {
    currentSlide += n;
    const carouselImages = document.querySelectorAll('#carousel img');
    if (currentSlide >= carouselImages.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = carouselImages.length - 1;
    }
    showSlide(currentSlide);
}

// Function to show specific slide
// Function to show specific slide
function showSlide(slide) {
const carousel = document.getElementById('carousel');
const carouselImages = document.querySelectorAll('#carousel img');
const dots = document.querySelectorAll('.dot');

carousel.style.transform = `translateX(-${slide * 100}%)`;
dots.forEach(dot => dot.classList.remove('active'));
dots[slide].classList.add('active');

const caption = document.getElementById('viewer-caption');
const firstImageCaption = carouselImages[0].alt; // Get the caption from the first image
caption.innerText = firstImageCaption; // Set caption to the first image's caption
}


// Function to set specific slide
function setSlide(slide) {
    currentSlide = slide;
    showSlide(currentSlide);
}

// Function to close the viewer
function closeViewer() {
    const viewer = document.getElementById('viewer');
    viewer.style.display = 'none';
}

albumImages["Album 1"].forEach((imageSet) => {
imageSet.forEach((image, index) => {
if (Array.isArray(image)) {
    // Display the image with the caption (image[0] is the image path, image[1] is the caption)
    console.log(`<img src="${image[0]}" alt="${image[1]}"><p>${image[1]}</p>`);
} else {
    // Display the image without a caption
    console.log(`<img src="${image}">`);
}
});
});



