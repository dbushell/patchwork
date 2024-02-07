<script>
  /** @type {string} */
  export let tag = 'div';
</script>

<svelte:element this={tag} class="Stack">
  <slot />
</svelte:element>
