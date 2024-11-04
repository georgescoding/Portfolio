

window.history.pushState('', '', location.pathname.slice(0, -1));

window.addEventListener("keydown", (e) => videoAction(e.key));

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
}

if (window.location.href == "http://127.0.0.1:5500/") {
    setTimeout(function () { typewriter(); }, 0)
}
else {
    alert("no")
}


import("./modules/myModule.js").then((module) => {
    // Do something with the module.
  });