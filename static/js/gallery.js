class CharacterGallery {
    constructor() {
        this.data = [];
        this.activeID = 0;
        this.imageView = false;
        this.container = document.querySelector('.container');
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.loadDataFromDOM();
        this.setupEventListeners();
        console.log('CharacterGallery initialized with', this.data.length, 'characters');
    }

    loadDataFromDOM() {
        const cards = document.querySelectorAll('.card');
        this.data = Array.from(cards).map(card => {
            const title = card.querySelector('.card-title').textContent;
            const summary = card.querySelector('.card-summary').textContent;
            const keywords = card.querySelector('.keywords-list') ? 
                Array.from(card.querySelectorAll('.keyword-tag')).map(tag => tag.textContent).join(', ') : '';
            const image = card.querySelector('.card-image');
            
            return {
                slug: card.dataset.id,
                title: title,
                summary: summary,
                keywords: keywords,
                get_image_src: image ? image.src : null
            };
        });
    }

    setupEventListeners() {
        const grid = this.container.querySelector('.grid');
        if (!grid) {
            console.error('Grid not found');
            return;
        }

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                e.preventDefault();
                const characterId = card.dataset.id;
                console.log('Opening image view for:', characterId);
                this.openImageView(characterId);
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('imageview-close') || 
                e.target.classList.contains('imageview-wrapper')) {
                this.closeImageView();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.imageView) {
                this.closeImageView();
            }
        });
    }

    openImageView(characterId) {
        const character = this.data.find(char => char.slug === characterId);
        
        if (!character) {
            console.error('Character not found:', characterId);
            return;
        }

        this.activeID = characterId;
        this.imageView = true;

        this.renderImageView(character);
    }

    renderImageView(character) {
        // Limpiar cualquier modal existente
        this.closeImageView();

        const imageViewHTML = `
            <div class="imageview-wrapper fadeIn">
                <div class="imageview">
                    ${character.get_image_src ? `
                    <img class="imageview-image" 
                         src="${character.get_image_src}" 
                         alt="${character.title}">
                    ` : '<div class="imageview-image" style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;">No Image</div>'}
                    <div class="imageview-info">
                        <button class="imageview-close">×</button>
                        <h2 class="imageview-title">${character.title}</h2>
                        <p class="imageview-description">${character.summary}</p>
                        <h3 class="imageview-tags-label">TAGS</h3>
                        <ul class="imageview-tags">
                            ${character.keywords ? character.keywords.split(',').map(keyword => 
                                `<li class="imageview-tag">${keyword.trim()}</li>`
                            ).join('') : '<li class="imageview-tag">No tags</li>'}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Ocultar la galería principal
        const mainContent = this.container.querySelector('h1, p, .grid');
        if (mainContent) {
            mainContent.style.display = 'none';
        }

        // Insertar la vista de imagen
        document.body.insertAdjacentHTML('beforeend', imageViewHTML);
        document.body.style.overflow = 'hidden';
    }

    closeImageView() {
        this.imageView = false;
        
        // Remover la vista de imagen
        const imageView = document.querySelector('.imageview-wrapper');
        if (imageView) {
            imageView.remove();
        }

        // Mostrar la galería principal nuevamente
        const mainContent = this.container.querySelector('h1, p, .grid');
        if (mainContent) {
            mainContent.style.display = '';
        }
        
        document.body.style.overflow = '';
    }
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing CharacterGallery...');
    setTimeout(() => {
        new CharacterGallery();
    }, 100);
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CharacterGallery();
    });
} else {
    new CharacterGallery();
}