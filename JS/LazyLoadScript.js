
document.addEventListener('DOMContentLoaded', function() {
    const lazyElements = document.querySelectorAll('.lazy-loading');
    const skillCards = document.querySelectorAll('.skill-card');

    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(80px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, options);

    lazyElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});