const template = document.createElement('template');

template.innerHTML = `
  <style>
    iframe {
      width: 90%;
      height: 700px;
      filter: drop-shadow(5px 10px 3px gray);
    }
  </style>

  <iframe></iframe>
`;

class SlideViewer extends HTMLElement {
  static observedAttributes = ['slide'];

  constructor() {
    super();
    this.slide = {};
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'slide' && newValue) {
      this.slide = JSON.parse(newValue);
      this.render();
    }
  }

  render() {
    this.shadowRoot.querySelector('iframe').setAttribute('src', this.slide.route);
  }
}

customElements.define('slide-viewer', SlideViewer);
