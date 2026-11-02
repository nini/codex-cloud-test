export function calculate(left, operator, right) {
  if (![left, right].every(Number.isFinite)) throw new Error('Bitte gültige Zahlen eingeben.');
  if (operator === '/' && right === 0) throw new Error('Division durch null ist nicht möglich.');
  const operations = { '+': () => left + right, '-': () => left - right, '*': () => left * right, '/': () => left / right };
  if (!Object.hasOwn(operations, operator)) throw new Error('Unbekannte Rechenart.');
  const result = operations[operator]();
  if (!Number.isFinite(result)) throw new Error('Das Ergebnis ist zu groß.');
  return Number(result.toPrecision(15));
}

export class Calculator {
  display = '0';
  left = null;
  operator = null;
  fresh = true;
  error = '';

  clear() {
    this.display = '0'; this.left = null; this.operator = null; this.fresh = true; this.error = '';
  }

  input(key) {
    if (key === 'clear') { this.clear(); return; }
    if (this.error) this.clear();
    if (/^\d$/.test(key)) {
      if (this.fresh || this.display === '0') this.display = key;
      else if (this.display.replace(/[-.]/g, '').length < 15) this.display += key;
      this.fresh = false;
    } else if (key === '.') {
      if (this.fresh) this.display = '0';
      if (!this.display.includes('.')) this.display += '.';
      this.fresh = false;
    } else if (key === 'sign') {
      if (this.fresh && this.operator) this.display = '0';
      this.display = this.display.startsWith('-') ? this.display.slice(1) : '-' + this.display;
      this.fresh = false;
    } else if (key === 'backspace') {
      if (this.fresh) return;
      this.display = this.display.slice(0, -1);
      if (!this.display || this.display === '-') this.display = '0';
    } else if (['+', '-', '*', '/', '='].includes(key)) {
      try {
        if (this.operator && !this.fresh) {
          this.display = String(calculate(this.left, this.operator, Number(this.display)));
        }
        if (key === '=') {
          this.left = null; this.operator = null;
        } else {
          this.left = Number(this.display); this.operator = key;
        }
        this.fresh = true;
      } catch (error) {
        this.clear(); this.error = error.message;
      }
    }
  }
}
