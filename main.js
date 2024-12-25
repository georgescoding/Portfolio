// remove trailing slash from url
window.history.pushState('', '', location.pathname.slice(0, -1));


///////////////////////////////////////////////////////////////////////
///// dynamically load modules depending on the current directory /////
///////////////////////////////////////////////////////////////////////

// root directory
if (window.location.pathname == "/") {
    import("./src/modules/load-data.js").then((load) => {
        load.checkSession();

        load.home();
        load.summary(true);
        window.addEventListener("load", () => {
            load.observer();
        }, false);
        window.addEventListener("resize", () => {
            load.observer();
        }, false);
    });
    import("./src/modules/effects.js").then((effects) => {
        effects.typewriter();
        let cards = document.querySelectorAll(".card");
        cards.forEach(element => element.addEventListener("click", function () { effects.flip(element) }));
    });
    import("./src/modules/send-email.js").then((email) => {
        let button = document.getElementById("sendButton");
        button.addEventListener("click", function () { email.validate() });
    });
}
// projects directory
else if (window.location.pathname == "/projects") {
    import("./src/modules/load-data.js").then((load) => {
        load.summary(false);
    });
    import("./src/modules/effects.js").then((effects) => {
        let cards = document.querySelectorAll(".card");
        cards.forEach(element => element.addEventListener("click", function () { effects.flip(element) }));
    });
}
// individual project directory
else if (window.location.pathname.includes("/projects/")) {
    import("./src/modules/load-data.js").then((load) => {
        load.template()
        load.project(window.location.pathname);
    });
}