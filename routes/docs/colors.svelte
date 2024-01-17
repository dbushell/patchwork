<script context="module">
  export const pattern = '/';
</script>

<script>
  import Layout from '@demo/layout-aside.svelte';

  const title = 'Colors - Documentation';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <h1>Colors</h1>
  <ul class="Swatches">
    <li class="bg-default">bg</li>
    <li class="bg-dark">bg-dark</li>
    <li class="bg-light">bg-light</li>
    <li class="bg-lighter">bg-lighter</li>
  </ul>
  <ul class="Swatches">
    <li class="bg-text color-bg">text</li>
    <li class="bg-text-subtle">text-subtle</li>
  </ul>
  <ul class="Swatches">
    <li class="bg-primary color-bg">primary</li>
    <li class="bg-secondary color-bg">secondary</li>
    <li class="bg-tertiary color-bg">tertiary</li>
  </ul>
  <ul class="Swatches">
    <li class="bg-focus color-bg">focus</li>
  </ul>
</Layout>
