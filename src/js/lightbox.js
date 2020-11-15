export default class Lightbox {
    constructor(options) {
        this.options = options;
        this.triggers = document.querySelectorAll(options.selector);
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
        if(this.options.scrollLock != false) document.body.classList.add('scroll-lock');
        const loader = `<div class="lightbox__loader active"><div></div><div></div><div></div><div></div></div>`;
        const box = document.createElement('div');
        box.classList.add('lightbox');
        let content;

        if (this.options.type === 'iframe') {
            content = `<iframe class="lightbox__iframe lightbox__loaded" src="${target.href}"></iframe>`;
        } else if (this.options.type === 'image') {
            function addAlt() {
                const targetImage = target.querySelector('img');
                return targetImage.alt ? `alt="${targetImage.alt}"` : 'alt';
            }

            content = `<img class="lightbox__img lightbox__loaded" ${addAlt()} src="${target.href}">`;

        } else if (this.options.type === 'youtube') {
            let url = (new URL(target.href)).searchParams;
            const video = url.get('v');
            let src = `https://www.youtube.com/embed/${video}`;
            const attributes = 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen';
            if (this.options.video) {
                if (this.options.video.privacyEnhanced == true) src = `https://www.youtube-nocookie.com/embed/${video}`;
                if (this.options.video.controls == false) src += '?controls=0';
            }
            content = `<iframe class="lightbox__youtube lightbox__loaded" ${attributes} src="${src}"></iframe>`;
        }

        if (this.options.title == true) {
            const addTitle = () => target.dataset.title ? target.dataset.title : target.href;
            content += `<div class="lightbox__details"><p class="lightbox__title">${addTitle()}</p></div>`
        }

        box.innerHTML = `
      ${loader}
      <div class="lightbox__content lightbox__content--${this.options.type}">
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
        document.body.classList.remove('scroll-lock');
        const lightbox = document.querySelector(`.lightbox`);
        if (lightbox) lightbox.remove();
    }
}