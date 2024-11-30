// function that only runs code once an element has been loaded
// is more smoother than waiting for the entire document to be loaded
export default function wait(name, selector) {
    let nameObject;
    if (selector == 1) {
        nameObject = document.getElementById(name);
    }
    else {
        nameObject = document.querySelector(name);
    }

    return new Promise(resolve => {
        if (document.getElementById(name)) {
            return resolve(document.getElementById(name));
        }

        const observer = new MutationObserver(() => {
            if (document.getElementById(name)) {
                observer.disconnect();
                resolve(document.getElementById(name));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}