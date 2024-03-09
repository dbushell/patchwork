// Match all routes
export const pattern = '/*';

// After all other routes
export const order = 999;

const themes = ['light', 'dark'];

export const GET = async ({response, platform}) => {
  if (!(response instanceof Response)) {
    return response;
  }
  // Add policy to allow `data:` URIs in the stylesheet
  if (response.headers.get('content-type')?.includes('text/html')) {
    try {
      // Add policy to allow `data:` URIs in the stylesheet
      response.headers.append('x-img-src', 'data:');
    } catch {
      // Ignore immutable headers
    }
    // Add theme attribute to HTML document
    const theme = platform.cookies.get('theme')?.value;
    if (themes.includes(theme)) {
      let body = await response.text();
      body = body.replace(/<html([^>]+?)>/, `<html$1 data-theme="${theme}">`);
      response = new Response(body, response);
    }
  }
  return response;
};
