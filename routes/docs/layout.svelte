<script context="module">
  export const pattern = '/';
</script>

<script>
  import Layout from '@demo/layout-aside.svelte';
  import Stack from '@components/stack.svelte';
  import Button from '@components/button.svelte';
  import Range from '@components/range.svelte';
  import Checkbox from '@components/checkbox.svelte';
  import Accordion from '@components/accordion.svelte';
  import IconConfig from '@icons/icon-config.svelte';

  const title = 'Layout - Documentation';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <Stack>
    <h1>Layout</h1>
    <h2>Stack</h2>
    <p>Stack paragraph.</p>

    <Accordion open>
      <h3 slot="header">Accordion header</h3>
      <svelte:fragment slot="main">
        <p>Start of accordion main.</p>
        <p>End of accordion main.</p>
      </svelte:fragment>
    </Accordion>

    <h2>Alert</h2>
    <div class="Alert">
      <p>Alert!</p>
    </div>

    <h2>List</h2>
    <ul class="List">
      <li>Item 1</li>
      <li>
        <a href="/">Item 2 (anchor)</a>
      </li>
      <li>
        <button class="Anchor" type="button">Item 2 (button)</button>
      </li>
      <li>Item 4</li>
    </ul>

    <h2>Cards</h2>
    <div class="Card-container">
      <article class="Card">
        <h3>Card One</h3>
        <p>This is a card container pattern.</p>
        <Button small href="/docs/" label="Docs" />
      </article>
      <article class="Card">
        <h3>Card Two</h3>
        <p>This is a card container pattern.</p>
        <Button small href="/docs/" label="Docs" />
      </article>
      <article class="Card">
        <h3>Card Three</h3>
        <p>This is a card container pattern.</p>
        <Button small href="/docs/" label="Docs" />
      </article>
    </div>

    <h2>Misc</h2>
    <ul class="List">
      <li>
        <Accordion>
          <div slot="header" class="flex flex-wrap gap-xs ai-center jc-between">
            <Button small tag="label" classes={['jc-start', 'flex-grow-1']}>
              <Checkbox toggle slot="label" label="Office Light" tag="span" />
            </Button>
            <Button small icon tag="div" label="Settings">
              <IconConfig slot="icon" />
            </Button>
          </div>
          <div slot="main" class="space-s mb-start">
            <Range />
          </div>
        </Accordion>
      </li>
    </ul>
  </Stack>
</Layout>
