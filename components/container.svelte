<script>
  /** @type {boolean} */
  export let light;
  /** @type {boolean} */
  export let dark;
</script>

<div
  class="Grid | Container"
  class:Container--light={light}
  class:Container--dark={dark}
>
  <slot />
</div>
