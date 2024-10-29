import * as path from "@std/path";
import { debounce } from "@std/async/debounce";
import * as lcss from "npm:lightningcss";
import { Hyperserve } from "@dbushell/hyperserve";

const dir = new URL("./", import.meta.url).pathname;

let ssr: Hyperserve;
let controller: AbortController;

const cssOptions: lcss.BundleOptions<lcss.CustomAtRules> = {
  filename: "static/app.css",
  minify: true,
  sourceMap: false,
  include: lcss.Features.Nesting,
};

const cssBundle = () => {
  const { code } = lcss.bundle(cssOptions);
  let css = new TextDecoder().decode(code);
  css = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  Deno.writeTextFile("static/app.min.css", css);
  return css;
};

const start = async () => {
  controller = new AbortController();
  ssr = new Hyperserve(dir, {
    dev: true,
    serve: {
      signal: controller.signal,
    },
  });
  await ssr.init();

  ssr.router.onError = (error) => {
    console.log(error);
    return new Response(null, {
      status: 500,
    });
  };

  ssr.router.get("/app.min.css", ({ platform }) => {
    let css = cssBundle();
    css = `/* ${new Date().toISOString()} */\n${css}`;
    css = css.replaceAll("%DEPLOY_HASH%", platform.deployHash);
    return new Response(css, {
      headers: {
        "content-type": "text/css; charset=utf-8",
      },
    });
  });
};

cssBundle();

start();

const watcher = Deno.watchFs(dir);

const directories = ["components", "routes", "lib", "icons", "layout"];

const update = debounce(async (ev: Deno.FsEvent) => {
  if (controller.signal.aborted) return;
  if (["modify", "create"].includes(ev.kind)) {
    for (const evpath of ev.paths) {
      const dir = path.dirname(evpath.replace(Deno.cwd(), ""));
      if (!directories.includes(dir.split("/")[1])) return;
      if (evpath.includes(".min.")) return;
    }
    controller.abort();
    await ssr.server.finished;
    start();
  }
}, 1000);

for await (const event of watcher) {
  update(event);
}
