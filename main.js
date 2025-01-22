import wait from "./src/modules/wait.js";

// remove trailing slash from url
window.history.pushState('', '', location.pathname.slice(0, -1));

///////////////////////////////////////////////////////////////////////
///// dynamically load modules depending on the current directory /////
///////////////////////////////////////////////////////////////////////

// root directory
if (window.location.pathname == "/") {
    import("./src/modules/load-data.js").then((load) => {
        load.home();
        load.copyright();
        load.summary(true);
        load.showNav();
        load.navbar();
        load.observer();
        window.addEventListener("resize", () => {
            load.observer();
            load.navbar();
        }, false);
    });     
    import("./src/modules/effects.js").then((effects) => {

        import("./src/modules/wait.js").then(() => {
            wait("#typing.start", 2).then(() => {
                effects.typewriter();
            })
        })

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
        load.copyright();
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
        load.copyright();
        load.navbar();
        load.showNav();
    });
}