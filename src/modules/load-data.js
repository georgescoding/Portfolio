import param from '../data/project-param.json' with {type: "json"};
import summary from '../data/project-summary.json' with {type: "json"};
import home from '../data/home-text.json' with {type: "json"};
import wait from './wait.js';





//////////////////////////////////////////////
///// load data from json into HTML file /////
//////////////////////////////////////////////


// global variable to track which section the user is currently viewing
var currentSection;


// loads contents of the home page, adds event listeners and rescales recaptcha 
export function loadHome() {
    document.getElementById("overviewText").innerHTML = home.overview;
    document.getElementById("workText").innerHTML = home.plangroup;
    document.getElementById("marqueeText").innerHTML = home.marqueeText;
    document.getElementById("marqueeText2").innerHTML += home.marqueeText;

    var prev = document.getElementById("prevSection"),
        next = document.getElementById("nextSection");

    prev.addEventListener("click", function () { toggleSection(1) })
    next.addEventListener("click", function () { toggleSection(2) })

    wait(".g-recaptcha", 2).then(() => {
        scaleCaptcha();
        window.addEventListener('resize', () => { scaleCaptcha() });
    });
}


// scrolls to the next or previous section of main page
function toggleSection(selector) {
    var top = document.getElementById("top"),
        overview = document.getElementById("overview"),
        experience = document.getElementById("experience"),
        projects = document.getElementById("projects"),
        contact = document.getElementById("contact"),
        elements = [top, overview, experience, projects, contact];

    if (currentSection === 'top' && selector === 1) {
        top.scrollIntoView();
    }
    else if (currentSection === 'contact' && selector === 2) {
        contact.scrollIntoView();
    }
    else {
        var index = getSectionNum(currentSection);
        if (selector == 1) {
            elements[index - 1].scrollIntoView();
        }
        else if (selector == 2) {
            elements[index + 1].scrollIntoView();
        }
        else {
            alert("Catastrophic failure, please contact support@georgescoding.com.")
        }
    }
}


// creates an intersection observer to see when the user's viewport has crossed into the next or previous section
export function createObserver() {
    let observer;
    let options = {
        root: null,
        rootMargin: "75% 0% 0%",
        threshold: 0.3
    };
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if (vw < 750) {
        options.threshold = 0.6;
    }

    observer = new IntersectionObserver(handleIntersect, options);
    let target = document.querySelectorAll(".section")
    target.forEach(section => {
        observer.observe(section)
    })
}


// updates the navbar section style depending on the current section
function handleIntersect(entries) {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            let href;
            if (entry.target.id === "typing" || entry.target.id === "marquee") {
                href = "#top";
            }
            else {
                href = "#" + entry.target.id;
            }
            removeStyle();
            revealSection(entry.target);

            currentSection = href.slice(1);
            document.querySelector("a[href='" + href + "']").style.backgroundColor = "rgb(62, 105, 121)";
            document.querySelector("a[href='" + href + "']").style.borderRadius = "10px";
            document.querySelector("a[href='" + href + "']").style.padding = "0px 10px";

        }
    })
}


// removes all styling from every navbar section
function removeStyle() {
    var top = document.querySelector("a[href='#top']"),
        about = document.querySelector("a[href='#overview']"),
        work = document.querySelector("a[href='#experience']"),
        projects = document.querySelector("a[href='#projects']"),
        contact = document.querySelector("a[href='#contact']"),
        navbar = [top, about, work, projects, contact];

    navbar.forEach((section) => {
        section.style.backgroundColor = "";
        section.style.borderRadois = "";
        section.style.padding = "";
    })
}


function revealSection(currentSection) {
    let sections = document.querySelectorAll(".section");
    sections = [].slice.call(sections, 2)

    sections.forEach((section) => {
        if (section != currentSection) {
            section.classList.remove("fade");
            section.style.visibility = "hidden";
        }
    })

    if ((!currentSection.classList.contains("fade")) && currentSection.id != "typing" && currentSection.id != "marquee") {
        currentSection.classList.add("fade")
        currentSection.style.visibility = "visible";
    }
}


// loads each the project summary for each card
export function loadSummary(mainPage) {
    document.getElementById("chessText").innerHTML += summary.chess;
    document.getElementById("breathalyzerText").innerHTML += summary.breathalyzer;
    document.getElementById("portfolioText").innerHTML += summary.portfolio;
    document.getElementById("blackjackText").innerHTML += summary.blackjack;
    document.getElementById("sensorText").innerHTML += summary.pHsensor;
    document.getElementById("minesweeperText").innerHTML += summary.minesweeper;

    if (!mainPage) {
        document.getElementById("calculatorText").innerHTML += summary.calculator;
    }
}


// returns the project's order in the parameter list
function getProjectNum(projectName) {
    const projectMap = new Map([
        ["chess", 0],
        ["breathalyzer", 1],
        ["blackjack", 2],
        ["calculator", 3],
        ["minesweeper", 4],
        ["ph-sensor", 5],
        ["portfolio", 6]
    ]);
    return projectMap.get(projectName.replace("/projects/", ""));
}


// returns the section's order in the parameter list
function getSectionNum(sectionName) {
    const sectionMap = new Map([
        ["top", 0],
        ["overview", 1],
        ["experience", 2],
        ["projects", 3],
        ["contact", 4]
    ]);

    return sectionMap.get(sectionName);
}


