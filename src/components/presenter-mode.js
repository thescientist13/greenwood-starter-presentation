const template = document.createElement('template');

template.innerHTML = `
  <style>
    .fullscreen-container {
      display: none;
    }

    .fullscreen-container-on {
      background-color: var(--color-primary);
      display: block;
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    iframe {
      background-color: var(--color-primary);
      min-width: 100%;
      min-height: 100%;
      width: 100%;
      height: 100%;
    }
  </style>

  <button onclick="this.parentNode.host.enablePresenterMode()">Presenter Mode</button>

  <div class="fullscreen-container">
    <iframe></iframe>
  </div>
`;

class PresenterMode extends HTMLElement {
  static observedAttributes = ['slides'];

  constructor() {
    super();
    this.slides = [];
    this.index = 0;
  }

  connectedCallback() {
    window.addEventListener('message', (postMessage) => {
      this.slideNavigationKeyHandler(postMessage.data);
    });

    document.addEventListener('keydown', (event) => {
      this.slideNavigationKeyHandler(event.key);
    });

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'slides' && newValue) {
      this.slides = JSON.parse(newValue);
    }
  }

  enablePresenterMode() {
    this.setCurrentSlide();
    this.shadowRoot.querySelector('div').classList.add('fullscreen-container-on');
  }

  setCurrentSlide(index = 0) {
    this.shadowRoot.querySelector('iframe').setAttribute('src', this.slides[index].route);
  }

  slideNavigationKeyHandler(keyName) {
    if (keyName === 'ArrowRight' || keyName === 'Spacebar' || keyName === 'Enter') {
      if ((this.index + 1) !== this.slides.length) {
        this.index = this.index += 1;
        this.setCurrentSlide(this.index);
      }
    } else if (keyName === 'ArrowLeft') {
      if (this.index > 0) {
        this.index = this.index -= 1;
        this.setCurrentSlide(this.index);
      }
    } else if (keyName === 'Escape') {
      this.shadowRoot.querySelector('div').classList.remove('fullscreen-container-on');
    }
  }
}

customElements.define('presenter-mode', PresenterMode);