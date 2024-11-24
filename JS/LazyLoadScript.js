
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const cardImages = document.querySelectorAll('.card-image');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    cards.forEach(card => {
        observer.observe(card);
    });

    cardImages.forEach(image => {
        if (image.dataset.src) {
            image.src = image.dataset.src;
            image.addEventListener('load', function() {
                image.removeAttribute('data-src');
            });
        }
    });
});
