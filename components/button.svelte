<script>
  export let label = '';
  export let href;
  export let type;
  export let icon;
  export let small;
  export let disabled;
  export let tag = href ? 'a' : 'button';

  /** @type {Array<string>}*/
  export let classes = [];

  /** @type {Record<string, string>}*/
  export let attr = {};

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
