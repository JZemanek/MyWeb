// Responsiv part for navbar menu
const navbar = document.getElementById("navbar");
const navbarSmMenuBtn = document.querySelector("#navbarSmMenuBtn");
const navbarSmMenu = document.querySelector("#navbarSmMenu");

navbarSmMenuBtn.addEventListener("click", () => {
    navbarSmMenuBtn.classList.add("active");
    navbarSmMenu.classList.add("active");
    setTimeout(() => {
        navbarSmMenu.querySelector("#navbarSmMenuContent").classList.add("active");
    }, 10);
    setTimeout(() => {
    navbarSmMenuBtn.style.display = "none";
    }, 380);
});

navbarSmMenu.querySelector(".navbarSmMenuCloseBtn").addEventListener("click", () => {
    navbarSmMenu.querySelector("#navbarSmMenuContent").classList.remove("active");
    navbarSmMenuBtn.style = "";
    setTimeout(() => {
        navbarSmMenu.classList.remove("active");
        navbarSmMenuBtn.classList.remove("active");
    }, 380);
});
