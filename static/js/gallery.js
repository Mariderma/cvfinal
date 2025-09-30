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
        // Extrae los datos directamente del DOM (de las tarjetas renderizadas por Django)
        const cards = document.querySelectorAll('.card');
        this.data = Array.from(cards).map(card => {
            return {
                slug: card.dataset.id,
                title: card.querySelector('h3').textContent,
                summary: card.querySelector('.summary').textContent.replace('Keywords:', '').trim(),
                keywords: card.querySelector('.keywords').textContent.replace('Keywords:', '').trim(),
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

        // Event listener para el botón de cerrar
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('imageview-close')) {
                this.closeImageView();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.imageView) {
                this.closeImageView();
            }
        });
    }

    openImageView(characterId) {
        const character = this.data.find(char => 
            (char.id && char.id == characterId) || char.slug === characterId
        );
        
        if (!character) return;

        this.activeID = characterId;
        this.imageView = true;

        // Crear y mostrar la vista de imagen
        this.renderImageView(character);
    }

    renderImageView(character) {
        const imageViewHTML = `
            <div class="imageview-wrapper fadeIn">
                <div class="imageview">
                    <img class="imageview-image" 
                         src="${character.get_image_src || ''}" 
                         alt="${character.title}">
                    <div class="imageview-info">
                        <button class="imageview-close">×</button>
                        <h2>${character.title}</h2>
                        <p>${character.summary || ''}</p>
                        <h3>Keywords</h3>
                        <ul>
                            ${character.keywords ? character.keywords.split(',').map(keyword => 
                                `<li>${keyword.trim()}</li>`
                            ).join('') : '<li>No keywords</li>'}
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
        this.container.insertAdjacentHTML('beforeend', imageViewHTML);
    }

    closeImageView() {
        this.imageView = false;
        
        // Remover la vista de imagen
        const imageView = this.container.querySelector('.imageview-wrapper');
        if (imageView) {
            imageView.remove();
        }

        // Mostrar la galería principal nuevamente
        const mainContent = this.container.querySelector('h1, p, .grid');
        if (mainContent) {
            mainContent.style.display = '';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CharacterGallery();
});

// También puedes inicializar directamente si los datos están disponibles
if (document.querySelector('.grid')) {
    new CharacterGallery();
}