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
      iframe {
        min-height: 200px;
      }
    `;
  }

  constructor() {
    super();
    this.slides = [];
  }
  
  render() {
    const { slides } = this;
    const list = slides.map((slide) => {
      return html`
        <iframe src="${slide.route}"></iframe>
      `;
    });
    
    return html`
      ${list}
    `;
  }
}

customElements.define('slide-list', SlideList);