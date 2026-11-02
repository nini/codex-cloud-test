import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, Calculator } from '../src/calculator.js';
const enter = keys => { const c = new Calculator(); for (const key of keys) c.input(key); return c; };
test('Grundrechenarten und Dezimalzahlen', () => {
  for (const [a, op, b, expected] of [[2,'+',3,5],[2,'-',3,-1],[-2,'*',3,-6],[7,'/',2,3.5],[0.1,'+',0.2,0.3]]) assert.equal(calculate(a,op,b), expected);
});
test('Division durch null, ungültige Zahlen und Überlauf', () => {
  assert.throws(() => calculate(1,'/',0), /Division durch null/);
  assert.throws(() => calculate(1,'/',-0), /Division durch null/);
  assert.throws(() => calculate(Infinity,'+',1), /gültige Zahlen/);
  assert.throws(() => calculate(1e308,'*',10), /zu groß/);
});
test('Dezimalzahlen, Vorzeichen und Löschen', () => {
  assert.equal(enter(['.','5','.','sign','+','2','=']).display,'1.5');
  assert.equal(enter(['1','2','backspace']).display,'1');
  assert.equal(enter(['1','+','2','clear']).display,'0');
});
test('Kettenrechnen und Wechsel des Operators', () => {
  assert.equal(enter(['2','+','3','*','4','=']).display,'20');
  assert.equal(enter(['2','+','*','3','=']).display,'6');
});
test('Neustart nach Ergebnis und negative zweite Zahl', () => {
  assert.equal(enter(['2','+','3','=','7']).display,'7');
  assert.equal(enter(['2','*','sign','3','=']).display,'-6');
});
test('Fehler und Wiederherstellung', () => {
  const c = enter(['9','/','0','=']);
  assert.match(c.error,/Division durch null/);
  c.input('4'); assert.equal(c.error,''); assert.equal(c.display,'4');
});
test('Eingabelimit', () => assert.equal(enter(Array(20).fill('9')).display,'999999999999999'));
