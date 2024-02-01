<script context="module">
  export const island = true;
</script>

<script>
  import Button from '@components/button.svelte';
</script>

<Button label="Event Listener" on:click={() => alert('clicked!')} />
