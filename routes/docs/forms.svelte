<script context="module">
  export const pattern = '/';
</script>

<script>
  import Layout from '@demo/layout-aside.svelte';
  import Field from '@components/field.svelte';
  import Progress from '@components/progress.svelte';
  import Range from '@components/range.svelte';
  import Select from '@components/select.svelte';
  import Checkbox from '@components/checkbox.svelte';
  import Radio from '@components/radio.svelte';
  import Stack from '@components/stack.svelte';

  const title = 'Forms - Documentation';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <Stack>
    <h1>Forms</h1>

    <h2>Fields</h2>
    <Field placeholder="Placeholder..." />
    <Field value="Value entered" />
    <Field disabled placeholder="Placeholder..." />
    <Field disabled value="Value entered" />

    <h2>Progress</h2>
    <Progress value="40" />

    <h2>Range</h2>
    <Range value="33" />
    <Range disabled value="66" />

    <h2>Select</h2>
    <Select
      required
      options={[
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two', selected: true},
        {value: 'three', label: 'Three'}
      ]}
    />
    <Select disabled options={[{value: 'none', label: 'None'}]} />

    <h2>Checkbox</h2>
    <Checkbox checked required label="Checkbox" />
    <Checkbox label="Checkbox" />
    <Checkbox disabled label="Checkbox" />
    <Checkbox checked disabled label="Checkbox" />
    <Checkbox toggle label="Toggle" />
    <Checkbox toggle disabled label="Toggle" />
    <Checkbox toggle checked disabled label="Toggle" />

    <h2>Radio</h2>
    <Radio checked label="Radio" name="radio" />
    <Radio label="Radio" name="radio" />
    <Radio disabled label="Radio" name="radio" />
    <Radio checked disabled label="Radio" name="radio2" />
  </Stack>
</Layout>
