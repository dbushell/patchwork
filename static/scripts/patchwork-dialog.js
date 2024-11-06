/// <reference lib="dom" />
export class Component extends HTMLElement {
  /** @type {ElementInternals} */
  #internals;
  /** @type {AbortController} */
  #controller;

  /** @returns {HTMLDialogElement} */
  get dialog() {
    return this.querySelector("dialog");
  }

  /** @returns {Array<HTMLButtonElement>} */
  get buttons() {
    return Array.from(
      document.querySelectorAll(`[aria-controls="${this.dialog.id}"]`),
    );
  }

  /** @returns {boolean} */
  get open() {
    return this.dialog.open;
  }

  /** @returns {boolean} */
  get transition() {
    return "startViewTransition" in document && this.hasAttribute("transition");
  }

  close() {
    if (this.transition) {
      this.#internals.states.add("closing");
      document.startViewTransition(() => {
        this.dialog.close();
      }).finished.then(() => {
        this.#internals.states.delete("closing");
      });
    } else {
      this.dialog.close();
    }
  }

  showModal() {
    this.#onOpen();
    if (this.transition) {
      this.#internals.states.add("opening");
      document.startViewTransition(() => {
        this.dialog.showModal();
      }).finished.then(() => {
        this.#internals.states.delete("opening");
      });
    } else {
      this.dialog.showModal();
    }
    this.dialog.addEventListener("close", () => this.#onClose(), {
      once: true,
      signal: this.#controller.signal,
    });
  }

  #onClose() {
    this.buttons.forEach(($button) => $button.ariaExpanded = "false");
  }

  #onOpen() {
    this.buttons.forEach(($button) => $button.ariaExpanded = "true");
  }

  connectedCallback() {
    this.#internals = this.attachInternals();
    this.#controller = new AbortController();
    this.buttons.forEach(($button) => {
      $button.addEventListener("click", () => {
        if (this.open) {
          this.close();
        } else {
          this.showModal();
        }
      }, { signal: this.#controller.signal });
    });
  }

  disconnectedCallback() {
    this.#controller.abort();
  }
}

customElements.define("patchwork-dialog", Component);
