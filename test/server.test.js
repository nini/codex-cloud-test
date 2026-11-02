import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

test('Server liefert Anwendung und Module aus und sperrt unbekannte Pfade', async () => {
  const child = spawn(process.execPath, ['server.js'], { cwd: new URL('..', import.meta.url), env: { ...process.env, PORT: '3187' }, stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    await Promise.race([once(child.stdout, 'data'), once(child, 'exit').then(() => { throw new Error('Serverstart fehlgeschlagen'); }), new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Startzeit überschritten')), 5000); timer.unref(); })]);
    for (const [path, content] of [['/', /Taschenrechner/], ['/src/app.js', /Calculator/], ['/src/calculator.js', /Division durch null/], ['/src/style.css', /grid-template-columns/]]) {
      const response = await fetch('http://127.0.0.1:3187' + path);
      assert.equal(response.status, 200); assert.match(await response.text(), content);
    }
    assert.equal((await fetch('http://127.0.0.1:3187/package.json')).status, 404);
  } finally { if (child.exitCode === null && child.signalCode === null) { child.kill(); await once(child, 'exit'); } }
});
