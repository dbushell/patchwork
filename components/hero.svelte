<script>
  import {onMount} from 'svelte';

  /** @type {string} */
  export let heading = '';
  /** @type {string} */
  export let description = '';

  let hero;
  let heroMain;
  let heroHeading;

  let top = 0;
  let height = 0;
  let mainHeight = 0;

  const onResize = () => {
    top = hero.offsetTop;
    height = hero.offsetHeight;
    mainHeight = heroMain.offsetHeight;
  };

  const onLoad = () => {
    onResize();
  };

  onMount(() => {
    onLoad();
    requestAnimationFrame(onLoad);
  });
</script>

<svelte:window on:load={onLoad} on:resize={onResize} />

<div
  class="Grid | Hero"
  bind:this={hero}
  style:--hero-offset-top={top}
  style:--hero-offset-height={height}
>
  <div class="Hero__main" bind:this={heroMain}>
    <slot name="image" />
    <slot name="main">
      <slot name="heading">
        <h1 class="Hero__heading" bind:this={heroHeading}>{heading}</h1>
      </slot>
      <slot name="intro">
        <div class="Hero__intro">
          <p>{description}</p>
        </div>
      </slot>
    </slot>
  </div>
</div>
