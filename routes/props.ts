import type { HyperHandle } from "@dbushell/hyperserve";

export const pattern = ".json";

export const GET: HyperHandle = () => {
  return Response.json(props);
};

const props = {
  "header": {
    "heading": "Patchwork",
    "tag": "Beta",
    "menu": [
      {
        "name": "Home",
        "href": "/",
      },
      {
        "name": "Documentation",
        "href": "/docs/",
      },
      {
        "name": "GitHub",
        "href": "https://github.com/dbushell/patchwork/",
        "button": true,
      },
    ],
  },
  "footer": {
    "menu": [
      {
        "name": "David Bushell",
        "href": "https://dbushell.com",
      },
      {
        "name": "GitHub",
        "href": "https://github.com/dbushell/patchwork/",
      },
    ],
  },
  "docs": {
    "menu": [
      {
        "name": "Documentation",
        "href": "/docs/",
      },
      {
        "name": "Colors",
        "href": "/docs/colors/",
      },
      {
        "name": "Typography",
        "href": "/docs/typography/",
      },
      {
        "name": "Buttons",
        "href": "/docs/buttons/",
      },
      {
        "name": "Forms",
        "href": "/docs/forms/",
      },
      {
        "name": "Layout",
        "href": "/docs/layout/",
      },
    ],
  },
};
