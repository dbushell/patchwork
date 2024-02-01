<script context="module">
  export const island = true;
</script>

<script>
  import Hero from '@components/hero.svelte';
</script>

<Hero {...$$props}></Hero>
