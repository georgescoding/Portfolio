import { projectParam } from "./projects-param.js";


/* adds text and media into the template html file */
export function change(num) {

    document.getElementById("projectName").innerHTML = projectParam[num].name;
    document.getElementById("tools").innerHTML += projectParam[num].tools;
    document.getElementById("github").href = projectParam[num].github;
    document.getElementById("github").style.fontSize = "50px";
    document.getElementById("text").innerHTML = projectParam[num].description;

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
    if (projectParam[num].download = null) {
        click.remove();
    }
    else if (projectParam[num][4] == 2) {
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