<script>
  import Island from '@dinossr/island';
  import Hero from '@components/hero.svelte';
</script>

<Island props={$$props}>
  <Hero {...$$props}></Hero>
</Island>
