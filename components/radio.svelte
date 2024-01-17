<script>
  export let label = '';
  export let id;
  export let name;
  export let checked;
  export let disabled;
  export let required;
</script>

<label class="Radio" on:change on:input>
  <input type="radio" {id} {name} {checked} {disabled} {required} />
  <span>{label}</span>
</label>
