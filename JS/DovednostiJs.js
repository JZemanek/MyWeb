const skillsCards = document.querySelectorAll(".skill-card");
let startWidth = 0;

document.querySelectorAll(".skill-card-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const skillCard = btn.getAttribute("data-card");
    skillsCards.forEach((card) => {
      if (card.id === skillCard && !card.classList.contains("card-active")) {
        const rect = card.getBoundingClientRect();

        let transportOperator = "-";
        let offsetY = rect.top;
        startWidth = rect.width;
        if (offsetY < 0) {
          offsetY = Math.abs(offsetY);
          transportOperator = "+";
        }
        const offsetX = rect.left;
        card.classList.add("card-expanding");
        card.style.transform = `translateY(${transportOperator}${offsetY}px)`;
        card
          .querySelector(".skill-card-footer")
          .querySelector(".skill-card-btn").disabled = true;

        card.addEventListener(
          "transitionend",
          (event) => {
            if (event.propertyName === "transform") {
              card.classList.add("expand-x");
              card.style.transform = `translateY(${transportOperator}${offsetY}px) translateX(-${offsetX}px)`;

              card.addEventListener(
                "transitionend",
                (event) => {
                  if (event.propertyName === "transform") {
                    card.classList.add("expand-y");
                  }

                  card.addEventListener(
                    "transitionend",
                    (event) => {
                      console.log("event.propertyName", event.propertyName);
                      if (event.propertyName === "width") {
                        card.style.transform = "";
                        card.classList.remove("expand-x");
                        card.classList.remove("expand-y");
                        card.classList.remove("card-expanding");
                        card.classList.add("card-active");
                        setTimeout(() => {
                          card
                            .querySelector(".skill-card-footer")
                            .classList.add("skill-card-footer-hidden");
                          card
                            .querySelector(".skill-card-content")
                            .classList.add("skill-card-content-show");
                        }, 400);
                      }
                    },
                    { once: true }
                  );
                },
                { once: true }
              );
            }
          },
          { once: true }
        );

        document.querySelector("html").style.overflow = "hidden";
      }
    });
  });
});
document.querySelectorAll(".skill-card-close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cardId = btn.getAttribute("data-card");
    const card = document.getElementById(cardId);

    const rect = card.getBoundingClientRect();
    const currentWidth = rect.width; // Aktuální šířka
    const targetWidth = startWidth; // Původní šířka
    const currentOffsetX = rect.left; // Aktuální posun X

    const finalOffsetX = (currentWidth - targetWidth) / 2;

    card.querySelector(".skill-card-content").classList.remove("skill-card-content-show");
    card.querySelector(".skill-card-footer").classList.add("skill-card-content-hide");

    card.classList.add("collapse-y");

    setTimeout(() => {
    card.classList.remove("card-active");
    card.classList.remove("collapse-y");
    card.removeAttribute("style");
    }, 500);
    card
          .querySelector(".skill-card-footer")
          .querySelector(".skill-card-btn").disabled = false;
    document.querySelector("html").removeAttribute("style");

/*     setTimeout(() => {
        card.classList.add("collapse-x");
        card.style.width = `${targetWidth}px`; // Zafixuj původní šířku
        card.style.transform = `translateX(${finalOffsetX}px)`;
    }, 500);

    setTimeout(() => {
        card.querySelector(".skill-card-footer-hidden").classList.remove("skill-card-footer-hidden");
    }, 1000);

    setTimeout(() => {
        card.classList.remove("card-collapsing", "collapse-x", "collapse-y");
    },1500); */
  });
});
