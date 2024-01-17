<script>
  import Layout from '@demo/layout.svelte';
  import Hero from '@demo/demo-hero.svelte';
  import Container from '@components/container.svelte';
  import Button from '@components/button.svelte';

  const description = 'Personal Pattern Library';
  const title = `Patchwork - ${description}`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <Hero heading="Patchwork" {description} />
  <Container>
    <Button href="/docs" label="Documentation" />
  </Container>
</Layout>
