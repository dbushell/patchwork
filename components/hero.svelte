<script>
  import {onMount} from 'svelte';

  export let heading = '';
  export let description = '';

  let hero;
  let heroMain;
  let heroHeading;

  let top = 0;
  let height = 0;
  let mainHeight = 0;
  let headingHeight = 0;

  const space = () => {
    return (
      Number.parseInt(
        window
          .getComputedStyle(heroMain)
          .getPropertyValue('padding-block-start')
      ) * 2 || 0
    );
  };

  const onResize = () => {
    top = hero.offsetTop;
    height = hero.offsetHeight;
    mainHeight = heroMain.offsetHeight;
    headingHeight = heroHeading.offsetHeight + space();
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
  style:--hero-main-offset-height={mainHeight}
  style:--hero-heading-offset-height={headingHeight}
>
  <div class="Hero__main" bind:this={heroMain}>
    <slot name="image" />
    <slot name="main">
      <slot name="heading">
        <h1 class="H0 | Hero__heading" bind:this={heroHeading}>{heading}</h1>
      </slot>
      <slot name="intro">
        <div class="Hero__intro">
          <p>{description}</p>
        </div>
      </slot>
    </slot>
  </div>
</div>
