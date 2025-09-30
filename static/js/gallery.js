class CharacterGallery {
    constructor() {
        this.data = [];
        this.container = document.querySelector('.container');
        this.init();
    }

    init() {
        this.loadDataFromDOM();
        this.setupEventListeners();
    }

    loadDataFromDOM() {
        const cards = document.querySelectorAll('.card');
        this.data = Array.from(cards).map(card => {
            return {
                slug: card.dataset.id,
                title: card.querySelector('.card-title').textContent,
                summary: card.querySelector('.card-summary').textContent,
                keywords: card.querySelector('.keywords-text').textContent,
                get_image_src: card.querySelector('.card-image') ? card.querySelector('.card-image').src : null
            };
        });
        console.log('Loaded characters:', this.data.length);
    }

    setupEventListeners() {
        const grid = document.querySelector('.grid');
        if (!grid) return;

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                e.preventDefault();
                const characterId = card.dataset.id;
                this.openImageView(characterId);
            }
        });

        // Cerrar modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('imageview-close') || 
                e.target.classList.contains('imageview-wrapper')) {
                this.closeImageView();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeImageView();
            }
        });
    }

    openImageView(characterId) {
        const character = this.data.find(char => char.slug === characterId);
        if (!character) return;

        this.renderImageView(character);
    }

    renderImageView(character) {
        // Cerrar modal existente si hay uno
        this.closeImageView();

        const imageViewHTML = `
            <div class="imageview-wrapper fadeIn">
                <div class="imageview">
                    ${character.get_image_src ? `
                        <img class="imageview-image" src="${character.get_image_src}" alt="${character.title}">
                    ` : `
                        <div class="imageview-image" style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;">
                            No Image
                        </div>
                    `}
                    <div class="imageview-info">
                        <button class="imageview-close">×</button>
                        <h2 class="imageview-title">${character.title}</h2>
                        <p class="imageview-description">${character.summary}</p>
                        <div class="imageview-keywords">
                            <strong>Keywords:</strong> ${character.keywords}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', imageViewHTML);
        document.body.style.overflow = 'hidden';
    }

    closeImageView() {
        const imageView = document.querySelector('.imageview-wrapper');
        if (imageView) {
            imageView.remove();
        }
        document.body.style.overflow = '';
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new CharacterGallery();
});