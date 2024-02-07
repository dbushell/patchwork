<script>
  /** @type {Array<string>} */
  export let classes = [];
  /** @type {Array<string>} */
  export let headerClasses = [];
  /** @type {Array<string>} */
  export let mainClasses = [];
  /** @type {boolean} */
  export let open = false;

  classes = ['Accordion', ...classes];
  headerClasses = ['Accordion__header', ...headerClasses];
  mainClasses = ['Accordion__main', ...mainClasses];
</script>

<details class={classes.join(' ')} {open}>
  <summary class={headerClasses.join(' ')}>
    <slot name="header" />
  </summary>
  <div class={mainClasses.join(' ')}>
    <slot name="main" />
  </div>
</details>
