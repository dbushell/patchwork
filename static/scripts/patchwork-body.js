/// <reference lib="dom" />
export class Component extends HTMLElement {
  connectedCallback() {
    /* Do something? */
  }
}

customElements.define("patchwork-body", Component);
