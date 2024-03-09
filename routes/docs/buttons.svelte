<script context="module">
  export const pattern = '/';
</script>

<script>
  import Layout from '@demo/layout-aside.svelte';
  import Stack from '@components/stack.svelte';
  import Button from '@components/button.svelte';
  import DemoButton from '@demo/demo-button.svelte';
  import Checkbox from '@components/checkbox.svelte';
  import IconConfig from '@icons/icon-config.svelte';

  const title = 'Forms - Documentation';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <Stack>
    <h1>Buttons</h1>

    <Button type="button" label="Regular" />
    <Button disabled type="button" label="Disabled" />
    <Button small type="button" label="Small" />
    <Button href="/" label="Link" />
    <DemoButton />

    <Button icon label="icon only">
      <IconConfig slot="icon" />
    </Button>

    <Button small icon label="icon only">
      <IconConfig slot="icon" />
    </Button>

    <Button label="With Icon">
      <IconConfig slot="icon" />
    </Button>

    <Button disabled label="With Icon">
      <IconConfig slot="icon" />
    </Button>

    <Button small label="With Icon">
      <IconConfig slot="icon" />
    </Button>

    <h2>Group</h2>
    <div class="Button-group">
      <Button small label="One" />
      <Button small label="Two" />
      <Button small label="Three" />
    </div>

    <h2>Tabs</h2>
    <div class="Button-tabs">
      <Button icon label="One" href="/#1" attr={{'aria-current': 'page'}}>
        <IconConfig slot="icon" />
      </Button>
      <Button icon label="Two" href="/#2">
        <IconConfig slot="icon" />
      </Button>
      <Button icon label="Three" href="/#3">
        <IconConfig slot="icon" />
      </Button>
    </div>

    <h2>Pagination</h2>
    <div class="Button-pagination">
      <Button label="Back" />
      <Button label="Next" />
    </div>

    <h2>Advanced</h2>
    <Button tag="label">
      <Checkbox switched slot="label" label="Switch" tag="span" />
    </Button>
    <Button small tag="label">
      <Checkbox switched slot="label" label="Switch" tag="span" />
    </Button>
    <Button small tag="label">
      <Checkbox switched disabled slot="label" label="Switch" tag="span" />
    </Button>
  </Stack>
</Layout>
