<script>
  /** @type {string} */
  export let label = '';
  /** @type {string} */
  export let tag = 'label';
  export let toggle = false;
  /** @type {string} */
  export let id;
  /** @type {string} */
  export let name;
  /** @type {boolean} */
  export let checked;
  /** @type {boolean} */
  export let disabled;
  /** @type {boolean} */
  export let required;
</script>

<svelte:element
  this={tag}
  class="Checkbox"
  class:Checkbox--toggle={toggle}
  on:change
  on:input
>
  <input type="checkbox" {id} {name} {checked} {disabled} {required} />
  <span>{label}</span>
</svelte:element>
