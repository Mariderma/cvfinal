// Animación para las barras de skills
function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillProgresses.forEach((progress, index) => {
        const percentage = progress.getAttribute('data-percentage');
        setTimeout(() => {
            progress.style.width = percentage + '%';
        }, index * 100); // Retraso escalonado para mejor efecto
    });
}

// Observer para animar cuando la sección es visible
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    });
    
    observer.observe(skillsSection);
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimation();
});