const skillsCards = document.querySelectorAll(".skill-card");
let startOffsetX, startOffsetY, startWidth, startHeight;
let offsetOperator = "-";

document.querySelectorAll(".skill-card-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const skillCardId = btn.getAttribute("data-card");
    const card = document.getElementById(skillCardId);

    if (!card.classList.contains("card-active")) {
      // Uložíme výchozí pozici a velikost
      const rect = card.getBoundingClientRect();
      const parentRect = card.parentElement.getBoundingClientRect();
      startOffsetX = rect.left - parentRect.left;
      startOffsetY = rect.top
      startWidth = rect.width;
      startHeight = rect.height;

      // Přesuneme kartu na střed viewportu a zvětšíme ji
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Uložíme hodnoty pro zavření
      card.dataset.startOffsetY = startOffsetY;
      card.dataset.startWidth = startWidth;

      const centerX = viewportWidth / 2 - rect.width / 2;
      const centerY = viewportHeight / 2 - rect.height / 2;

      if (card.dataset.startOffsetY < 0) {
        offsetOperator = "+";
        startOffsetY = Math.abs(startOffsetY);
      } else {
        offsetOperator = "-";
      }

      // 1. Posuneme kartu na vršek obrazovky
      card.classList.add("card-expanding");

      // Kontrola jestli je karta v prostřed stránky. Pokud ne, společně s translateY provedeme i translateX na střed.
      if (rect.left !== centerX && rect.right !== centerX) {
        card.style.transform = `translate(${centerX - rect.left}px) translateY(${offsetOperator}${startOffsetY}px)`;;
      } else {
        card.style.transform = `translateY(${offsetOperator}${startOffsetY}px)`;
      }
      card.style.transition = "transform 0.5s ease, width 0.5s ease, height 0.5s ease";

      // Po dokončení prvního přechodu
      card.addEventListener(
        "transitionend",
        (event) => {
          if (event.propertyName === "transform" && card.classList.contains("card-expanding")) {
            // 2. Roztáhneme šířku na celou obrazovku
            card.classList.add("expand-x");
            card.addEventListener(
              "transitionend",
              (event) => {
                if (event.propertyName === "width" && card.classList.contains("expand-x")) {
                  // 3. Roztáhneme výšku na celou obrazovku
                  card.style.transform = "";
                  card.classList.add("expand-y");
                  card.style.transform = `translate(${centerX - rect.left}px, ${centerY - rect.top}px)`;
                  card.addEventListener(
                    "transitionend",
                    (event) => {
                      if (event.propertyName === "height" && card.classList.contains("expand-y")) {
                        card.classList.add("card-active");
                        card.classList.remove("expand-x", "expand-y", "card-expanding");
                      }
                    }, {
                      once: true
                    }
                  );
                }
              }, {
                once: true
              }
            );
          }
        }, {
          once: true
        }
      );

      // Zabráníme scrollování
      document.querySelector("html").style.overflow = "hidden";
    }
  });
});


document.querySelectorAll(".skill-card-close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const skillCardId = btn.getAttribute("data-card");
    const card = document.getElementById(skillCardId);

    if (card.classList.contains("card-active")) {
      // Původní pozice a velikost
      const startX = parseFloat(card.dataset.startX);
      const startY = parseFloat(card.dataset.startY);

      // Transformace zpět na původní místo
      card.style.transform = `translate(${startX}px, ${startY}px)`;
      card.style.transition = "transform 0.5s ease, width 0.5s ease, height 0.5s ease";
      card.querySelector(".skill-card-footer").classList.add("skill-card-footer-visible");
      card.classList.add("card-collapsing")
      // Po dokončení animace resetujeme styl
      card.addEventListener(
        "transitionend",
        () => {
          card.style.transform = "";
          card.classList.remove("card-active");
        }, {
          once: true
        }
      );
      setTimeout(() => {
        card.removeAttribute("style");
        card.classList.remove("card-collapsing");
        // Clear dataset
        card.removeAttribute("data-start-offset-y");
        card.removeAttribute("data-start-width");
      }, 1000);
    }

    // Povolíme scrollování
    document.querySelector("html").removeAttribute("style");
  });
});

