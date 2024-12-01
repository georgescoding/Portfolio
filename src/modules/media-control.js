//////////////////////////////////////////////////////////////////////////////////////////////
///// various media controls that are used to control videos on individual project pages /////
//////////////////////////////////////////////////////////////////////////////////////////////



// performs a media control action based on the user's keyboard input
export function videoAction(pressedKey) {
    switch (pressedKey) {
        case "k":
            play();
            break;
        case "f":
            fullscreen();
            break;
        case "r":
            restart();
            break;
        case "l":
        case "ArrowRight":
            forward();
            break;
        case "j":
        case "ArrowLeft":
            backward();
            break;
    }
}


// adds event listeners to the video buttons
export function buttonPress() {
    var play = document.getElementById("play"),
        backward = document.getElementById('backward'),
        forward = document.getElementById('forward'),
        refresh = document.getElementById('refresh'),
        fullscreen = document.getElementById('fullscreen');

    backward.addEventListener("click", function () { videoAction("j") });
    play.addEventListener("click", function () { videoAction("k") });
    forward.addEventListener("click", function () { videoAction("l") });
    refresh.addEventListener("click", function () { videoAction("r") });
    fullscreen.addEventListener("click", function () { videoAction("f") });
}


// plays video
export function play() {
    var video = document.getElementById('video'),
        button = document.getElementById('play');

    if (video.paused == true) {
        video.play();
        button.setAttribute("class", "fa-solid fa-pause")
    }
    else {
        video.pause();
        button.setAttribute("class", "fa-solid fa-play")
    }
}


// restarts the video from the beginning
function restart() {
    var video = document.getElementById('video'),
        button = document.getElementById('play');

    video.currentTime = 0;
    video.pause();
    button.setAttribute("class", "fa-solid fa-play")
}


// toggles fullscreen mode
function fullscreen() {
    var video = document.getElementById("video");

    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    } else {
        if (video.exitFullscreen) {
            video.exitFullscreen();
        } else if (video.webkitExitFullscreen) {
            video.webkitExitFullscreen();
        } else if (video.mozCancelFullScreen) {
            video.mozCancelFullScreen();
        } else if (video.msExitFullscreen) {
            video.msExitFullscreen();
        }
    }
}


// seeks the video back 10 seconds
function backward() {
    var video = document.getElementById('video');
    video.currentTime -= 10;
}


// seeks the video forward 10 seconds
function forward() {
    var video = document.getElementById('video');
    video.currentTime += 10;
}