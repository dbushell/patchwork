<script>
  /** @type {string} */
  export let label = '';
  /** @type {string} */
  export let href;
  /** @type {string} */
  export let type;
  /** @type {boolean} */
  export let icon;
  /** @type {boolean} */
  export let small;
  /** @type {boolean} */
  export let disabled;
  /** @type {string} */
  export let tag = href ? 'a' : 'button';
  /** @type {Array<string>} */
  export let classes = [];
  /** @type {Record<string, string>} */
  export let attr = {};
  /** @type {HTMLAnchorElement | HTMLButtonElement} */
  export let node;

  classes = ['Button', ...classes];
</script>

<svelte:element
  this={tag}
  bind:this={node}
  class={classes.join(' ')}
  class:Button--small={small}
  {...attr}
  {disabled}
  {href}
  {type}
  on:click
>
  <slot name="icon" />
  <slot name="label">
    <span class:hidden={icon}>{label}</span>
  </slot>
</svelte:element>
