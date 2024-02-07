<script>
  /** @type {number} */
  export let value = 0;
  export let step = 1;
  /** @type {number} */
  export let min = 0;
  /** @type {number} */
  export let max = 100;
  /** @type {string} */
  export let id;
  /** @type {string} */
  export let name;
  /** @type {boolean} */
  export let disabled;
</script>

<input
  class="Range"
  type="range"
  {id}
  {name}
  {value}
  {step}
  {min}
  {max}
  {disabled}
  on:change
  on:input
/>
