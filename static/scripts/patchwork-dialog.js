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
    // Use CSS view transitions
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
    this.buttons.forEach(($button) => $button.ariaExpanded = "true");
    // Use CSS view transitions
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
    // Clean up after "close" event
    this.dialog.addEventListener("close", () => {
      this.buttons.forEach(($button) => $button.ariaExpanded = "false");
    }, {
      once: true,
      signal: this.#controller.signal,
    });
  }

  connectedCallback() {
    this.#internals = this.attachInternals();
    this.#controller = new AbortController();
    // Handle close buttons
    this.buttons.forEach(($button) => {
      $button.addEventListener("click", () => {
        if (this.open) {
          this.close();
        } else {
          this.showModal();
        }
      }, { signal: this.#controller.signal });
    });
    // Capture "Escape" key to animate close
    this.addEventListener("keydown", (ev) => {
      if (this.open && ev.key === "Escape") {
        ev.preventDefault();
        this.close();
      }
    }, { signal: this.#controller.signal });
  }

  disconnectedCallback() {
    this.#controller.abort();
  }
}

customElements.define("patchwork-dialog", Component);
