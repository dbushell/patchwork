/// <reference lib="dom" />
export class Component extends HTMLElement {
  connectedCallback() {
    console.log(this);
    /* Do something? */
  }
}

customElements.define("patchwork-scroller", Component);
