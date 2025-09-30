class CharacterGallery {
    constructor() {
        this.data = [];
        this.activeID = 0;
        this.imageView = false;
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
                keywords: card.querySelector('.keywords-list') ? 
                    Array.from(card.querySelectorAll('.keyword-tag')).map(tag => tag.textContent).join(', ') : '',
                get_image_src: card.querySelector('img') ? card.querySelector('img').src : null
            };
        });
    }

    setupEventListeners() {
        const grid = this.container.querySelector('.grid');
        if (!grid) return;

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                e.preventDefault();
                const characterId = card.dataset.id;
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
        
        if (!character) return;

        this.activeID = characterId;
        this.imageView = true;

        this.renderImageView(character);
    }

    renderImageView(character) {
        const imageViewHTML = `
            <div class="imageview-wrapper fadeIn">
                <div class="imageview">
                    ${character.get_image_src ? `
                    <img class="imageview-image" 
                         src="${character.get_image_src}" 
                         alt="${character.title}">
                    ` : ''}
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

        const mainContent = this.container.querySelector('h1, p, .grid');
        if (mainContent) {
            mainContent.style.display = 'none';
        }

        this.container.insertAdjacentHTML('beforeend', imageViewHTML);
        document.body.style.overflow = 'hidden';
    }

    closeImageView() {
        this.imageView = false;
        
        const imageView = this.container.querySelector('.imageview-wrapper');
        if (imageView) {
            imageView.remove();
        }

        const mainContent = this.container.querySelector('h1, p, .grid');
        if (mainContent) {
            mainContent.style.display = '';
        }
        
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CharacterGallery();
});

// También puedes inicializar directamente si los datos están disponibles
if (document.querySelector('.grid')) {
    new CharacterGallery();
}