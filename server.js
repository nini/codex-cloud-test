import http from 'node:http';
import { readFile } from 'node:fs/promises';

const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/src/style.css', ['src/style.css', 'text/css; charset=utf-8']],
  ['/src/app.js', ['src/app.js', 'text/javascript; charset=utf-8']],
  ['/src/calculator.js', ['src/calculator.js', 'text/javascript; charset=utf-8']],
]);
const server = http.createServer(async (request, response) => {
  const file = files.get(new URL(request.url, 'http://localhost').pathname);
  if (!file) { response.writeHead(404); response.end('Nicht gefunden'); return; }
  try {
    const body = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { 'Content-Type': file[1], 'X-Content-Type-Options': 'nosniff' });
    response.end(body);
  } catch {
    response.writeHead(500); response.end('Datei konnte nicht geladen werden');
  }
});
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Taschenrechner gestartet'));
