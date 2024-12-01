const cards = document.querySelector('.cards-section-lg').querySelector('.cards-container').querySelectorAll('.card');
const cardsContainer = document.querySelector('.cards-section-lg').querySelector('.cards-container');
let scrollWidth = cards[0].offsetWidth;
document.querySelectorAll(".arrow-toggle").forEach(arrow => {
    arrow.addEventListener("click", () => {
        // Check if it already scrolling. If it is, return.
        if (cardsContainer.classList.contains("scrolling")) {
            return;
        }
        // Add the scrolling class to the cards container
        cardsContainer.classList.add("scrolling");
        // Get the direction
        let direction = arrow.getAttribute("data-toggle");
        if (direction === "next") {
            // Creating slow scrolling animation
            cardsContainer.scrollTo({
                left: cardsContainer.scrollLeft + scrollWidth,
                behavior: "smooth"
            });
        } else {
            cardsContainer.scrollTo({
                left: cardsContainer.scrollLeft - scrollWidth,
                behavior: "smooth"
            });
        }
        // Disable the arrows if there are no more cards to scroll
        if (cardsContainer.scrollLeft === 0 && cardsContainer.scrollLeft < scrollWidth) {
            document.querySelector(".prev-card").disabled = true;
            document.querySelector(".prev-card").style.opa;
        } else {
            document.querySelector(".prev-card").disabled = false;
        }
        if (cardsContainer.scrollLeft + scrollWidth >= (scrollWidth * 3)) {
            document.querySelector(".next-card").disabled = true;
        } else {
            document.querySelector(".next-card").disabled = false;
        }
        // Remove the scrolling class after 500ms
        setTimeout(() => {
            cardsContainer.classList.remove("scrolling");
        }, 500);
    })
});

function typewriter(element, text, speed) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}
window.onload = () => {
    setTimeout(() => {
    typewriter(document.querySelector(".typewriter-text-h"), "<h1>Jan Zemánek</h1>", 100);
    setTimeout(() => {
        typewriter(document.querySelector(".typewriter-text-p"), "<p>Welcome!</p>", 100);
    }, 2500);
    }, 1000);
}
