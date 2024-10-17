window.history.pushState('', '', location.pathname.slice(0, -1));

window.addEventListener("keydown", (e) => videoAction(e.key));

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
}


/* Parameters for Chess Page */
var chessText = "A traditional chess game developed in Python using only the PyGame module, utilizing piece-square tables found in the Chess Programming Wiki."
    + "Includes two-player mode and an AI bot using a minimax algorithm with alpha-beta pruning. Incorporates a dialogue window to announce moves,"
    + "game state and castles or checks. Also created a separate packaging module with file manipulation to help optimize the process of packaging"
    + " the files into an executable using PyInstaller. The board is represented through a 2D array with pieces and spaces being numbers. For a"
    + " more in-depth explanation of each component of the game, please visit the GitHub repository of the project.";

const chessParam = ['Chess', 'Python, PyGame, MiniMax', "https://github.com/GeorgesCoding/Chess", chessText, "/assets/Chess.exe", "/assets/chess-demo.mp4"];


/* Parameters for Blackjack Page */
var blackjackText = "Casino-style game of Blackjack, following traditional casino rules. Developed using only Java, with Java Swing as the GUI and"
    + " ActionListener to recognize events. This was a joint project of me and a classmate as our year-end programming project in high school."
    + " I mainly focused on the interface and handling user inputs while occasionally aiding my friend with the logistics and helping interface"
    + " the back end with the GUI. Uses linked lists to connect the deck of cards. ";

const blackjackParam = ['Blackjack', 'Java, Java Swing, Linked Lists', "https://github.com/GeorgesCoding/Blackjack", blackjackText, 1, "/assets/blackjack-demo.mp4"];


/* Parameters for Breathalyzer Page */
var breathalyzerText = "After acquiring some engineering design skills and knowledge, I decided to test this by making a breathalyzer along with a friend."
    + "It tackled a real-world problem of drunk driving that was extremely prevalent, especially in America. Our project revolved around an MQ3"
    + " alcohol sensor that would interface with an STM32 board, displaying the result on an LCD screen. The first problem was reading the data"
    + " from the sensor and interpreting it so it could be read as a blood alcohol percentage. Through much research on the sensor itself and"
    + " converting it to %BAC, we discovered an algorithm that works to our needs. However, another fact we learned about the sensor was its"
    + " unreliability and inaccuracy. So to help alleviate this flaw, I implemented a calibration system. It takes real-time data on the"
    + " surrounding air, using this in the computation for %BAC rather than a guessed constant. This helps with accuracy in various environments"
    + " and creates a more reliable response.";

var breathalyzerPictures = ["/assets/breath-circuit.png", "/assets/breath-diagram.png", "/assets/breath-model.png", "/assets/breath-log.jpg", "/assets/breath-slope.png"];

const breathalyzerParam = ['Breathalyzer', 'C/C++, Arduino, STM32, AutoCAD', "https://github.com/GeorgesCoding/Breathalyzer", breathalyzerText, 1, 2, "/assets/breathalyzer.jpg", 3, breathalyzerPictures];


/* Parameters for Calculator Page */
var calculatorText = "At Plan Group, the first project I was assigned to was Project ALICE, a software development program to help create various tools"
    + " to optimize CAD design for designers in the engineering and CAD teams. Since the entire project used C#, a completely new programming"
    + " language for me, I utilized my free time during the first couple weeks of onboarding to familiarize myself with the syntax through a"
    + " simple coding project; a calculator app. I gained knowledge in initializing objects, encapsulation of functions, built-in methods and"
    + " how to use the ASP.NET Web Forms interface with Visual Studio Community. Overall this mini-project helped me learn the basics of C#"
    + " programming and gave me a head start in project ALICE. Below is a button to download the app.";

const calculatorParam = ['Calculator', 'C#, ASP.NET Core', "https://github.com/GeorgesCoding/Calculator", calculatorText, "/assets/Calculator App.appref-ms", "/assets/calculator-demo.mp4"];


/* Parameters for Minesweeper Page */
var minesweeperText = "The retro game Minesweeper is built using C++ and played on your terminal. Each action (mark, reveal) uses bitwise operations to"
    + " change the state of the board. An instance of the board is dynamically allocated and deleted from memory once the game is over. To start"
    + " the game, double-click the Minesweeper.exe and your machine should automatically begin a terminal with the game initialized and ready to play."
    + " This project was the first challenging C++ project we were given in our engineering programming course but despite the difficulty being"
    + " substantially higher than the previous assignments, the end result was very satisfying to see. Below is a download button for the game that will"
    + " enable you to play in your computer's terminal ";

const minesweeperParam = ['Minesweeper', 'C++', "https://github.com/GeorgesCoding/Minesweeper", minesweeperText, "/assets/Minesweeper.exe", "/assets/minesweeper-demo.mp4"];


