<script>
  import {onMount} from 'svelte';
  import Nav from '../components/nav.svelte';
  import Button from '../components/button.svelte';
  import IconMenu from '../icons/icon-menu.svelte';

  export let heading = '';
  export let tag = '';

  /** @type {Array<{name: string, href: string, target?: string}>} */
  export let menu = [];

  let scrollY = 0;
  let scrollY2 = 0;
  let scrollDir = 1;

  const onScroll = () => {
    scrollY2 = scrollY;
    scrollY = window.scrollY;
    scrollDir = Math.max(-1, Math.min(1, scrollY - scrollY2));
    scrollDir = scrollDir === 0 ? 1 : scrollDir;
    document.documentElement.style.setProperty('--scroll-y', scrollY);
    document.documentElement.style.setProperty('--scroll-dir', scrollDir);
  };

  const onLoad = () => {
    onScroll();
  };

  onMount(() => {
    onLoad();
    requestAnimationFrame(onLoad);
    if ('popover' in HTMLElement.prototype) return;
    // Fallback to polyfill popover
    window.addEventListener('click', (ev) => {
      let target = ev.target.closest('[popovertarget]');
      if (!target) return;
      target = document.getElementById(target.getAttribute('popovertarget'));
      if (!target) return;
      target.classList.toggle(':popover-open');
    });
  });
</script>

<svelte:window on:load={onLoad} on:scroll={onScroll} />

<header class="Grid | Header">
  <div class="Header__main">
    <slot name="primary">
      <a class="Header__logo" href="/">
        <span class="Header__name">{heading}</span>
        {#if tag}<span class="Header__tag">{tag}</span>{/if}
      </a>
    </slot>
    <slot name="secondary">
      {#if menu.length}
        <Button
          small
          icon
          label="Toggle Menu"
          classes={['Hamburger']}
          attr={{
            popovertarget: 'nav',
            popovertargetaction: 'toggle'
          }}
        >
          <IconMenu slot="icon" />
        </Button>
        <Nav {menu} />
      {/if}</slot
    >
  </div>
</header>
