//Proměnné a funkce pro zobrazení a skrytí skills z kurzu na malých zařízeních.
let znalostiKurz = document.getElementById("znalostiKurz");
let tlacitkoKurz = document.getElementById("tlacitkoKurz");

tlacitkoKurz.addEventListener("click", function () {
    if (znalostiKurz.style.display === "none" || znalostiKurz.style.display === "") {
        znalostiKurz.style.display = "block";
        tlacitkoKurz.textContent = "Skrýt";
        tlacitkoKurz.style.backgroundColor = "red"; 
    } else {
        znalostiKurz.style.display = "none";
        tlacitkoKurz.textContent = "Zobrazit";
        tlacitkoKurz.style.backgroundColor = "green"; 
    }
});
//Proměnné a funkce pro zobrazení a skrytí skills mimo kurz na malých zařízeních.
let znalostiMimoKurz = document.getElementById("znalostiMimoKurz");
let tlacitkoMimoKurz = document.getElementById("tlacitkoMimoKurz");

tlacitkoMimoKurz.addEventListener("click", function () {
    if (znalostiMimoKurz.style.display === "none" || znalostiMimoKurz.style.display === "") {
        znalostiMimoKurz.style.display = "block";
        tlacitkoMimoKurz.textContent = "Skrýt";
        tlacitkoMimoKurz.style.backgroundColor = "red"; 
    } else {
        znalostiMimoKurz.style.display = "none";
        tlacitkoMimoKurz.textContent = "Zobrazit";
        tlacitkoMimoKurz.style.backgroundColor = "green"; 
    }
});

/*Proměnné certifikáty
let certifikatWeb = document.getElementById("certifikatWeb");
let certifikatJavaZaklad = document.getElementById("certifikatJavaZaklad");
let certifikatJavaOop = document.getElementById("certifikatJavaOop");
let certifikatMysql = document.getElementById("certifikatMysql");
let certifikatJdbc = document.getElementById("certifikatJdbc");
let certifikatBootstrap = document.getElementById("certifikatBootstrap");
let cerifikatZakladJavascipt = document.getElementById("cerifikatZakladJavascipt");
let certifikatGit = document.getElementById("certifikatGit");
*/

 