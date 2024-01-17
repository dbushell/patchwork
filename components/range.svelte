<script>
  export let value = 0;
  export let step = 1;
  export let min = 0;
  export let max = 100;
  export let id;
  export let name;
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
