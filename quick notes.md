# Quick notes

## Yet to explore

- Nominal typing vs structural typing
- memory layout in JS => JS objects: garbage collected, hidden classes/shapes internally, dynamic property addition, runtime optimized
- function are objects. classes are functions too? => deeply tied to prototype inheritance
- reference semantics

### JS/TS concepts

- Primitive types (number, string, boolean) are copied by value
- Objects/arrays/maps/functions are copied by reference

This distinction is extremely important in JS/TS interviews.

### Hash maps, Objects, hashing

- hash maps resize themselves
- Plain object {} or Record<string, any>: keys become strings, prototype weirdness (Contains prototype properties (like toString)), not ideal for all cases
- Map: any key type, preserves insertion order, cleaner semantics, designed specifically for hash maps, built in size property
- plain object (Record) is actually the better choice => JSON Serialization: Objects are the "native" format for JSON. If you need to send your data over a network via JSON.stringify(), a Map will come out empty {} unless you write a custom serializer.
- plain object (Record) is actually the better choice => lightweight records, JSON-like data, configs
- use `{}` for simple frequency counters, use `Map` for true hashmap behavior

### OOP

JavaScript OOP is:

- prototype-based
- runtime/dynamic
- flexible
- object-centric
- structurally typed (through TypeScript)

TypeScript sits in the middle:

- it adds a C++/Java/C#-style class system on top of JavaScriptbut under the hood it still becomes JavaScript prototypes

#### Prototype delegation

Objects inherit from other objects directly.

```typescript []
const animal = {
  speak() {
    console.log("sound");
  },
};

const dog = Object.create(animal);

dog.bark = function () {
  console.log("woof");
};
```

dog ---> animal ---> Object.prototype
If JS can’t find dog.speak, it walks up the prototype chain.

This is radically different from C++ inheritance internals.

#### TypeScript makes JS feel more like C++

TypeScript adds: types, interfaces, access modifiers, generics, abstract classes

But TypeScript types disappear at runtime. After compilation: TypeScript -> JavaScript

#### Inheritance

class Dog extends Animal {}
JS essentially creates: Dog.prototype --> Animal.prototype
Method lookup walks prototypes dynamically.

### Lists

- an empty array is truthy. Arrays are objects in JavaScript, and all objects are truthy.

```
| Value       | Truthy/Falsy |
| ----------- | ------------ |
| `[]`        | truthy       |
| `{}`        | truthy       |
| `""`        | falsy        |
| `0`         | falsy        |
| `null`      | falsy        |
| `undefined` | falsy        |

```

### Strings

Strings are:

- immutable
- UTF-16 encoded
- primitive values
  Methods return new strings rather than modifying the original.

| Method          | Importance |
| --------------- | ---------- |
| `slice()`       | Critical   |
| `split()`       | Critical   |
| `includes()`    | Critical   |
| `indexOf()`     | Critical   |
| `replace()`     | Critical   |
| `startsWith()`  | High       |
| `endsWith()`    | High       |
| `toLowerCase()` | High       |
| `toUpperCase()` | High       |
| `trim()`        | High       |
| `match()`       | Medium     |
| `repeat()`      | Medium     |

### Sets

a Set is a collection of unique values. No duplicates allowed.

- Empty set
  `const set = new Set<number>();`

- From an array
  `const set = new Set([1, 2, 3]);`

- String set
  `const chars = new Set(["a", "b", "c"]);`

| Operation | Complexity |
| --------- | ---------- |
| `add`     | O(1)       |
| `has`     | O(1)       |
| `delete`  | O(1)       |

- Object example

```typescript
const set = new Set<object>();

set.add({ x: 1 });
set.add({ x: 1 });

console.log(set.size); => 2
```

Because these are DIFFERENT object references.

Very important interview nuance.

- Sets vs Arrays
  | Feature | Set | Array |
  | ------------------ | -------- | ----- |
  | Duplicates allowed | No | Yes |
  | Ordered | Yes | Yes |
  | Fast lookup | Yes | No |
  | Index access | No | Yes |
  | `has()` complexity | O(1) avg | O(n) |

Common usage of `Set`:
| Pattern | Example |
| --------------------- | ------------------ |
| Duplicate detection | contains duplicate |
| Visited tracking | graph traversal |
| Membership testing | word dictionary |
| Unique values | deduplication |
| Sliding window | longest substring |
| Intersection problems | common elements |

### Sorting

#### Built-in sort JS/TS

MDN explicitly states that the time and space complexity “cannot be guaranteed” because it depends on the engine implementation.

JavaScript’s built-in sort is typically O(n log n) time. Space complexity depends on the engine, but modern implementations like V8’s TimSort generally use O(n) auxiliary space.

| Case    | Time       |
| ------- | ---------- |
| Best    | O(n)       |
| Average | O(n log n) |
| Worst   | O(n log n) |

Space complexity:
| Space | Typical |
| ---------------- | ------- |
| Auxiliary memory | O(n) |

Use TimSort or a TimSort hybrid for sorting:

- hybrid of merge sort + insertion sort
- optimized for partially sorted data
- stable