/* Parameters for pH-Sensor Page */
var sensorText = "The first hardware project I created, was built using an STM32 board, IC2 LCD screen and an Arduino-compatible probe pH-Sensor."
    + " The topic behind this project was “create something that will aid with the reduction of climate change”, so me and my partner first thought"
    + "of oceanic pollution and decay. We researched many reasons for this phenomenon and found that the main source was pollution, with the major"
    + " sign being a significant change in pH within the water. Originally, we were planning to make a rover that would be able to drive around using"
    + " a remote control with a camera for long-distance activity, collect the sample and bring it back to researchers. However, creating an actual"
    + " functioning rover was practically impossible without any hardware or mechanical design knowledge. So we opted for a simpler solution, a buoy."
    + " With it being built extremely cheaply, multiple can be distributed simultaneously to gather more accurate information. In the design we included"
    + " a wifi module to send data over long distances, however, we were unable to implement this due to timing restraints. Above are some CAD drawings"
    + " of our system along with the real-life implementation.";

var sensorPictures = ["/assets/sensor-realife.png", "/assets/sensor-newcad.png", "/assets/sensor-oldcad.png"];

const sensorParam = ['pH-Sensor', 'C/C++, Arduino, STM32, AutoCAD', "https://github.com/GeorgesCoding/pH-Sensor", sensorText, 1, 2, "/assets/projects-sensor.jpg", 2, sensorPictures];


/* Parameters for Portfolio Page */
var portfolioText = "Inspired by my friend and the desire to learn more about a new type of programming,"
    + " decided to make a portfolio website. At first, I did a simple coming soon page with a"
    + " countdown made using JavaScript and a simple ellipsis animation to make the page come to life. The original static"
    + " a website was complete within 10 days, including my introduction, work experience and all my projects listed. However, "
    + "I felt that this current website felt lacking, especially after I took a look at more advanced websites and realized that there"
    + " was no threshold to how simple or complicated my website could be, it was entirely up to me. So I began with animating my name"
    + "using a typewriter animation in JavaScript, paying homage to my hobby of speed typing and mechanical keyboards. After, I created a"
    + "simple but functional button, moving on hover. Lastly, I decided to use a card layout to display my projects. However, because I still"
    + " wanted to include a small explanation of the project in the card, but wasn’t enough room. So I thought of making the card flip on click,"
    + "with the backside being the short description and links to the GitHub page and individual project page with more details. "
    + "Below, I have included the coming soon page for my website that was used as a placeholder while I created the actual website.";

const portfolioParam = ['Portfolio Website', 'HTML, CSS, JavaScript, jQuery', "https://github.com/GeorgesCoding/Portfolio", portfolioText, 2, 1];


/* Array with All Project Parameters */
const projecctParam = [chessParam, blackjackParam, breathalyzerParam, calculatorParam, minesweeperParam, sensorParam, portfolioParam];


/* Creates a typewriter effect by adding text one character at a time, skips over spaces for a smoother animation */
var text = "  Hi, I'm George";
i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    }
}


/* Toggles the flip class for the project cards, creating the fliping animation */
function flip(x) {
    id = x.id
    var card = document.getElementById(id);
    card.classList.toggle('flip');
}


/* Sends form to email via EmailJS, resets form and reCAPTCHA */
function send(name, email, message, captchaToken) {
    var templateParams = {
        name: name,
        message: message,
        email: email,
        "g-recaptcha-response": captchaToken
    };
    emailjs.send('service_j2mkwmy', 'template_zilck42', templateParams).then(
        (response) => {
            alert("Message successfully sent!");
        },
        (error) => {
            alert("There was an error in sending the message. Please contact support@georgescoding.com.");
        },
    );
    document.getElementById("form").reset();
    grecaptcha.reset();
}


/* Validates the contents of the form and reCAPTCHA*/
function valid() {
    var name = String(document.querySelector('[name="name"]').value);
    var email = String(document.querySelector('[name="email"]').value);
    var message = String(document.querySelector('[name="message"]').value);
    var format = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    var captchaToken = grecaptcha.getResponse();

    if (name == "") {
        alert("Name must be filled");
        document.getElementById("name").focus();
    }
    else if (email == "") {
        alert("Email must be filled");
        document.getElementById("email").focus();
    }
    else if (message == "") {
        alert("You must include a message");
        document.getElementById("message").focus();
    }
    else if (!(String(email).match(format))) {
        alert("Email is incorrect");
        document.getElementById("email").focus();
    }
    else if (captchaToken.length == 0) {
        alert("Please complete the reCAPTCHA before sending your message!")
    }
    else { send(name, email, message, captchaToken); }
}


