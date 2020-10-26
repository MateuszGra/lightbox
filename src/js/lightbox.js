class Lightbox {
    constructor(object) {
        this.selector = object.selector;
        this.trigers = document.querySelectorAll(object.selector);
        this.type = object.type;
        this.eventListener();
    }

    eventListener() {
        this.trigers.forEach(triger => {
            triger.addEventListener('click', (e) => {
                e.preventDefault();
                this.crateLightbox(triger);
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.matches('.lightbox') || e.target.matches('.lightbox__close-btn')) {
                this.removeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.removeLightbox();
            }
        });
    }

    crateLightbox(target) {
        const loader = `<div class="lightbox__loader active"><div></div><div></div><div></div><div></div></div>`;
        const box = document.createElement('div');
        box.classList.add('lightbox');
        let content;

        if (this.type === 'iframe') {
            content = `<iframe class="lightbox__iframe lightbox__loaded" src="${target.href}"><iframe>`;
        } else if (this.type === 'image') {
            content = `<img class="lightbox__img lightbox__loaded" src="${target.href}">`;
        }

        box.innerHTML = `
      ${loader}
      <div class="lightbox__content lightbox__content--${this.type}">
        <button class="lightbox__close-btn"></button>
        ${content}
      </div>
    `;

        document.body.appendChild(box);
        this.loading();
    }

    loading() {
        const loaded = document.querySelector('.lightbox__loaded');
        loaded.addEventListener('load', () => {
            const conetntDOM = document.querySelector('.lightbox__content');
            conetntDOM.classList.add('active');
            const loaderDOM = document.querySelector('.lightbox__loader');
            loaderDOM.classList.remove('active');
        })
    }

    removeLightbox() {
        const lightbox = document.querySelector(`.lightbox`);
        if (lightbox) lightbox.remove();
    }


}