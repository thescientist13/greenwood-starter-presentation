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
        width: 90%;
        height: 700px;
        filter: drop-shadow(5px 10px 3px gray);
      }
    `;
  }

  constructor() {
    super();
    this.slide = {};
  }

  render() {
    const { slide } = this;
    const url = slide ? slide.route : '';

    return html`
      <iframe src="${url}"></iframe>
    `;
  }
}

customElements.define('slide-viewer', SlideViewer);
