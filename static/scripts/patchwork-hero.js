/// <reference lib="dom" />
export class Component extends HTMLElement {
  #top = 0;
  #height = 0;

  /** @returns {HTMLElement} */
  get hero() {
    return this.querySelector(".Hero");
  }

  connectedCallback() {
    globalThis.addEventListener("load", () => {
      this.#onResize();
    }, { passive: true });
    globalThis.addEventListener("resize", () => {
      this.#onResize();
    }, { passive: true });
    this.#onResize();
  }

  #onResize() {
    requestAnimationFrame(() => {
      this.#top = this.hero.offsetTop;
      this.#height = this.hero.offsetHeight;
      this.hero.style.setProperty("--hero-offset-top", this.#top);
      this.hero.style.setProperty("--hero-offset-height", this.#height);
    });
  }
}

customElements.define("patchwork-hero", Component);
