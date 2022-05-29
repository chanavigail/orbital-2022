export function popup() {
    const popup = document.getElementById("popupbox");
    popup.classList.toggle("show");
}

export function login() {
    popup();
}

export function register() {
    popup();
}