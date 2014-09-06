Scope
=========

An oscilloscope in JavaScript using the Web Audio API and canvas.

---

## Usage

```
var canvas = document.querySelector('canvas'),
  ac = new AudioContext(),
  osc = ac.createOscillator(),
  scope = new Scope( ac, canvas );

osc.connect( scope.input );
osc.start();
scope.start();
```
