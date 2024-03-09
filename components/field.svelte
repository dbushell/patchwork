<script>
  /** @type {string} */
  export let type = 'text';
  /** @type {string} */
  export let value = '';
  /** @type {string} */
  export let id;
  /** @type {string} */
  export let name;
  /** @type {boolean} */
  export let disabled;
  /** @type {boolean} */
  export let required;
  /** @type {string} */
  export let placeholder;
</script>

<input
  class="Field"
  {type}
  {id}
  {name}
  {value}
  {disabled}
  {required}
  {placeholder}
  on:change
  on:input
/>
