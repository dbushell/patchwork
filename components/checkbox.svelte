<script>
  export let label = '';
  export let tag = 'label';
  export let toggle = false;
  export let id;
  export let name;
  export let checked;
  export let disabled;
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
