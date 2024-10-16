/// <reference lib="dom" />
export class Component extends HTMLElement {
  #scrollY = 0;
  #scrollY2 = 0;
  #scrollDir = 1;

  /** @returns {HTMLElement} */
  get root() {
    return document.documentElement;
  }

  connectedCallback() {
    globalThis.addEventListener("load", () => {
      this.#onScroll();
    }, { passive: true });
    globalThis.addEventListener("resize", () => {
      this.#onScroll();
    }, { passive: true });
    globalThis.addEventListener("scroll", () => {
      this.#onScroll();
    }, { passive: true });
    this.#onScroll();
  }

  #onScroll() {
    this.#scrollY2 = this.#scrollY;
    this.#scrollY = globalThis.scrollY;
    this.#scrollDir = Math.max(-1, Math.min(1, this.#scrollY - this.#scrollY2));
    this.#scrollDir = this.#scrollDir === 0 ? 1 : this.#scrollDir;
    this.root.style.setProperty("--scroll-y", this.#scrollY);
    this.root.style.setProperty("--scroll-dir", this.#scrollDir);
  }
}

customElements.define("patchwork-header", Component);
