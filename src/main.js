window.history.pushState('', '', location.pathname.slice(0, -1));

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
}

// root directory
if (window.location.pathname == "/") {
    import("./modules/typewriter.js").then((typewriter) => {
        typewriter.typewriter();
    });
    import("./modules/load-data.js").then((loadText) => {
        loadText.loadHome();
        loadText.loadSummary();
    });
    import("./modules/toggle-class.js").then((toggle) => {
        let cards = document.querySelectorAll(".card");
        cards.forEach(element => element.addEventListener("click", function () { toggle.flip(element) }));
    });


    /* 
    import("./modules/send-email.js").then((email) => {
        let button = document.getElementById("sendButton");
        button.addEventListener("click", email.validate());
    }); */
}/* 
else if (window.location.pathname == "/projects/chess") {
    import("./modules/media-control.js").then((control) => {
        window.addEventListener("keydown", (e) => control.videoAction(e.key));
    });
    import("./modules/load-data.js").then((loadText) => {
        loadText.loadProject();
    });
}
else (
    console.log(window.location.pathname)
)
 */