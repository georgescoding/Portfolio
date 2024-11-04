/* Toggles the flip class for the project cards, creating the fliping animation */
export function flip(x) {
    var card = document.getElementById(x.id);
    card.classList.toggle('flip');
}