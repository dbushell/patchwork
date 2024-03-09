<script>
  /** @type {string} */
  export let label = '';
  /** @type {string} */
  export let tag = 'label';
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
  /** @type {boolean} */
  export let switched;
</script>

<svelte:element this={tag} class="Checkbox">
  <input
    type="checkbox"
    {id}
    {name}
    {checked}
    {disabled}
    {required}
    {...{switch: switched}}
    on:change
    on:input
  />
  <span>{label}</span>
</svelte:element>
