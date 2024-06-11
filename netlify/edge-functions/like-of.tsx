import type { Config, Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const destination = url.searchParams.get('destination');

  // Look for the query parameter, and return if we don't find it
  // Also not intending for this to be general purpose at the moment
  if (!destination || !destination.includes('ciccarello.me')) {
    return;
  }

  const id = url.searchParams.get('id');
  if (!id) {
    const newUrl = new URL(url);
    newUrl.searchParams.set('id', crypto.randomUUID());

    return Response.redirect(newUrl);
  }

  const body = `<html xmlns="http://www.w3.org/1999/xhtml"><head>
  <meta charset="utf-8">
  <title>Like of https://dev.ciccarello.me/posts/2023/11/17/blood-donation-snacks/</title>
  <meta name="generator" content="anoweco">
 </head>
 <body class="h-entry">
  <h1>Like ${encodeURIComponent(id)}</h1>
  <p>
   <a class="p-author">Anonymous</a>   <a href="${encodeURI(request.url)}" class="u-url">likes</a>
   <a class="u-like-of" href="${encodeURI(destination)}">a post</a>.
  </p>


</body></html>`;

  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

export const config: Config = {
  path: '/like-of',
  cache: 'manual',
};
