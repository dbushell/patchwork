<script>
  export let type = 'text';
  export let value = '';
  export let id;
  export let name;
  export let disabled;
  export let required;
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
