<script>
  /** @type {string} */
  export let label = '';
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

<label class="Radio" on:change on:input>
  <input type="radio" {id} {name} {checked} {disabled} {required} />
  <span>{label}</span>
</label>
