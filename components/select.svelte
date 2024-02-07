<script>
  /** @type {string} */
  export let id;
  /** @type {string} */
  export let name;
  /** @type {boolean} */
  export let disabled;
  /** @type {boolean} */
  export let required;
  /** @type {Array<{label: string, value: string, selected?: boolean}>} */
  export let options = [];
</script>

<select class="Select" {id} {name} {disabled} {required} on:change on:input>
  {#each options as option}
    <option value={option.value} selected={option.selected}
      >{option.label}</option
    >
  {/each}
</select>
