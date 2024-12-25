import param from '../data/project-param.json' with {type: "json"};
import projectSummary from '../data/project-summary.json' with {type: "json"};
import homePage from '../data/home-text.json' with {type: "json"};
import wait from './wait.js';




//////////////////////////////////////////////
///// load data from json into HTML file /////
///// dynamically styles HTML files //////////
//////////////////////////////////////////////


// global variable to track which section the user is currently viewing
var currentSection;


// loads contents of the home page, adds event listeners and rescales recaptcha 
export function home() {

    styleHome();
    document.querySelector(".page").classList.remove("hide")

    let resizeSocials = new ResizeObserver(() => {
        scaleSocials();
    });

    document.getElementById("overviewText").innerHTML = homePage.overview;
    document.getElementById("workText").innerHTML = homePage.plangroup;
    document.getElementById("marqueeText").innerHTML = homePage.marqueeText;
    document.getElementById("marqueeText2").innerHTML += homePage.marqueeText;

    let prev = document.getElementById("prevSection"),
        next = document.getElementById("nextSection"),
        form = document.querySelector(".form");

    prev.addEventListener("click", function () { toggleSection(1) })
    next.addEventListener("click", function () { toggleSection(2) })

    wait(".form", 2).then(() => {
        scaleSocials();
        resizeSocials.observe(form);
    });

    wait("navbar", 1).then(() => {
        window.addEventListener("resize", () => { styleHome() });
    });

    wait(".g-recaptcha", 2).then(() => {
        scaleCaptcha();
        window.addEventListener('resize', () => { scaleCaptcha() });
    });
}


// switches css to suit landscape or portrait mode
function styleHome() {
    let viewport = document.documentElement.getBoundingClientRect(),
        navbarHeight = document.getElementById("navbar").getBoundingClientRect().height,
        vh = viewport.height - navbarHeight,
        vw = viewport.width,
        unit,
        stylingParam = [],
        landscape;

    if (vw >= vh * 1.5) { // landscape
        stylingParam = ["flex", "1.5vw", "50vw", "2vw", "2.1vw", "1.75vw", "4.6vw", "auto", "auto", ""];
        landscape = true;
    }
    else {//portrait
        if (vw > vh) {
            unit = "vw"
        }
        else {
            unit = "vh"
        }
        stylingParam = ["", "2.2" + unit, "100%", "0vw", "2.5" + unit, "2.5" + unit, "4.6" + unit, "100%", "block", "center"];
        landscape = false;
    }

    setHeight(landscape);
    applyCSS(stylingParam)
}





// applies css to elements in home page
function applyCSS(stylingParams) {
    let overviewText = document.getElementById("overviewText"),
        workText = document.getElementById("workText"),
        flexbox = document.querySelectorAll(".flexbox"),
        sectionName = document.querySelectorAll(".sectionName"),
        sectionPicture = document.querySelectorAll(".sectionPicture"),
        workName = document.querySelectorAll(".workName"),
        workDate = document.querySelectorAll(".workDate")


    flexbox.forEach((box) => { box.style.display = stylingParams[0] });

    overviewText.style.fontSize = stylingParams[1];
    overviewText.style.width = stylingParams[2];
    overviewText.style.paddingRight = stylingParams[3];

    workText.style.fontSize = stylingParams[1];
    workText.style.width = stylingParams[2];
    workName.forEach((name) => { name.style.fontSize = stylingParams[4]; });
    workDate.forEach((date) => { date.style.fontSize = stylingParams[5]; });

    sectionName.forEach((section) => { section.style.fontSize = stylingParams[6] })
    sectionPicture.forEach((section) => { section.style.width = stylingParams[7] })
    sectionPicture.forEach((section) => { section.style.display = stylingParams[8] })
    sectionPicture.forEach((section) => { section.style.textAlign = stylingParams[9] })
}



// scrolls to the next or previous section of main page
function toggleSection(selector) {

    let sections = document.querySelectorAll(".section");
    sections = Array.from(sections);

    if (currentSection === 'top' && selector === 1) {
        document.getElementById("top").scrollIntoView();
    }
    else if (currentSection === 'contact' && selector === 2) {
        document.getElementById("contact").scrollIntoView();
    }
    else {

        let index = getSectionNum(currentSection);

        if (selector == 1) {
            sections[index - 1].scrollIntoView();
        }
        else if (selector == 2) {
            sections[index + 1].scrollIntoView();
        }
        else {
            alert("Catastrophic failure, please contact support@georgescoding.com.")
        }
    }
}


