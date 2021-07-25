import { css, html, LitElement } from 'lit-element';

class SlideList extends LitElement {

  static get properties() {
    return {
      slides: {
        type: Array
      }
    };
  }

  // TODO preserve aspect ratio
  static get styles() {
    return css`
      :host {
        max-height: 700px;
        overflow: scroll;
      }

      div {
        position: relative;
        padding-left: 15px;
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

      /* iframe {
        height: 200px;
        width: 10%;
        margin-left: 15px;
        margin-top: -10px;
        transform: scale(1.5);
        transform-origin: 0 0;
      } */

      span.num {
        float: left
      }

      #wrap {
        width: 100%;
        padding: 0;
        filter: drop-shadow(5px 10px 3px gray);
        height: 0;
        padding-bottom: 56.25%; /* 16:9 */
        position: relative;
      }

      #wrap > iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        zoom: 0.75;
        -moz-transform: scale(0.75);
        -moz-transform-origin: 0 0;
        -o-transform: scale(0.75);
        -o-transform-origin: 0 0;
        -webkit-transform: scale(0.75);
        -webkit-transform-origin: 0 0;
      }

      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        #scaled-frame {
          zoom: 1;
        }
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
        <span class="num">${slideNum})</span>
        <div @click="${() => this.slideSelected(slide)}">
          <div id="wrap">
            <iframe id="scaled-frame" src="${slide.route}" loading="lazy"></iframe>
          </div>
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
