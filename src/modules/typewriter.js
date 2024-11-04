/* Creates a typewriter effect by adding text one character at a time, skips over spaces for a smoother animation */
const text = "  Hi, I'm George";
let i = 0;

export function typewriter() {
    
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typewriter, 150);
    }
}