// creates an intersection observer to see when the user's viewport has crossed into the next or previous section
// accounts for height offset from navbar
export function observer() {
    let navbarHeight = navbar.getBoundingClientRect().height.toString(),
        marginHeight = navbarHeight + "px 0px 0px",
        observer,
        options = {
            root: null,
            rootMargin: marginHeight,
            threshold: 0.5
        },
        target = document.querySelectorAll(".section");

    observer = new IntersectionObserver(handleIntersect, options);

    target.forEach(section => {
        observer.observe(section)
    })
}


// updates the navbar section style depending on the current section
function handleIntersect(entries) {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            let href,
                navSection = document.querySelectorAll(".navSection"),
                sectionIndex = getSectionNum(entry.target.id) - 1;

            navSection.forEach((section) => { section.classList.remove("highlight") })

            revealSection(entry.target);

            if (entry.target.id != "welcomePage") {
                href = "#" + entry.target.id;
                navSection[sectionIndex].classList.add("highlight")
            }
            else {
                href = "#top"
            }
            currentSection = href.slice(1);
        }
    })
}



// make each section fit exactly the entire pages
function setHeight(landscape) {
    let navbar = document.getElementById("navbar"),
        centerVertical = document.querySelectorAll(".centerVertical"),
        sections = document.querySelectorAll(".section");

    let navbarHeight = navbar.getBoundingClientRect().height,
        vh = Math.max(document.documentElement.getBoundingClientRect().height || 0, window.innerHeight || 0),
        sectionHeight = vh - navbarHeight,
        sectionHeightCSS = sectionHeight.toString() + "px",
        welcomeHeight = centerVertical[0].getBoundingClientRect().height,
        contactHeight = centerVertical[3].getBoundingClientRect().height;



    if (landscape) {
        centerVertical.forEach((section) => section.style.top = ((sectionHeight - section.getBoundingClientRect().height) / 2).toString() + "px")
    }
    else {
        centerVertical.forEach((section) => section.style.top = "0px")
        centerVertical[0].style.top = ((sectionHeight - welcomeHeight) / 2).toString() + "px";
        centerVertical[3].style.top = ((sectionHeight - welcomeHeight) / 2).toString() + "px";

    }

    sections = Array.from(sections)
    sections.splice(3, 1)
    sections.forEach((section) => { section.style.height = sectionHeightCSS })
}


function revealSection(currentSection) {
    let sections = document.querySelectorAll(".section");
    sections = [].slice.call(sections, 1)

    sections.forEach((section) => {
        if (section != currentSection) {
            section.classList.remove("fade");
        }
    })

    if (currentSection.id != "welcomePage") {
        currentSection.classList.add("fade")
    }
}
// loads each the project summary for each card
export function summary(mainPage) {
    scaleProjects(mainPage);
    window.addEventListener('resize', () => { scaleProjects(mainPage) });

    document.getElementById("chessText").innerHTML += projectSummary.chess;
    document.getElementById("breathalyzerText").innerHTML += projectSummary.breathalyzer;
    document.getElementById("portfolioText").innerHTML += projectSummary.portfolio;
    document.getElementById("blackjackText").innerHTML += projectSummary.blackjack;
    document.getElementById("sensorText").innerHTML += projectSummary.pHsensor;
    document.getElementById("minesweeperText").innerHTML += projectSummary.minesweeper;

    if (!mainPage) {
        document.getElementById("calculatorText").innerHTML += projectSummary.calculator;
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
    let mins = (video.duration / 60) | 0,
        seconds = (video.duration - (mins * 60)) | 0,
        currentMin = (video.currentTime / 60) | 0,
        currentSeconds = ((video.currentTime - (currentMin * 60)) | 0).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
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
    let video = document.getElementById('video'),
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
            let length = project.pictures.length,
                slides = [];

            for (let i = 0; i < length; i++) {
                let fade = document.createElement("div"),
                    image = document.createElement("img");

                fade.setAttribute("class", "slides fade");
                fade.setAttribute("value", i)
                image.setAttribute("src", project.pictures[i]);

                fade.appendChild(image);
                slideshow.appendChild(fade);

                slides.push(fade);
            }
            let prev = document.createElement("a"),
                next = document.createElement("a"),
                number = document.createElement("div"),
                caption = document.createElement("div"),
                buttonContainer = document.createElement("div"),
                captionContainer = document.createElement("div");

            prev.setAttribute("id", "prev");
            prev.setAttribute("title", "Previous picture")
            next.setAttribute("id", "next");
            next.setAttribute("title", "Next picture")

            number.setAttribute("id", "number");
            caption.setAttribute("id", "caption");

            buttonContainer.setAttribute("class", "center");
            captionContainer.setAttribute("class", "center")

            prev.innerHTML = "&#10094;";
            next.innerHTML = "&#10095;";

            buttonContainer.appendChild(prev);
            buttonContainer.appendChild(number);
            buttonContainer.appendChild(next);
            captionContainer.appendChild(caption)

            slideshow.appendChild(captionContainer)
            slideshow.appendChild(buttonContainer);

            return false
        }
    }
    else { // add videos to template
        slideshow.remove();
        let source = document.createElement('source');
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


// loads template html into individual project page using an XHL request
export function template() {
    let request = new XMLHttpRequest();

    request.open('GET', '../src/template', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let text = request.responseText;

            document.querySelector('#content').innerHTML = text;
        }
    };

    request.send();
}


