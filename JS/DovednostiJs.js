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
                card.classList.add("card-expanding");
                card.style.transform = `translateY(${transportOperator}${offsetY}px)`;
                card.querySelector(".skill-card-footer").querySelector(".skill-card-btn").disabled = true;
    
                card.addEventListener("transitionend", (event) => {
                    if (event.propertyName === "transform") {
                        card.classList.add("expand-x");
                        card.style.transform = `translateY(${transportOperator}${offsetY}px) translateX(-${offsetX}px)`;
                        
                        card.addEventListener("transitionend", (event) => {
                            if (event.propertyName === "transform") {
                                card.classList.add("expand-y");
                            }

                            card.addEventListener("transitionend", (event) => {
                                if (event.propertyName === "width") {
                                    card.style.transform = "";
                                    card.classList.remove("expand-x");
                                    card.classList.remove("expand-y");
                                    card.classList.add("card-active");
                                    setTimeout(() => {
                                        card.querySelector(".skill-card-footer").classList.add("skill-card-footer-hidden");
                                        card.querySelector(".skill-card-content").classList.add("skill-card-content-show");
                                    }, 400);
                                }
                            }, { once: true });
                        }, { once: true });
                    }
                }, { once: true });
                
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
