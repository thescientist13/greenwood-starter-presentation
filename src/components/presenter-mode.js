import { css, html, LitElement } from 'lit-element';

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
    
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      console.debug('???keydown', keyName);
    
      // As the user releases the Ctrl key, the key is no longer active,
      // so event.ctrlKey is false.
      if (keyName === 'ArrowRight' || keyName === 'Spacebar' || keyName === 'Enter') {
        if ((this.index + 1) === this.slides.length) {
          console.debug('END THE SHOW');
        } else {
          this.index = this.index += 1;
          this.setCurrentSlide(this.index);
        }
      } else if (keyName === 'ArrowLeft') {
        if (this.index > 0) {
          this.index = this.index -= 1;
          this.setCurrentSlide(this.index);
        } else {
          console.debug('AT THE BEGINNING');
        }
      } else if (keyName === 'Escape') {
        console.debug('END THE SHOW');
      }
    }, true);
  }

  enablePresenterMode() {
    console.debug('enablePresenterMode', this.slides);
    
    this.setCurrentSlide();
    this.shadowRoot.querySelector('div').classList.add('fullscreen-container-on');
    // TODO this.shadowRoot.querySelector('iframe').focus();
  }

  setCurrentSlide(index = 0) {
    console.debug('setCurrentSlide', index);
    this.shadowRoot.querySelector('iframe').setAttribute('src', this.slides[index].route);
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