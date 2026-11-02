import { Calculator } from './calculator.js';
const calculator = new Calculator();
const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
function input(key) {
  calculator.input(key);
  document.querySelector('#display').textContent = calculator.display.replace('.', ',');
  document.querySelector('#operation').textContent = calculator.operator
    ? `${String(calculator.left).replace('.', ',')} ${symbols[calculator.operator]}` : 'Bereit zum Rechnen';
  document.querySelector('#error').textContent = calculator.error;
  document.querySelectorAll('.operator').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.key === calculator.operator));
  });
}
document.querySelector('.keys').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (button) input(button.dataset.key);
});
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  // Preserve native Enter/Space activation on focused buttons.
  if (event.target.closest('button') && ['Enter', ' '].includes(event.key)) return;
  const aliases = { Enter: '=', Escape: 'clear', Delete: 'clear', Backspace: 'backspace', ',': '.', F9: 'sign' };
  const key = aliases[event.key] || event.key;
  if (/^[0-9.+*/=\-]$/.test(key) || ['clear', 'backspace', 'sign'].includes(key)) {
    event.preventDefault(); input(key);
  }
});
