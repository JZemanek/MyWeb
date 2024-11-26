const skillsCards = document.querySelectorAll(".skill-card");

document.querySelectorAll(".skill-card-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const skillCard = btn.getAttribute("data-card");
        skillsCards.forEach((card) => {
            if (card.id === skillCard && !card.classList.contains("card-active")) {
                const rect = card.getBoundingClientRect();

                let transportOperator = "-";
                let offsetY = rect.top;

                if (offsetY < 0) {
                    offsetY = Math.abs(offsetY);
                    transportOperator = "+";
                } 
                const offsetX = rect.left;
    
                card.style.transition = "transform 0.5s ease, width 0.5s ease, height 0.5s ease, border 0.5s ease";
                card.style.transform = `translateY(${transportOperator}${offsetY}px)`;
    
                card.addEventListener("transitionend", (event) => {
                    if (event.propertyName === "transform") {
                        // Po dokončení transformace změň šířku a přidej další transformaci
                        card.style.width = "calc(100vw - 2px)";
                        card.style.transform = `translateY(${transportOperator}${offsetY}px) translateX(-${offsetX}px)`;
                        console.log("Card width changed to 100vw");
                        // Další posloupnosti na výšku a pevné pozicování
                        card.addEventListener("transitionend", (event) => {
                            console.log("Starting transition for height");
                            if (event.propertyName === "width") {
                                console.log("Starting transition for position");
                                card.style.position = "absolute";
                                card.style.top = "0";
                                card.style.left = "0";
                                card.style.height = `calc(100vh - 2px)`;
                            }
                            console.log("Card height changed to 100vh");
                            card.addEventListener("transitionend", (event) => {
                                console.log("Starting transition for border radius");
                                if (event.propertyName === "height") {
                                    card.style.position = "fixed";
                                    card.style.top = "0";
                                    card.style.left = "0";
                                    card.style.transition="none";
                                    card.style.transform = "none";
                                    card.style.width = "calc(100vw - 2px)";
                                    card.style.height = "calc(100vh - 2px)";
                                    card.style.borderRadius = "0";
                                }
                                console.log("Border radius set to 0");
                            }, { once: true });
                        }, { once: true });
                    }
                }, { once: true });
                card.classList.add("card-active");
                document.querySelector("html").style.overflow = "hidden";
            }
        });
    });
    
});
document.querySelectorAll(".skill-card-close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const cardId = btn.getAttribute("data-card");
        const card = document.getElementById(cardId);

        if (card.classList.contains("card-active")) {
            // Reset transformace a velikosti
            card.style.transform = "";
            card.style.transition = "transform 0.5s ease, width 0.5s ease, height 0.5s ease";
            card.style.width = "300px";
            card.style.height = "200px";

            // Jednorázový posluchač pro reset
            card.addEventListener(
                "transitionend",
                () => {
                    card.style.position = "absolute";
                    card.style.top = "";
                    card.style.left = "";
                    card.style.borderRadius = "10px";
                    card.style.transition = "";
                    card.classList.remove("card-active");
                    document.querySelector("html").style.overflow = "";
                },
                { once: true }
            );
        }
    });
});