// adds the video timer to the video
function videoTimer(video) {
    var mins = (video.duration / 60) | 0,
        seconds = (video.duration - (mins * 60)) | 0,
        currentMin = (video.currentTime / 60) | 0,
        currentSeconds = ((video.currentTime - (currentMin * 60)) | 0).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    document.getElementById("time").innerHTML = currentMin + ":" + currentSeconds + "/" + mins + ":" + seconds;
    document.getElementById("progressBar").value = Math.round((video.currentTime / video.duration) * 100);
}

function setCookie(c_name, value, exdays) { var exdate = new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()); document.cookie = c_name + "=" + c_value; }

function getCookie(c_name) { var c_value = document.cookie; var c_start = c_value.indexOf(" " + c_name + "="); if (c_start == -1) { c_start = c_value.indexOf(c_name + "="); } if (c_start == -1) { c_value = null; } else { c_start = c_value.indexOf("=", c_start) + 1; var c_end = c_value.indexOf(";", c_start); if (c_end == -1) { c_end = c_value.length; } c_value = unescape(c_value.substring(c_start, c_end)); } return c_value; }

export function checkSession() {
    var c = getCookie("visited");
    if (c === "yes") {
    } else {
        alert("Welcome new visitor! \n\n Please note that this website is still under development, so features may or may not work properly. If you an encounter an error or have any feedback, please email support@georgescoding.com. \n\n Thanks for your understanding! \n\n - George");
    }
    setCookie("visited", "yes", 7); // expire in 1 year; or use null to never expire
}

// edits the template file for the project's individual page
function editTemplate(project, num) {
    var video = document.getElementById('video'),
        click = document.getElementById("clickable"),
        playpause = document.getElementById("videoButtons"),
        refresh = document.getElementById("refresh"),
        fullscreen = document.getElementById("fullscreen"),
        backward = document.getElementById("backward"),
        forward = document.getElementById("forward"),
        slideshow = document.getElementById("slideshowContainer"),
        progressBar = document.getElementById("progressContainer"),
        time = document.getElementById("time");

    // add or remove clickable button
    if (num == 6) {
        document.getElementById("button").innerHTML = "Click Me!";
        click.setAttribute("href", "portfolio/coming-soon");
    }
    else if (typeof project.download == 'undefined') {
        click.remove();
    }
    else {
        click.setAttribute("href", project.download);
    }

    // add pictures to template
    if (typeof project.video == 'undefined') {
        video.remove();
        playpause.remove();
        refresh.remove();
        fullscreen.remove();
        backward.remove();
        forward.remove();
        progressBar.remove();
        time.remove();

        // add pictures to slideshow
        if (typeof project.pictures != 'undefined') {
            var length = project.pictures.length;

            for (let i = 0; i < length; i++) {
                let fade = document.createElement("div"),
                    number = document.createElement("div"),
                    image = document.createElement("img"),
                    caption = document.createElement("img");

                fade.setAttribute("class", "slides fade");
                number.setAttribute("class", "number");
                image.setAttribute("src", project.pictures[i]);
                caption.setAttribute("class", "text");
                caption.innerHTML = project.captions[i];

                fade.appendChild(number);
                fade.appendChild(image);
                fade.appendChild(caption);
                slideshow.appendChild(fade);
            }
            let prev = document.createElement("a"),
                next = document.createElement("a");

            prev.setAttribute("class", "prev");
            next.setAttribute("class", "next");

            prev.innerHTML = "&#10094;";
            next.innerHTML = "&#10095;";

            slideshow.appendChild(prev);
            slideshow.appendChild(next);
            return false
        }
    }
    else { // add videos to template
        slideshow.remove();
        var source = document.createElement('source');
        source.setAttribute('src', project.video);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
        video.onloadedmetadata = function () {
            videoTimer(video);
            video.addEventListener("timeupdate", () => videoTimer(video))
        }
        return true
    }
}


// adds text and media into template file
export async function loadProject(projectName) {
    let num = getProjectNum(projectName);
    const projectParam = [param.chess, param.breathalyzer, param.blackjack, param.calculator, param.minesweeper, param.pHsensor, param.portfolio];
    let project = projectParam[num];

    // wait untill the template page has loaded
    wait("projectName", 1).then(() => {
        document.getElementById("projectName").innerHTML = project.name;
        document.getElementById("tools").innerHTML += project.tools;
        document.getElementById("github").href = project.github;
        document.getElementById("github").style.fontSize = "3vw";
        document.getElementById("text").innerHTML = project.description;
        var video = document.getElementById("video");

        // add event listeners to video elements
        if (editTemplate(project, num)) {
            import("./media-control.js").then((control) => {
                control.buttonPress()
                window.addEventListener("keydown", (e) => control.videoAction(e.key));
                video.addEventListener("click", () => control.play())
            });
        }
        else { // add event llisteners to slideshow elements and create the slideshow
            import("./effects.js").then((effects) => {
                effects.addListeners()
                effects.slideshow(1);
            });
        }
    });
}


// resizes recaptcha 
function scaleCaptcha() {
    var width = document.getElementById("recaptcha").offsetWidth,
        scale = width / 304,
        recaptcha = document.querySelector(".g-recaptcha");

    recaptcha.style.transform = 'scale(' + scale + ')';
    recaptcha.style.webkitTransform = 'scale(' + scale + ')';
    recaptcha.style.transformOrigin = '0 0';
}