const texts = ["Java, Spring Boot, SQL", "HTML, CSS, JavaScript, Vue"]; // Střídané texty
const container = document.getElementById("typewriter-container");

let textIndex = 0; // Aktuální index textu
let charIndex = 0; // Aktuální index znaku
let isDeleting = false; // Indikátor mazání
let isFirstRun = true; // Indikátor prvního spuštění
function cycleTypeWriter() {
  const currentText = texts[textIndex]; // Aktuální text
  const displayedText = isDeleting ?
    currentText.substring(0, charIndex--) // Mazání znaku
    :
    currentText.substring(0, charIndex++); // Přidávání znaku

  container.textContent = displayedText; // Aktualizace obsahu

  // Nastavení rychlosti psaní/mazání
  let delay = isDeleting ? 50 : 100;

  // Kontrola prvního spuštění
  if (isFirstRun) {
    isFirstRun = false;
    // Zpoždění před prvním spuštěním
    delay = 2000;
  }

  if (!isDeleting && charIndex === (currentText.length + 1)) {
    // Konec psaní, čekání před mazáním
    isDeleting = true;
    delay = 2000; // Pauza před mazáním
  } else if (isDeleting && charIndex === 0) {
    // Smazání posledního znaku
    container.textContent = "";
    // Konec mazání, přepnutí na další text
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // Cyklus textů
    delay = 500; // Pauza před dalším textem
  }

  setTimeout(cycleTypeWriter, delay); // Rekurzivní volání funkce
}

let typeCharIndex = 0;
function typeWriter(text, container) {
  if (typeCharIndex < text.length) {
    console.log("Přidávání znaku");
    container.textContent = text.substring(0, charIndex++); // Aktualizace obsahu
    setTimeout(() => {
      typeWriter(text, container); // Rekurzivní volání funkce
    }, 50);
  }
}
window.onload = (() => {
  typeWriter("Podívejte se na technologie, které ovládám, a na oblasti, ve kterých vynikám. Každá karta představuje konkrétní dovednosti a zkušenosti.", document.querySelector(".hero-text").querySelector("p"));
  cycleTypeWriter(); // Spuštění animace
})





/*
const skillsCards = document.querySelectorAll(".skill-card");
let startOffsetX, startOffsetY, startWidth, startHeight;

document.querySelectorAll(".skill-card-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const skillCard = btn.getAttribute("data-card");
    skillsCards.forEach((card) => {
      if (card.id === skillCard && !card.classList.contains("card-active")) {
        // Uložíme výchozí pozici a velikost
        const rect = card.getBoundingClientRect();
        const parentRect = card.parentElement.getBoundingClientRect();
        startOffsetX = rect.left - parentRect.left;
        startOffsetY = rect.top - parentRect.top;
        startWidth = rect.width;
        startHeight = rect.height;

        // Přesuneme kartu na střed viewportu a zvětšíme ji
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const centerX = viewportWidth / 2 - rect.width / 2;
        const centerY = viewportHeight / 2 - rect.height / 2;

        card.style.transform = `translate(${centerX - rect.left}px, ${centerY - rect.top}px) scale(1)`;
        card.style.width = `${viewportWidth}px`;
        card.style.height = `${viewportHeight}px`;
        card.style.zIndex = 10;

        card.classList.add("card-active");
      }
    });
  });
});

document.querySelectorAll(".skill-card-close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const skillCard = btn.getAttribute("data-card");
    const card = document.getElementById(skillCard);

    if (card.classList.contains("card-active")) {
      // Vrátíme kartu na původní místo a velikost
      card.style.transform = `translate(${startOffsetX}px, ${startOffsetY}px) scale(1)`;
      card.style.width = `${startWidth}px`;
      card.style.height = `${startHeight}px`;

      card.addEventListener(
        "transitionend",
        (event) => {
          if (event.propertyName === "transform") {
            // Reset stylů po dokončení animace
            card.removeAttribute("style");
            card.classList.remove("card-active");
          }
        },
        { once: true }
      );
    }
  });
});

*/