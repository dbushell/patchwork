#!/usr/bin/env -S deno run --allow-all
import {DinoServer} from 'dinossr';
import {debounce} from 'debounce';
import * as lcss from 'npm:lightningcss@1.22.1';

const dir = new URL('./', import.meta.url).pathname;

let dinossr: DinoServer;
let controller: AbortController;

const cssOptions: lcss.BundleOptions<lcss.CustomAtRules> = {
  filename: 'static/app.css',
  minify: true,
  sourceMap: false,
  include: lcss.Features.Nesting
};

const cssBundle = () => {
  const {code} = lcss.bundle(cssOptions);
  let css = new TextDecoder().decode(code);
  css = css.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  Deno.writeTextFile('static/app.min.css', css);
  return css;
};

const start = async () => {
  controller = new AbortController();
  dinossr = new DinoServer(dir, {
    deployHash: 'dev',
    bumbler: {dev: true},
    serve: {
      signal: controller.signal
    }
  });
  await dinossr.init();

  dinossr.router.onError = (error) => {
    console.log(error);
    return new Response(null, {
      status: 500
    });
  };

  dinossr.router.get('/app.min.css', () => {
    let css = cssBundle();
    css = `/* ${new Date().toISOString()} */\n${css}`;
    return new Response(css, {
      headers: {
        'content-type': 'text/css; charset=utf-8'
      }
    });
  });
};

cssBundle();

start();

const watcher = Deno.watchFs(dir);

const update = debounce(async (ev: Deno.FsEvent) => {
  if (controller.signal.aborted) return;
  if (['modify', 'create'].includes(ev.kind)) {
    for (const evpath of ev.paths) {
      if (evpath.endsWith('.min.css')) return;
    }
    controller.abort();
    await dinossr.server.finished;
    start();
  }
}, 1000);

for await (const event of watcher) {
  update(event);
}
