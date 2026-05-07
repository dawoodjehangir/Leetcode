# Quick notes

### Hash maps, Objects, hashing

- hash maps resize themselves
- Plain object {} or Record<string, any>: keys become strings, prototype weirdness (Contains prototype properties (like toString)), not ideal for all cases
- Map: any key type, preserves insertion order, cleaner semantics, designed specifically for hash maps, built in size property
- plain object (Record) is actually the better choice => JSON Serialization: Objects are the "native" format for JSON. If you need to send your data over a network via JSON.stringify(), a Map will come out empty {} unless you write a custom serializer.

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

But TypeScript types disappear at runtime
