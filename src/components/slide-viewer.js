import { css, html, LitElement } from 'lit-element';

class SlideViewer extends LitElement {

  static get properties() {
    return {
      slide: {
        type: Object
      }
    };
  }

  static get styles() {
    return css`
      iframe {
        width: 80%;
        height: 400px;
      }
    `;
  }

  constructor() {
    super();
    this.slides = {};
  }
  
  render() {
    const { slide } = this;
    const url = (slide ? slide.route : '');
    
    return html`
      <iframe src="${url}"></iframe>
    `;
  }
}

customElements.define('slide-viewer', SlideViewer);