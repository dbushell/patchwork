<script>
  export let options = [];
  export let id;
  export let name;
  export let disabled;
  export let required;
</script>

<select class="Select" {id} {name} {disabled} {required} on:change on:input>
  {#each options as option}
    <option value={option.value} selected={option.selected}
      >{option.label}</option
    >
  {/each}
</select>
