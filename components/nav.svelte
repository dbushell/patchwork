<script>
  import {onMount} from 'svelte';
  import Menu from '../components/menu.svelte';
  import Button from '../components/button.svelte';
  import IconClose from '../icons/icon-close.svelte';
  import IconConfig from '../icons/icon-config.svelte';

  /** @type {Array<{name: string, href: string, target?: string}>} */
  export let menu = [];

  let nav;
  let navOpen = false;
  let settings;
  let settingsTop = 0;
  let settingsRight = 0;
  let theme = '';

  // Native popover event
  const onBefore = (ev) => {
    navOpen = ev.newState === 'open';
  };

  const onMenuClick = (ev) => {
    if (navOpen && ev.target.closest('[href]')) {
      nav.hidePopover();
    }
  };

  const updateSettings = () => {
    const bounds = settings.getBoundingClientRect();
    settingsTop = bounds.bottom;
    settingsRight = window.innerWidth - bounds.right;
  };

  export const onResize = () => {
    updateSettings();
    if (navOpen) {
      const display = window.getComputedStyle(nav).display;
      if (display !== 'grid') {
        nav.hidePopover();
      }
    }
  };

  const onScroll = () => {
    updateSettings();
  };

  const onLoad = () => {
    onResize();
  };

  const onTheme = async (newTheme) => {
    const response = await fetch('/theme/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({theme: newTheme})
    });
    const {success} = await response.json();
    if (success) {
      document.documentElement.setAttribute('data-theme', newTheme);
      theme = newTheme;
    }
  };

  onMount(() => {
    theme = document.documentElement.getAttribute('data-theme');
    onLoad();
    requestAnimationFrame(onLoad);
  });
</script>

<svelte:window on:load={onLoad} on:resize={onResize} on:scroll={onScroll} />

<nav
  bind:this={nav}
  on:beforetoggle={onBefore}
  class="Grid | Nav"
  id="nav"
  popover
>
  <Button
    icon
    small
    label="Close Menu"
    classes={['Hamburger']}
    attr={{
      popovertarget: 'nav',
      popovertargetaction: 'hide'
    }}
  >
    <IconClose slot="icon" />
  </Button>
  <Menu items={menu} on:click={onMenuClick} />
  <Button
    small
    icon
    label="Settings"
    attr={{popovertarget: 'settings', popovertargetaction: 'toggle'}}
    bind:node={settings}
  >
    <IconConfig slot="icon" />
  </Button>
  <div
    id="settings"
    class="Nav__settings"
    popover
    style:--inset-top={settingsTop ? settingsTop : undefined}
    style:--inset-right={settingsRight ? settingsRight : undefined}
  >
    <div class="Button-group jc-end">
      <p class="small space-xs mi-end">Theme</p>
      <Button
        small
        label="Light"
        disabled={theme === 'light'}
        on:click={() => onTheme('light')}
      />
      <Button
        small
        label="Dark"
        disabled={theme === 'dark'}
        on:click={() => onTheme('dark')}
      />
    </div>
  </div>
</nav>
