let slideIndex = 0;
        const slidesInView = 4; // Maximální počet zobrazených certifikátů

        function changeSlide(n) {
            const slides = document.querySelectorAll('.slides a');
            const slidesCount = slides.length;

            // Výpočet indexu posunu
            slideIndex += n;

            // Omezení rozsahu posunu
            if (slideIndex < 0) {
                slideIndex = 0;
            } else if (slideIndex > slidesCount - slidesInView) {
                slideIndex = slidesCount - slidesInView;
            }

            // Posunutí slideru
            const slideWidth = (100 / slidesInView) * slideIndex;
            document.querySelector('.slides').style.transform = `translateX(-${slideWidth}%)`;
        }