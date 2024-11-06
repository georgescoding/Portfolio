// remove "/" from pathname
window.history.pushState('', '', location.pathname.slice(0, -1));

// dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
}





///////////////////////////////////////////////////////////////////////
///// dynamically load modules depending on the current directory /////
///////////////////////////////////////////////////////////////////////



// root directory
if (window.location.pathname == "/") {
    import("./modules/effects.js").then((effects) => {
        effects.typewriter();
        let cards = document.querySelectorAll(".card");
        cards.forEach(element => element.addEventListener("click", function () { effects.flip(element) }));
    });
    import("./modules/load-data.js").then((loadText) => {
        loadText.loadHome();
        loadText.loadSummary(true);
    });
    import("./modules/send-email.js").then((email) => {
        let button = document.getElementById("sendButton");
        button.addEventListener("click", function () { email.validate() });
    });
}
// projects directory
else if (window.location.pathname == "/projects") {
    import("./modules/load-data.js").then((loadText) => {
        loadText.loadSummary(false);
    });
    import("./modules/effects.js").then((effects) => {
        let cards = document.querySelectorAll(".card");
        cards.forEach(element => element.addEventListener("click", function () { effects.flip(element) }));
    });
}
// individual project directory
else if (window.location.pathname.includes("/projects/")) {
    import("./modules/media-control.js").then((control) => {
        window.addEventListener("keydown", (e) => control.videoAction(e.key));
        control.buttonPress(document);
    });
    import("./modules/load-data.js").then((loadText) => {
        loadText.loadProject(window.location.pathname);
    });
    import("./modules/effects.js").then((slideshow) => {
        slideshow.slideshow();
    });
}