<script context="module">
  import {highlight} from '@lib/highlight.js';

  export const pattern = '/';

  export const load = ({publicData}) => {
    publicData.code1 = highlight(
      'svelte',
      `
<script>
  import {onMount} from 'svelte';

  let time = '';
  const update = () => {
    time = new Date().toLocaleTimeString();
  };
  update();

  onMount(() => {
    setInterval(update, 1000);
  });
<\/script>

<time>{time}</time>
`
    );
  };
</script>

<script>
  import {getContext} from 'svelte';
  import Layout from '@demo/layout-aside.svelte';
  import Code from '@components/code.svelte';

  const {code1} = getContext('publicData');

  const title = 'Typography - Documentation';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Layout>
  <h1>Heading level one</h1>
  <h2>Heading level two</h2>
  <h3>Heading level three</h3>
  <h4>Heading level four</h4>
  <h5>Heading level five</h5>
  <h6>Heading level six</h6>
  <p>
    DinoSsr is a minimal <a href="https://ssr.rocks/about/"
      >web framework</a
    >
    for <strong>Deno</strong> and <strong>Svelte</strong> fans. It's similar to
    <em>SvelteKit</em>
    and <em>Fresh</em> but with a smaller focus.
  </p>
  <p><q>Inline quote</q></p>
  <blockquote class="Blockquote">
    <p>Block quote first paragraph.</p>
    <p>Block quote second paragraph.</p>
  </blockquote>
  <Code language="svelte" code={code1} />
  <ul>
    <li>
      Server-side render
      <ul>
        <li>Svelte components</li>
      </ul>
    </li>
    <li>No build step</li>
    <li>Interactive islands</li>
  </ul>
  <ol>
    <li>Fast setup</li>
    <li>Minimal ceremony</li>
    <li>Web standards</li>
  </ol>
  <div class="Table">
    <table>
      <thead>
        <tr>
          <th>Table</th>
          <th>Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Table</td>
          <td>Cell</td>
        </tr>
        <tr>
          <td>Table</td>
          <td>Cell</td>
        </tr>
      </tbody>
    </table>
  </div>
</Layout>
