// Match all routes
export const pattern = '/*';

// After all other routes
export const order = 999;

const themes = ['light', 'dark'];

// Add policy to allow `data:` URIs in the stylesheet
export const get = async (request, response, {platform}) => {
  if (response?.headers?.get('content-type')?.includes('text/html')) {
    response.headers.append('x-img-src', 'data:');
    const theme = platform.cookies.get('theme')?.value;
    if (theme) {
      let body = await response.text();
      body = body.replace(/<html([^>]+?)>/, `<html$1 data-theme="${theme}">`);
      response = new Response(body, response);
    }
  }
  return response;
};
