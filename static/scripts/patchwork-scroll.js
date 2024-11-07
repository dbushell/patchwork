/// <reference lib="dom" />
export class Component extends HTMLElement {
  connectedCallback() {
    let deltaY = 0;
    let isScrolling = false;

    const scroll = () => {
      if (Math.abs(deltaY) < 0.5) {
        isScrolling = false;
        deltaY = 0;
        return;
      }
      document.documentElement.scrollTop += deltaY;
      globalThis.scrollBy({
        top: deltaY,
        behavior: "instant",
      });
      // Decay factor
      deltaY *= 0.9;
      requestAnimationFrame(scroll);
    };

    globalThis.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      // Clamp max delta
      deltaY = ev.deltaY;
      deltaY = Math.max(-50, Math.min(50, deltaY));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(scroll);
      }
    }, { passive: false });
  }
}

customElements.define("patchwork-scroll", Component);
