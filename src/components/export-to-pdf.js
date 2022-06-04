import { html, LitElement } from 'lit';
import themeCss from '../styles/theme.css?type=css';

class ExportToPDF extends LitElement {
  
  static get properties() {
    return {
      slides: {
        type: Array
      }
    };
  }

  constructor() {
    super();
    this.slides = [];
  }

  exportToPDF() {
    const iframes = this.slides.map(slide => {
      return `
        <iframe src='${window.location.origin}${slide.route}'></iframe>
      `;
    });
    const winHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${themeCss}

            iframe {
              background-color: var(--color-primary);
              min-width: 100%;
              min-height: 600px;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          ${iframes.join('')}
        </body>
      </html>
    `;

    const winUrl = URL.createObjectURL(
      new Blob([winHtml], { type: 'text/html' })
    );

    window.open(
      winUrl,
      'win',
      'width=800,height=400,screenX=0,screenY=200'
    );
  }
  
  render() {
    return html`
      <button @click=${this.exportToPDF}>Export to PDF</button>
    `;
  }
}

customElements.define('export-pdf', ExportToPDF);