import { css, html, LitElement } from 'lit-element';

class SlideList extends LitElement {

  static get properties() {
    return {
      slides: {
        type: Array
      }
    };
  }

  static get styles() {
    return css`
      :host {
        max-height: 700px;
        overflow: scroll;
      }

      div {
        position: relative;
      }

      /* https://stackoverflow.com/a/20102415/417806 */
      .iframe-screen {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        cursor: pointer;
        z-index: 100;
      }

      iframe {
        min-height: 200px;
        margin-left: 15px;
        margin-top: -10px;
      }
    `;
  }

  constructor() {
    super();
    this.slides = [];
  }

  slideSelected(slide) {
    document.dispatchEvent(new CustomEvent('slide-selected', { detail: slide }));
  }
  
  render() {
    const { slides } = this;
    const list = slides.map((slide, index) => {
      const slideNum = index += 1;

      return html`
        <span>${slideNum}</span>
        <div @click="${() => this.slideSelected(slide)}">
          <iframe src="${slide.route}" loading="lazy"></iframe>
          <div class="iframe-screen"></div>
        </div>
      `;
    });
    
    return html`
      ${list}
    `;
  }
}

customElements.define('slide-list', SlideList);