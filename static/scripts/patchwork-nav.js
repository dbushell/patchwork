/// <reference lib="dom" />
export class Component extends HTMLElement {
  #theme = "";
  #themes = new Set(["light", "dark"]);
  #navOpen = false;

  get theme() {
    return this.#theme;
  }

  set theme(value) {
    if (this.#themes.has(value)) {
      this.#theme = value;
    }
  }

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
    const settings = document.querySelector("#settings-template").content
      .cloneNode(true);
    this.nav.append(settings);
    this.settingsButton.disabled = false;
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
    this.#onResize();
    this.theme = document.documentElement.getAttribute("data-theme") ??
      globalThis.localStorage.getItem("theme") ?? "";
    this.#updateTheme();
    this.settingsLight.addEventListener("click", () => {
      this.#onTheme("light");
    });
    this.settingsDark.addEventListener("click", () => {
      this.#onTheme("dark");
    });
  }

  #onResize() {
    if (this.#navOpen) {
      const display = globalThis.getComputedStyle(this.nav).display;
      if (display !== "grid") {
        this.nav.hidePopover();
      }
    }
  }

  #updateTheme() {
    this.settingsLight.disabled = this.theme === "light";
    this.settingsDark.disabled = this.theme === "dark";
    if (this.theme) {
      document.documentElement.dataset.theme = this.theme;
      globalThis.localStorage.setItem("theme", this.theme);
    } else {
      globalThis.localStorage.removeItem("theme");
    }
  }

  #onTheme(newTheme) {
    document.documentElement.setAttribute("data-theme", newTheme);
    this.theme = newTheme;
    this.#updateTheme();
    fetch("/theme/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ theme: newTheme }),
    }).catch((err) => {
      console.error(err);
    });
  }
}

customElements.define("patchwork-nav", Component);