/* adds text and media into the template html file */
function change(num) {

    document.getElementById("projectName").innerHTML = projecctParam[num][0];
    document.getElementById("tools").innerHTML += projecctParam[num][1];
    document.getElementById("github").href = projecctParam[num][2];
    document.getElementById("github").style.fontSize = "50px";
    document.getElementById("text").innerHTML = projecctParam[num][3];

    var video = document.getElementById('video');
    var click = document.getElementById("clickable");
    var picture = document.getElementById("projectPic");
    var otherPics = document.getElementById("otherPics");
    var playpause = document.getElementById("playbutton");
    var refresh = document.getElementById("refresh");
    var fullscreen = document.getElementById("fullscreen");
    var backward = document.getElementById("backward");
    var forward = document.getElementById("forward");

    /* adds link to coming soon page */
    if (projecctParam[num][4] == 1) {
        click.remove();
    }
    else if (projecctParam[num][4] == 2) {
        document.getElementById("button").innerHTML = "Click Me!";
        click.setAttribute("href", "portfolio/coming-soon");
    }
    else {
        click.setAttribute("href", projecctParam[num][4]);
    }

    /* adds videos to projects where applicable */
    if (projecctParam[num][5] == 1) {
        video.remove();
        playpause.remove();
        refresh.remove();
        fullscreen.remove();
        backward.remove();
        forward.remove();
    }
    else if (projecctParam[num][5] == 2) {
        video.remove();
        playpause.remove();
        refresh.remove();
        fullscreen.remove();
        backward.remove();
        forward.remove();

        const projectPic = document.createElement('img');
        projectPic.setAttribute('class', "picture");
        projectPic.setAttribute('src', projecctParam[num][6]);
        picture.appendChild(projectPic);
    }
    else {
        var source = document.createElement('source');
        source.setAttribute('src', projecctParam[num][5]);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
    }

    /* adds extra pictures for hardware projects */
    if (projecctParam[num][7] == 1 || projecctParam[num][7] == null) {
        otherPics.remove();
    }
    else if (projecctParam[num][7] == 2) {
        otherPics.setAttribute("class", "pictureGrid1");

        const otherPic1 = document.createElement("img");
        const otherPic2 = document.createElement("img");
        const otherPic3 = document.createElement("img");

        otherPic1.setAttribute("class", "otherPicture");
        otherPic1.setAttribute("src", projecctParam[num][8][0]);
        otherPic2.setAttribute("class", "otherPicture");
        otherPic2.setAttribute("src", projecctParam[num][8][1]);
        otherPic3.setAttribute("class", "otherPicture");
        otherPic3.setAttribute("src", projecctParam[num][8][2]);

        otherPics.appendChild(otherPic1);
        otherPics.appendChild(otherPic2);
        otherPics.appendChild(otherPic3);
    }
    else {
        otherPics.setAttribute("class", "pictureGrid2");
        const otherPic1 = document.createElement("img");
        const otherPic2 = document.createElement("img");
        const otherPic3 = document.createElement("img");
        const otherPic4 = document.createElement("img");
        const otherPic5 = document.createElement("img");

        otherPic1.setAttribute("class", "otherPicture");
        otherPic1.setAttribute("src", projecctParam[num][8][0]);
        otherPic2.setAttribute("class", "otherPicture");
        otherPic2.setAttribute("src", projecctParam[num][8][1]);
        otherPic3.setAttribute("class", "otherPicture");
        otherPic3.setAttribute("src", projecctParam[num][8][2]);
        otherPic4.setAttribute("class", "otherPicture");
        otherPic4.setAttribute("src", projecctParam[num][8][3]);
        otherPic5.setAttribute("class", "otherPicture");
        otherPic5.setAttribute("src", projecctParam[num][8][4]);

        otherPics.appendChild(otherPic1);
        otherPics.appendChild(otherPic2);
        otherPics.appendChild(otherPic3);
        otherPics.appendChild(otherPic4);
        otherPics.appendChild(otherPic5);
    }
}

function play() {
    var video = document.getElementById('video');
    var pauseplay = document.getElementById('pauseplay');
    var button = document.getElementById('play');


    if (video.paused == true) {
        video.play();
        button.setAttribute("class", "fa-solid fa-pause")
    }
    else {
        video.pause();
        button.setAttribute("class", "fa-solid fa-play")
    }
}

function videoAction(x) {
    var video = document.getElementById("video");
    if (video != null) {
        switch (x) {
            case "k":
                play();
                break;
            case "f":
                fullscreen();
                break;
            case "r":
                refresh();
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
}


function refresh() {
    var video = document.getElementById('video');
    video.currentTime = 0;
    video.pause();

    var button = document.getElementById('play');
    button.setAttribute("class", "fa-solid fa-play")
}

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

function backward() {
    var video = document.getElementById('video');
    video.currentTime -= 10;
}

function forward() {
    var video = document.getElementById('video');
    video.currentTime += 10;
}