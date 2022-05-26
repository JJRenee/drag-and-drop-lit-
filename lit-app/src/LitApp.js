import { LitElement, html, css } from 'lit';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

export class LitApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'My app';
    this.dragSrcEl = null;
  }

  render() {
    return html`
      ${this.renderStyles()}
      <div class="header">
        <h1>Form Elements</h1>
      </div>
      <div id="build">
        <div id="Basic">
          <div
            @dragstart="${this.handleDragStart}"
            @dragend="${this.handleDragEnd}"
            class="items"
            draggable="true"
            id="input"
          >
            Input
          </div>
          <div
            @dragstart="${this.handleDragStart}"
            @dragend="${this.handleDragEnd}"
            class="items"
            draggable="true"
            id="textarea"
          >
            Text area
          </div>
          <div
            @dragstart="${this.handleDragStart}"
            @dragend="${this.handleDragEnd}"
            class="items"
            draggable="true"
            id="button"
          >
            Button
          </div>
        </div>

        <div
          id="dropzone"
          @drop="${this.handleDrop}"
          @dragover="${this.handleDragOver}"
        ></div>
      </div>
    `;
  }

  handleDragStart(e) {
    this.dragSrcEl = e.target;
    this.style.opacity = '0.4';

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text/plain', e.target.id);
  }

  handleDragEnd(e) {
    this.style.opacity = '1';
  }

  handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  handleDrop(evt) {
    evt.stopPropagation();
    let container = document.createElement('div');
    container.classList.add('container');
    container.ondragstart = evt => {
      // evt.dataTransfer.setData("text/html", evt.target.innerHTML);
      this.dragSrcEl = evt.target;
      console.log(this.dragSrcEl);
    };
    container.ondragover = this.handleDragOver;
    container.ondrop = evt => {
      let target = evt.target;
      if (!target.classList.contains('container')) {
        target = target.parentElement;
      }
      target.insertAdjacentElement('beforebegin', this.dragSrcEl);
      // let temp = target.innerHTML;
      // target.innerHTML = this.dragSrcEl.innerHTML;
      // this.dragSrcEl.innerHTML = temp;
    };
    let button = document.createElement('button');
    button.innerHTML = 'delete';
    button.classList.add('del');
    button.onclick = () => {
      button.parentElement.remove();
    };
    // let input = document.createElement("textarea");
    if (evt.dataTransfer.getData('text/plain')) {
      let input = document.createElement(
        evt.dataTransfer.getData('text/plain')
      );
      let value = prompt('enter placeholder');
      input.placeholder = value;
      input.innerHTML = value;
      container.draggable = true;
      container.append(input);
      container.append(button);
      evt.target.append(container);
    }
  }

  renderStyles() {
    return html`
      <style>
        h1 {
          text-transform: uppercase;
          margin-bottom: 5px;
          margin-bottom: 30px;
        }

        .items {
          width: 200px;
          height: 50px;
          color: rgb(232, 235, 236);
          border: 1px solid rgb(5, 58, 71);
          display: flex;
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          cursor: move;
          transition: 0.2s;
        }

        /* input {
            margin-top: 20px;
            margin-left: 10px;
            width: 100px;
            height: 50px;
          }
          
          textarea {
            margin-top: 10px;
            margin-left: 10px;
          } */
        /* button {
            background-color: rgb(195, 27, 27);
            color: #fff;
          } */
        .items button {
          background-color: #fff;
        }

        .items:active {
          background: rgb(0, 0, 0);
          color: beige;
          border-color: rgb(45, 197, 202);
          font-weight: bold;
        }

        #build {
          display: flex;
          gap: 30px;
        }

        #dropzone {
          height: 500px;
          border: 4px solid rgb(131, 204, 214);
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-radius: 15px;
          flex: 3;
          /* align-items: flex-start; */
          position: relative;
        }

        #dropzone::after {
          content: 'Form';
          font-size: 40px;
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          font-family: sans-serif;
          transform: translate(-50%, -50%);
          opacity: 0.5;
        }

        #dropzone h2 {
          font-size: 40px;
          color: #fff;
          position: absolute;
          top: 30%;
          left: 50%;
        }

        #dropzone button:not(.del) {
          /* height: 40px; */
          resize: both;
          min-width: 150px;
          padding: 10px;
        }

        #dropzone :is(input, textarea) {
          width: 100%;
          padding: 10px;
          /* background-color: #56cee0; */
          border: none;
          border-radius: 5px;
        }

        /* #dropzone .container {
            position: relative;
          } */

        #dropzone.over {
          border-style: dashed;
        }

        #dropzone .container {
          padding: 20px;
          display: flex;
          align-items: center;
          /* gap: 10px; */
        }
      </style>
    `;
  }
}
