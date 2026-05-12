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
- declaring a map is like this:

```typescript []
const closeToOpenMap = new Map<string, string>([
  [")", "("],
  ["]", "["],
  ["}", "{"],
]);
```

### OOP

JavaScript OOP is:

- prototype-based
- runtime/dynamic
- flexible
- object-centric
- structurally typed (through TypeScript)

TypeScript sits in the middle:

- it adds a C++/Java/C#-style class system on top of JavaScriptbut under the hood it still becomes JavaScript prototypes

- TypeScript OOP is JavaScript OOP + static typing. TypeScript classes compile into JavaScript classes/prototypes.

#### Example constructor

- The following creates the field and assigns the value also:

```typescript []
class User {
  constructor(public name: string) {}
}
```

- members of class are public by default

#### readonly: Immutable after initialization.

```typescript []
class User {
  constructor(public readonly id: string) {}
}

const u = new User("123");

u.id = "456"; // ERROR
```

#### Inheritance

```typescript
class Animal {
  move() {
    console.log("Moving");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof");
  }
}
```

#### super()

```typescript
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }
}
```

#### Abstract Class

- Use when: you want shared implementation, but disallow direct instantiation
- Subclass MUST implement abstract methods.

  ```typescript
  abstract class Animal {
    abstract speak(): void;

    move() {
      console.log("Moving");
    }
  }
  class Dog extends Animal {
    speak() {
      console.log("Woof");
    }
  }
  ```

#### Interfaces

- In TS, interfaces are HUGE.
- They define shape/contracts.

```typescript
interface Flyable {
  fly(): void;
}

//Class implements interface:
class Bird implements Flyable {
  fly() {
    console.log("Flying");
  }
}
```

#### Interface vs Abstract Class - STUDY MORE

| Interface           | Abstract Class            |
| ------------------- | ------------------------- |
| contract only       | contract + implementation |
| no state            | can hold state            |
| multiple implements | single inheritance        |
| compile-time only   | runtime JS exists         |

```typescript
//Use interface when
//You only need behavior definition.
// TS supports multiple interface implementation.
interface Logger {
  log(msg: string): void;
}

//Use abstract class when
//You want shared logic.
//No multiple class inheritance.
abstract class BaseLogger {
  logWithTime(msg: string) {
    console.log(Date.now(), msg);
  }

  abstract log(msg: string): void;
}
```

#### Static Members

- Belong to class itself, not instances.

```typescript
class MathUtils {
  static PI = 3.14;

  static square(n: number) {
    return n * n;
  }
}

//MathUtils.square(5);
```

#### Composition > Inheritance??? - STUDY MORE

- Most engineers understand inheritance.
- Fewer understand when inheritance becomes dangerous.
  Composition > Inheritance

```typescript
//Composition example
// Car HAS-A Engine

//Inheritance example
// Dog is an Animal

class Car {
  constructor(private engine: Engine) {}
}
```

- Composition means: Build objects by assembling smaller focused objects.

```typescript
//General behaviors
interface MoveBehavior {
  move(): void;
}

interface AttackBehavior {
  attack(): void;
}

//Move Behaviors
class WalkMovement implements MoveBehavior {
  move() {
    console.log("Walking");
  }
}

class FlyMovement implements MoveBehavior {
  move() {
    console.log("Flying");
  }
}

//Attack behaviors
class SwordAttack implements AttackBehavior {
  attack() {
    console.log("Sword slash");
  }
}

class FireballAttack implements AttackBehavior {
  attack() {
    console.log("Fireball");
  }
}

// Compose together
class Character {
  constructor(
    private moveBehavior: MoveBehavior,
    private attackBehavior: AttackBehavior,
  ) {}

  move() {
    this.moveBehavior.move();
  }

  attack() {
    this.attackBehavior.attack();
  }
}

//Usage
const warrior = new Character(new WalkMovement(), new SwordAttack());

const dragon = new Character(new FlyMovement(), new FireballAttack());
```

- THIS Is The Big Senior-Level Insight
  Inheritance chooses behavior: at compile time

Composition chooses behavior:at runtime

That flexibility is massive.

Composition relationships can even be swapped dynamically at runtime.

- The “HAS-A” vs “IS-A” Rule

This is one of the best interview heuristics.
Use Composition when the relation is "HAS-A" vs Inheritance's "IS-A"

#### TS private differs from JS #private ???? - STUDY MORE

- TS private used for
  developer intent
  compile-time safety
  API boundaries
- JavaScript #private
  actual hidden state
  stronger guarantees
  library internals

- Neither is about security. Frontend code is always inspectable. This is about: encapsulation, NOT: security

Huge interview distinction.

- TypeScript private:

- compile-time only
- removed during transpilation
- can be bypassed at runtime

- JavaScript #private:

- real runtime privacy
- enforced by JS engine
- cannot be externally accessed

#### What Senior Interviewers Expect

interfaces over concrete classes
composition over inheritance
dependency injection
encapsulation
immutability
clean abstractions

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
