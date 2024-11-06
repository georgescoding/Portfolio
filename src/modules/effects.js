//////////////////////////////////////////
///// various effects and animations /////
//////////////////////////////////////////



// Creates a typewriter effect by adding text one character at a time, skips over spaces for a smoother animation
const text = "  Hi, I'm George";
let i = 0;
export function typewriter() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typewriter, 150);
    }
}


// Toggles the flip class for the project cards, creating the fliping animation 
export function flip(x) {
    var card = document.getElementById(x.id);
    card.classList.toggle('flip');
}



// Next/previous controls
export function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
export function currentSlide(n) {
    showSlides(slideIndex = n);
}

// creates a slideshow to loop through project pictures
export function slideshow() {
    let slideIndex = 1;
    let i;
    let slides = document.querySelectorAll("slideshow");

   /*  if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    slides.forEach(element => {
        element.style.display = "none"
    });

    slides[slideIndex - 1].style.display = "block"; */
}