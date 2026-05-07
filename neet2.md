# Quick notes

### Hash maps, Objects, hashing

- hash maps resize themselves
- Plain object {} or Record<string, any>: keys become strings, prototype weirdness (Contains prototype properties (like toString)), not ideal for all cases
- Map: any key type, preserves insertion order, cleaner semantics, designed specifically for hash maps, built in size property
- plain object (Record) is actually the better choice => JSON Serialization: Objects are the "native" format for JSON. If you need to send your data over a network via JSON.stringify(), a Map will come out empty {} unless you write a custom serializer.
