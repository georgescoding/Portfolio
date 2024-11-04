import { change } from "./load-template";
import { typewriter } from "./typewriter";
import { videoAction } from "./media-control";
import { validate } from "./send-email";
import { flip } from "./toggle-class"

window.history.pushState('', '', location.pathname.slice(0, -1));

window.addEventListener("keydown", (e) => videoAction(e.key));

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
}

window.typing = function typing() { typewriter() }