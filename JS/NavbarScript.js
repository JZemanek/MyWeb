// Responsiv part for navbar menu
const navbar = document.getElementById("navbar");
const navbarSmMenuBtn = document.querySelector("#navbarSmMenuBtn");
const navbarSmMenu = document.querySelector("#navbarSmMenu");

navbarSmMenuBtn.addEventListener("click", () => {
    navbarSmMenu.classList.add("active");
    setTimeout(() => {
        navbarSmMenu.querySelector("#navbarSmMenuContent").classList.add("active");
    }, 10);
    console.log(navbarSmMenu.classList);
});

navbarSmMenu.querySelector(".navbarSmMenuCloseBtn").addEventListener("click", () => {
    navbarSmMenu.querySelector("#navbarSmMenuContent").classList.remove("active");
    setTimeout(() => {
        navbarSmMenu.classList.remove("active");
    }, 380);
});
