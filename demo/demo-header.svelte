<script context="module">
  export const island = true;
</script>

<script>
  import Header from '@components/header.svelte';
</script>

<Header heading="Patchwork" tag="Beta" {...$$props} />
