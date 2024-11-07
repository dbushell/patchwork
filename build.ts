import { Hyperserve } from "@dbushell/hyperserve";
import * as fs from "@std/fs";
import * as path from "@std/path";

const buildPath = path.resolve(Deno.cwd(), "build");
const staticPath = path.resolve(Deno.cwd(), "static");

const dir = new URL("./", import.meta.url).pathname;
const ssr = new Hyperserve(dir);
await ssr.init();

ssr.router.get("*", async ({ response }) => {
  if (!(response instanceof Response)) {
    return response;
  }
  const contentType = response.headers.get("content-type");
  if (
    contentType?.includes("json") ||
    contentType?.includes("text/css") ||
    contentType?.includes("text/html") ||
    contentType?.includes("text/javascript")
  ) {
    let body = await response.text();
    body = body.replaceAll("%DEPLOY_HASH%", ssr.deployHash);
    response = new Response(body, response);
  }
  return response;
});

performance.mark("start");
console.log("Building...");

await fs.emptyDir(buildPath);
await fs.copy(staticPath, buildPath, { overwrite: true });

const routePaths = [
  "/app.min.css",
  "/app.webmanifest",
  "/",
  "/404/",
  "/docs/",
  "/docs/buttons/",
  "/docs/colors/",
  "/docs/forms/",
  "/docs/layout/",
  "/docs/modals/",
  "/docs/typography/",
  "/scroll/",
];

for (const href of routePaths) {
  let routePath = "index.html";
  if (href === "/404/") {
    routePath = "404.html";
  } else if (href !== "/") {
    routePath = href;
    if (href.endsWith("/")) {
      routePath += "index.html";
    }
  }
  routePath = path.join(buildPath, routePath);
  await fs.ensureFile(routePath);
  const url = new URL(href, "http://127.0.0.1:8000");
  const request = new Request(url);
  const response = await fetch(request);
  if (response.body === null) {
    throw new Error(`Route missing body: "${href}"`);
  }
  await Deno.writeFile(routePath, response.body);
}

performance.mark("end");
const { duration } = performance.measure("build", "start", "end");
console.log(`Build complete: ${duration.toFixed(2)}ms`);

ssr.server.shutdown();
