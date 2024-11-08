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
let slideIndex = 1;
export async function plusSlides(n) {
    slideshow(slideIndex += n);
}


export async function addListeners() {
    let nextResult = new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(document.getElementsByClassName("next")) }
            , 100);
    });
    let prevResult = new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(document.getElementsByClassName("prev")) }
            , 200);
    });
    let next = await nextResult;
    let prev = await prevResult; 

    prev[0].addEventListener("click", function () { plusSlides(-1) });
    next[0].addEventListener("click", function () { plusSlides(1) })
}


// creates a slideshow to loop through project pictures
export async function slideshow(n) {
    let promiseResult = new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(document.querySelectorAll(".slides")) }
            , 100);
    });
    let pictures = await promiseResult;
    console.log(pictures)
    if (n > pictures.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = pictures.length }
    for (let i = 0; i < pictures.length; i++) {
        pictures[i].style.display = "none";
    }
    pictures[slideIndex - 1].style.display = "block";
}