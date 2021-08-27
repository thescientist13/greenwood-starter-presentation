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

      span.num {
        float: left
      }

      .wrap {
        width: 100%;
        padding: 0;
        filter: drop-shadow(5px 10px 3px gray);
        height: 0;
        padding-bottom: 56.25%; /* 16:9 */
        position: relative;
      }

      .wrap > iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -moz-transform: scale(0.75);
        -moz-transform-origin: 0 0;
        -o-transform: scale(0.75);
        -o-transform-origin: 0 0;
        -webkit-transform: scale(0.75);
        -webkit-transform-origin: 0 0;
      }
    `;
  }

  constructor() {
    super();
    this.slides = [];
  }

  slideSelected(slide) {
    try {
      const { protocol, host, pathname } = window.location;
      const newurl = `${protocol}//${host}${pathname}?selectedSlideId=${slide.id}`;
      
      window.history.pushState({ path: newurl }, '', newurl);
    } catch (e) {
      console.error(e);
    }

    document.dispatchEvent(new CustomEvent('slide-selected', { detail: slide }));
  }

  slideLoaded(slide) {
    const frame = this.shadowRoot.getElementById(`slide_${slide.id}`);
    const style = document.createElement('style');
    
    style.textContent = `
      body {
        zoom: .4;
      } 
    `;
    
    frame.contentDocument.head.appendChild(style);
  }

  render() {
    const { slides } = this;
    const list = slides.map((slide, index) => {
      const slideNum = index += 1;

      return html`
        <span class="num">${slideNum})</span>
        <div @click="${() => this.slideSelected(slide)}">
          <div class="wrap">
            <iframe
              id="slide_${slide.id}"
              src="${slide.route}"  
              class="scaled-frame"
              @load="${() => this.slideLoaded(slide) }"
              loading="lazy">
            </iframe>
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