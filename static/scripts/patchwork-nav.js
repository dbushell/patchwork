/// <reference lib="dom" />
export class Component extends HTMLElement {
  #theme = "";
  #navOpen = false;
  #settingsTop = 0;
  #settingsRight = 0;

  /** @returns {HTMLElement} */
  get nav() {
    return this.querySelector("#nav");
  }

  /** @returns {HTMLElement} */
  get menu() {
    return this.querySelector("#nav-menu");
  }

  /** @returns {HTMLElement} */
  get settings() {
    return this.querySelector("#settings");
  }

  /** @returns {HTMLButtonElement} */
  get settingsButton() {
    return this.querySelector("#settings-button");
  }

  /** @returns {HTMLButtonElement} */
  get settingsLight() {
    return this.querySelector("#settings-light");
  }

  /** @returns {HTMLButtonElement} */
  get settingsDark() {
    return this.querySelector("#settings-dark");
  }

  connectedCallback() {
    this.nav.addEventListener("beforetoggle", (ev) => {
      this.#navOpen = ev.newState === "open";
    });
    this.menu.addEventListener("click", (ev) => {
      if (this.#navOpen && ev.target.closest("[href]")) {
        this.nav.hidePopover();
      }
    });
    globalThis.addEventListener("load", () => {
      this.#onResize();
    }, { passive: true });
    globalThis.addEventListener("resize", () => {
      this.#onResize();
    }, { passive: true });
    globalThis.addEventListener("scroll", () => {
      this.#updateSettings();
    }, { passive: true });
    this.#onResize();
    this.#theme = document.documentElement.getAttribute("data-theme");
    this.#updateTheme();
    this.settingsLight.addEventListener("click", () => {
      this.#onTheme("light");
    });
    this.settingsDark.addEventListener("click", () => {
      this.#onTheme("dark");
    });
  }

  #onResize() {
    this.#updateSettings();
    if (this.#navOpen) {
      const display = globalThis.getComputedStyle(this.nav).display;
      if (display !== "grid") {
        this.nav.hidePopover();
      }
    }
  }

  #updateSettings() {
    const bounds = this.settingsButton.getBoundingClientRect();
    this.#settingsTop = bounds.bottom;
    this.#settingsRight = globalThis.innerWidth - bounds.right;
    this.settings.style.setProperty("--inset-top", this.#settingsTop);
    this.settings.style.setProperty("--inset-right", this.#settingsRight);
  }

  #updateTheme() {
    this.settingsLight.disabled = this.#theme === "light";
    this.settingsDark.disabled = this.#theme === "dark";
  }

  async #onTheme(newTheme) {
    const response = await fetch("/theme/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ theme: newTheme }),
    });
    const { success } = await response.json();
    if (success) {
      document.documentElement.setAttribute("data-theme", newTheme);
      this.#theme = newTheme;
      this.#updateTheme();
    }
  }
}

customElements.define("patchwork-nav", Component);
