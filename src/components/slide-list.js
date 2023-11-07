const template = document.createElement('template');

template.innerHTML = `
  <style>
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
  </style>
`;

class SlideList extends HTMLElement {
  static observedAttributes = ['slides'];

  constructor() {
    super();
    this.slides = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'slides' && newValue) {
      this.slides = JSON.parse(newValue);
      this.render();
    }
  }

  slideSelected(slideId) {
    try {
      const slide = this.slides.find(slide => slide.id === slideId);
      const { protocol, host, pathname } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?selectedSlideId=${slide.id}`;
      
      window.history.pushState({ path: newUrl }, '', newUrl);
      document.dispatchEvent(new CustomEvent('slide-selected', { detail: slide }));
    } catch (e) {
      console.error(e);
    }
  }

  slideLoaded(slideId) {
    const slide = this.slides.find(slide => slide.id === slideId);
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
    const content = this.slides.map((slide, index) => {
      const slideNum = index += 1;
      const { id, route } = slide;

      return `
        <span class="num">${slideNum})</span>
        <div onclick="this.parentNode.host.slideSelected('${id}')">
          <div class="wrap">
            <iframe
              id="slide_${id}"
              src="${route}"
              class="scaled-frame"
              onload="this.parentElement.parentElement.parentNode.host.slideLoaded('${id}')"
              loading="lazy">
            </iframe>
          </div>
          <div class="iframe-screen"></div>
        </div>
      `;
    });

    // TODO don't need the join?
    template.innerHTML += content.join('');

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

customElements.define('slide-list', SlideList);