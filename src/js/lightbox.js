class Lightbox {
  constructor(object) {
    this.selector = object.selector;
    this.triger = document.querySelector(object.selector);
    this.click();
  }

  click() {
    this.triger.addEventListener('click', (e) => {
      e.preventDefault();
      const iframe = document.createElement('iframe');
      iframe.src = e.target.href;
      document.body.appendChild(iframe);
    });
  }
}