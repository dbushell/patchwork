<script context="module">
  export const pattern = '/';
</script>

<script>
  import Layout from '@demo/layout-aside.svelte';

  const title = 'Documentation';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <h1>Documentation</h1>
  <p>Patchwork is a pattern library for <a href="https://github.com/dbushell/">my personal projects</a>.</p>
  <p><strong>This is work in progress!</strong></p>
  <p>Built with <a href="https://ssr.dinoear.com/">DinoSsr</a>.</p>
  <p><small>The CSS and design are copyright &copy; <a href="https://dbushell.com/">David Bushell</a> other code is <a href="https://github.com/dbushell/patchwork/">open source</a>.</small></p>
</Layout>
