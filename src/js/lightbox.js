class Lightbox {
    constructor(object) {
        this.selector = object.selector;
        this.triggers = document.querySelectorAll(object.selector);
        this.type = object.type;
        this.title = object.title;
        this.video = object.video;
        this.eventListener();
    }

    eventListener() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.crateLightbox(trigger);
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.matches('.lightbox') || e.target.matches('.lightbox__close-btn')) this.removeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.removeLightbox();
        });
    }

    crateLightbox(target) {
        const loader = `<div class="lightbox__loader active"><div></div><div></div><div></div><div></div></div>`;
        const box = document.createElement('div');
        box.classList.add('lightbox');
        let content;

        if (this.type === 'iframe') {
            content = `<iframe class="lightbox__iframe lightbox__loaded" src="${target.href}"></iframe>`;
        } else if (this.type === 'image') {
            content = `<img class="lightbox__img lightbox__loaded" src="${target.href}">`;
        } else if (this.type === 'youtube') {
            let url = (new URL(target.href)).searchParams;
            const video = url.get('v');
            let src = `https://www.youtube.com/embed/${video}`;
            const attributes = 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen';
            if (this.video) {
                if (this.video.privacyEnhanced == true) src = `https://www.youtube-nocookie.com/embed/${video}`;
                if (this.video.controls == false) src += '?controls=0';
            }
            content = `<iframe class="lightbox__youtube lightbox__loaded" ${attributes} src="${src}"></iframe>`;
        }

        if (this.title == true) {
            const addTitle = () => target.dataset.title ? target.dataset.title : target.href;
            content += `<div class="lightbox__details"><p class="lightbox__title">${addTitle()}</p></div>`
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
            const contentDOM = document.querySelector('.lightbox__content');
            contentDOM.classList.add('active');
            const loaderDOM = document.querySelector('.lightbox__loader');
            loaderDOM.classList.remove('active');
        })
    }

    removeLightbox() {
        const lightbox = document.querySelector(`.lightbox`);
        if (lightbox) lightbox.remove();
    }
}