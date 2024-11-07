import param from '../data/project-param.json' with {type: "json"};
import summary from '../data/project-summary.json' with {type: "json"};
import home from '../data/home-text.json' with {type: "json"};





//////////////////////////////////////////////
///// load data from json into HTML file /////
//////////////////////////////////////////////



// loads contents of the home page
export function loadHome() {
    document.getElementById("overviewText").innerHTML = home.overview;
    document.getElementById("workText").innerHTML = home.plangroup;
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


// adds text and media into template file
export function loadProject(projectName) {
    let num = getProjectNum(projectName);
    const projectParam = [param.chess, param.breathalyzer, param.blackjack, param.calculator, param.minesweeper, param.pHsensor, param.portfolio];
    let project = projectParam[num];

    document.getElementById("projectName").innerHTML = project.name;
    document.getElementById("projectName").innerHTML = project.name;
    document.getElementById("tools").innerHTML += project.tools;
    document.getElementById("github").href = project.github;
    document.getElementById("github").style.fontSize = "3vw";
    document.getElementById("text").innerHTML = project.description;

    var video = document.getElementById('video');
    var click = document.getElementById("clickable");
    var playpause = document.getElementById("playbutton");
    var refresh = document.getElementById("refresh");
    var fullscreen = document.getElementById("fullscreen");
    var backward = document.getElementById("backward");
    var forward = document.getElementById("forward");
    var slideshow = document.getElementById("slideshowContainer");


    // add or remove link to clickable
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
                let fade = document.createElement("div");
                let number = document.createElement("div");
                let image = document.createElement("img");
                let caption = document.createElement("img");

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
            let prev = document.createElement("a");
            let next = document.createElement("a");

            prev.setAttribute("class", "prev");
            next.setAttribute("class", "next");

            prev.innerHTML = "&#10094;";
            next.innerHTML = "&#10095;";

            slideshow.appendChild(prev);
            slideshow.appendChild(next);
        }
    }
    else { // add videos to template
        slideshow.remove();
        var source = document.createElement('source');
        source.setAttribute('src', project.video);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
    }
}