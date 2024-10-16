import { Hyperserve } from "@dbushell/hyperserve";

const dir = new URL("./", import.meta.url).pathname;

const ssr = new Hyperserve(dir, {
  dev: true,
});

await ssr.init();