// adds text and media into template file
export async function project(projectName) {

    let num = getProjectNum(projectName);
    const projectParam = [param.chess, param.breathalyzer, param.blackjack, param.calculator, param.minesweeper, param.pHsensor, param.portfolio];
    let project = projectParam[num];

    // wait untill the template page has loaded
    wait("projectName", 1).then(() => {
        document.getElementById("projectName").innerHTML = project.name;
        document.getElementById("tools").innerHTML += project.tools;
        document.getElementById("github").href = project.github;
        document.getElementById("text").innerHTML = project.description;
        let video = document.getElementById("video");

        // add event listeners to video elements
        if (editTemplate(project, num)) {
            import("./media-control.js").then((control) => {
                control.buttonPress()
                window.addEventListener("keydown", (e) => control.videoAction(e.key));
                video.addEventListener("click", () => control.play())
            });
        }
        else { // add event llisteners to slideshow elements and initializes the slideshow
            import("./effects.js").then((effects) => {
                effects.addListeners(project.captions)
                effects.slideshow(1, project.captions);
            })
        }
    });
}





function scaleProjects(mainPage) {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    let grid = document.querySelector(".grid"),
        info = Array.from(document.querySelectorAll(".info")),
        icons = Array.from(document.querySelectorAll("#icon")),
        learnMore = Array.from(document.querySelectorAll(".learnMore")),
        projects = Array.from(document.querySelectorAll(".text")),
        elements = [].concat(grid, info, icons, learnMore, projects);

    resetClasslist(elements)

    if (!mainPage && vw < 750) {
        grid.classList.add("subMedium")
    }
    else if (!mainPage && vw >= 750) {
        grid.classList.add("subBig")
        if (vw > 1000) {
            grid.classList.add("subHeight")
        }
        else {
            grid.classList.add("auto")
        }
    }
    else if (mainPage && vw < 750) {
        grid.classList.add("mainMedium")
    }
    else if (mainPage && vw >= 750) {
        grid.classList.add("mainBig")
        if (vw > 1000) {
            grid.classList.add("mainHeight")
        }
        else {
            grid.classList.add("auto")
        }
    }

    if (vw < 1060 || vh < 500) {
        info.forEach((section) => {
            section.classList.add("less")
        })
        icons.forEach((icon) => {
            icon.classList.add("less")
        })
        learnMore.forEach((section) => {
            section.classList.add("less")
        })
        projects.forEach((section) => { section.classList.add("hide") })
    }
    else {
        info.forEach((section) => {
            section.classList.add("more")
        })
        icons.forEach((icon) => {
            icon.classList.add("more")
        })
        learnMore.forEach((section) => {
            section.classList.add("more")
        })
        projects.forEach((section) => { section.classList.add("show") })
    }
}



/* reset classlist to default class for all item(s) 
for multiple items, add them in an array*/
function resetClasslist(elements) {
    elements.forEach((subelement) => {
        let size = 1,
            classArr = Array.from(subelement.classList);

        if (subelement.classList.toString().includes("fa fa-github")) {
            size = 2
        }

        while (classArr.length > size) {
            classArr.splice(-1)
        }

        subelement.className = classArr.toString().replace(",", " ");
    })

}

// dynamically resizes recaptcha 
function scaleCaptcha() {
    let width = document.getElementById("recaptcha").offsetWidth,
        scale = width / 304,
        recaptcha = document.querySelector(".g-recaptcha");

    recaptcha.style.transform = 'scale(' + scale + ')';
    recaptcha.style.webkitTransform = 'scale(' + scale + ')';
    recaptcha.style.transformOrigin = '0 0';
}


// dynamically resizes the margins for socials to be aligned with the contact form
function scaleSocials() {
    let formHeight = document.querySelector(".form").offsetHeight,
        socials = document.querySelector(".socials"),
        resume = document.querySelector(".resume"),
        reportBug = document.querySelector(".reportBug"),
        margin = (formHeight - resume.offsetHeight * 3) / 4,
        marginCSS = margin.toString() + "px";

    socials.style.marginTop = marginCSS;
    resume.style.marginTop = marginCSS;
    reportBug.style.marginTop = marginCSS;
}