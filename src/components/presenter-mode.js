import { css, html, LitElement, unsafeCSS } from 'lit-element';
import themeCss from '../styles/theme.css?type=css';

class PresenterMode extends LitElement {
  
  static get properties() {
    return {
      slides: {
        type: Array
      },
      index: Number
    };
  }

  static get styles() {
    return css`
      ${unsafeCSS(themeCss)}

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
    `;
  }

  constructor() {
    super();
    this.slides = [];
    this.index = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    
    window.addEventListener('message', (postMessage) => {
      this.slideNavigationKeyHander(postMessage.data);
    });

    document.addEventListener('keydown', (event) => {
      this.slideNavigationKeyHander(event.key);
    });
  }

  enablePresenterMode() {    
    this.setCurrentSlide();
    this.shadowRoot.querySelector('div').classList.add('fullscreen-container-on');
  }

  setCurrentSlide(index = 0) {
    this.shadowRoot.querySelector('iframe').setAttribute('src', this.slides[index].route);
  }

  slideNavigationKeyHander(keyName) {  
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
  
  render() {
    return html`
      <button @click=${this.enablePresenterMode}>Presenter Mode</button>
      
      <div class="fullscreen-container">
        <iframe></iframe>
      </div>
    `;
  }
}

customElements.define('presenter-mode', PresenterMode);