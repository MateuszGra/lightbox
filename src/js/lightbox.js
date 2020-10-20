class Lightbox {
  constructor(object) {
    this.selector = object.selector;
    this.trigers = document.querySelectorAll(object.selector);
    this.type = object.type;
    this.id = Date.now() + Math.floor(Math.random() * 100);
    this.eventListener();
  }

  eventListener() {
    this.trigers.forEach(triger =>  {
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
    const box = document.createElement('div');
    box.classList.add('lightbox');
    box.dataset.id = this.id;
    let content;

    if (this.type === 'iframe') {
      content =  `<iframe class="lightbox__iframe" src="${target.href}"><iframe>`
    } else if (this.type === 'image') {
      content = `<img class="lightbox__img" src="${target.href}">`
    }

    box.innerHTML = `
      <div class="lightbox__content lightbox__content--${this.type}">
        <button class="lightbox__close-btn"></button>
        ${content}
      </div>
    `

    document.body.appendChild(box);
  }

  removeLightbox() {
    const lightbox = document.querySelector(`.lightbox[data-id="${this.id}"]`);
    if (lightbox) lightbox.remove();
  }
}