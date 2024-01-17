<script>
  import {getContext} from 'svelte';
  import Button from '../components/button.svelte';

  /** @type {Array<{name: string, href: string, target?: string}>} */
  export let items = [];

  const url = getContext('url');

  for (const item of items) {
    if (!url) break;
    if (url.pathname === item.href) {
      item.current = true;
      continue;
    }
    // Ignore homepage matching everything
    if (item.href === '/' || url.pathname === '/') {
      continue;
    }
    // Match sub-pages
    if (url.pathname.startsWith(item.href)) {
      item.current = true;
      continue;
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ul class="Menu" on:click>
  {#each items as item}
    <li class="Menu__item">
      {#if item.button}
        <Button small href={item.href} label={item.name} />
      {:else}
        <a
          class="Menu__link"
          href={item.href}
          aria-current={item.current ? 'page' : undefined}
        >
          <span>{item.name}</span>
        </a>
      {/if}
    </li>
  {/each}
</ul>
