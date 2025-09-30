// Animación para las barras de skills
function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillProgresses.forEach(progress => {
        const percentage = progress.getAttribute('data-percentage');
        progress.style.width = percentage + '%';
    });
}

// Ejecutar cuando la sección sea visible
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
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimation();
});