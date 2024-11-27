import param from '../data/project-param.json' with {type: "json"};
import summary from '../data/project-summary.json' with {type: "json"};
import home from '../data/home-text.json' with {type: "json"};
import wait from './wait.js';




//////////////////////////////////////////////
///// load data from json into HTML file /////
//////////////////////////////////////////////



// loads contents of the home page and adds event listeners
export function loadHome() {
    document.getElementById("overviewText").innerHTML = home.overview;
    document.getElementById("workText").innerHTML = home.plangroup;
    document.getElementById("marqueeText").innerHTML = home.marqueeText;
    document.getElementById("marqueeText2").innerHTML += home.marqueeText;

    var prev = document.getElementById("prevSection"),
        next = document.getElementById("nextSection");

    prev.addEventListener("click", function () { toggleSection(1) })
    next.addEventListener("click", function () { toggleSection(2) })
}


// scrolls to the next or previous section of main page
function toggleSection(selector) {
    var typing = document.getElementById("typing"),
        overview = document.getElementById("overview"),
        experience = document.getElementById("experience"),
        projects = document.getElementById("projects"),
        contact = document.getElementById("contact"),
        top = document.getElementById("top"),
        navbar = document.getElementById("navbar"),
        elements = [typing, overview, experience, projects, contact];

}



export function createObserver() {
    let observer;
    let options = {
        root: null,
        rootMargin: "75% 0% 0%",
        threshold: 0.3
    };
    observer = new IntersectionObserver(handleIntersect, options);
    let target = document.querySelectorAll(".section")
    target.forEach(section => {
        observer.observe(section)
    })
}


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
            removeUnderline();
            document.querySelector("a[href='" + href + "']").style.textDecoration = "underline"
        }
    })
}


// removes underline from navbar sections
function removeUnderline() {
    var top = document.querySelector("a[href='#top']"),
        about = document.querySelector("a[href='#overview']"),
        work = document.querySelector("a[href='#experience']"),
        projects = document.querySelector("a[href='#projects']"),
        contact = document.querySelector("a[href='#contact']"),
        navbar = [top, about, work, projects, contact];

    navbar.forEach((section) => {
        section.style.textDecoration = "none";
    })
}


/* problem is that the handleIntersect function only triggers when there is a change in section, so if the section stays the same, it will not trigger
    need something to remember the last section that is passed through to toggleSection */







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


// edits the template file for the project's individual page
function editTemplate(project, num) {
    var video = document.getElementById('video'),
        click = document.getElementById("clickable"),
        playpause = document.getElementById("playbutton"),
        refresh = document.getElementById("refresh"),
        fullscreen = document.getElementById("fullscreen"),
        backward = document.getElementById("backward"),
        forward = document.getElementById("forward"),
        slideshow = document.getElementById("slideshowContainer");

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

        // add event listeners to video elements
        if (editTemplate(project, num)) {
            import("./media-control.js").then((control) => {
                control.buttonPress()
                window.addEventListener("keydown", (e) => control.videoAction(e.key));
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
