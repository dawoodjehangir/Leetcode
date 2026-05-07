## Concepts to study:

- garbage collector
- accidental global variables
- forgotten intervals
- closures

To understand how memory leaks happen, you have to remember the Golden Rule of the Garbage Collector: If there is a path from the "root" (the running app) to the data, it stays in memory.

A Memory Leak occurs when you accidentally leave a "path" open to data you no longer need. Here are the most common "clogs":

### The Forgotten Timer (setInterval)

This is the most common leak in modern web apps (especially in React/Vue). If you start a timer that references a large object, that object can never be garbage collected as long as the timer is running.

```typescript []
function startLeakyProcess() {
  const massiveData = new Array(1000000).fill("❌"); // Huge array

  setInterval(() => {
    // Even if we don't use massiveData here, the closure
    // "captures" the scope and keeps the array alive!
    console.log("Still running...");
  }, 1000);
}

startLeakyProcess();
// Even after the function finishes, that massiveData stays in RAM
// because the interval is still ticking.
```

The Fix: Always save the timer ID and call clearInterval(id) when the task is done or the component unmounts.

### The "Accidental Global"

When you initialize a variable without let, const, or var, JavaScript attaches it to the global object (window in browsers). Global variables are never garbage collected until you close the tab.

```typescript []
function createUser() {
  // Missing 'let/const' makes this global!
  tempUserData = new Array(1000000).fill("👤");
}

createUser();
// tempUserData is now stuck on window.tempUserData forever.
```

The Fix: Use "use strict"; or TypeScript to catch undeclared variables.

### Out-of-DOM References

This happens when you save a reference to an HTML element in a JavaScript variable, but then "delete" that element from the page.

```typescript []
let elements = {
  button: document.getElementById("launch-button"),
};

function removeButton() {
  document.body.removeChild(document.getElementById("launch-button"));
  // The button is gone from the screen...
  // BUT it's still in RAM because 'elements.button' points to it!
}
```

### Closures (The "Scope Leak")

Closures are powerful, but they can be tricky. If a long-running function returns a small inner function, that inner function keeps a reference to the entire parent scope.

```typescript []
function outer() {
  const hugeUnusedData = new Array(1000000).fill("📦");

  return function inner() {
    console.log("I'm just a small function");
  };
}

const leakyFunc = outer();
// 'hugeUnusedData' is now trapped in memory because 'leakyFunc'
// keeps the 'outer' scope alive.
```

### Growing Collections (The "Hotel California")

If you use an array or an object as a cache and keep adding to it without a "cleanup" strategy, it will grow until the browser crashes.

```typescript []
const cache = [];

function addToCache(data: any) {
  cache.push(data); // We keep adding, but never removing!
}
```

The Fix: Use a WeakMap or WeakSet. These allow the Garbage Collector to delete the data if no other part of your code is using it, even if it's still inside the Map!
