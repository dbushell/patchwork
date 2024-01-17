<script>
  import Island from '@dinossr/island';
  import Button from '@components/button.svelte';
</script>

<Island>
  <Button label="Event Listener" on:click={() => alert('clicked!')} />
</Island>
