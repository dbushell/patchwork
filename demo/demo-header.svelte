<script>
  import Island from '@dinossr/island';
  import Header from '@components/header.svelte';
</script>

<Island props={$$props}>
  <Header heading="Patchwork" tag="Beta" {...$$props} />
</Island>
