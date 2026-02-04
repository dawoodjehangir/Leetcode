# Coding exercise 3

Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities:

Time: O(N)

// concrete examples

- easy cases
- complex cases
- empty input - NOT catering
- invalid input - NOT catering

```typescript []
function sameFrequency(one: string, two: string): boolean {
  if (one.length !== two.length) return false;
  const oneObj: any = {};
  const twoObj: any = {};

  for (let i = 0; i < one.length; i++) {
    oneObj[one[i]] = (oneObj[one[i]] ?? 0) + 1;
    twoObj[two[i]] = (twoObj[two[i]] ?? 0) + 1;
  }

  const oneObjkeys = Object.keys(oneObj);
  const twoObjkeys = Object.keys(twoObj);
  if (oneObjkeys.length !== twoObjkeys.length) return false;
  // already ensures that both the objects have similar keys. One of oneObj[key] or twoObj[key] would turn out to be false if that's not the case
  return oneObjkeys.every((key) => oneObj[key] === twoObj[key]);
}
```

# Coding exercise 4

Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in. You can solve this using the frequency counter pattern OR the multiple pointers pattern.

Restrictions:
Time - O(n)
Space - O(n)

Bonus:
Time - O(n log n)
Space - O(1)

## important takeaways/notes

- handling a variable number of arguments is done using Rest Parameters. This allows you to represent an indefinite number of arguments as an array.
- use the ellipsis (...) syntax before the parameter name.
- (...args: any[]) or (...args: unknown[])
- _any_ is most flexible but offers the least amount of type checking.
- _unknown_ is safer than _any_ because it forces you to perform some type checking before performing operations on the arguments.
- If you don't know the property names yet (e.g., a dictionary or a map), but you know they will all be a certain type (like strings), use Record.
- for...in loops iterate over keys (indexes), not values VS for...of

```typescript
// A Record where keys are strings and values are numbers
const scores: Record<string, number> = {};

scores["math"] = 95;
scores["science"] = 88;
```

### A Note on "Rest" vs "Spread"

It’s easy to get these confused, but they are two sides of the same coin:

Rest (in the function definition): Takes multiple individual items and "rests" them into an array.

Spread (in the function call): Takes an array and "spreads" it into individual items.

### Generics

To ensure all arguments are of the same type—while still allowing that type to be "anything"—we use Generics.

Generics allow you to create a placeholder (conventionally <T>) that captures the type of the first argument passed and then enforces that same type for all subsequent arguments.

```typescript
function uniformFunc<T>(...args: T[]): void {
  console.log(args);
}

// This will force the function to only accept numbers
uniformFunc<number>(1, 2, 3);

// This would cause a compile error because 'hello' is not a number
uniformFunc<number>(1, "hello", 3);
```

If you want the function to accept a variable number of arguments that are all the same, but they must be either a string or a number (no objects or booleans), you can constrain the generic:

```typescript
function limitedFunc<T extends string | number>(...args: T[]) {
  // args will only ever be an array of strings OR an array of numbers
}
```

```typescript []
// frequency counter pattern
function areThereDuplicates<T extends string | number>(...args: T[]): boolean {
  if (args.length < 2) return false;

  // argObj uses string | number as the key type
  let argObj: Record<string | number, number> = {};

  // Use 'for...of' to get the actual values (1, 2 or 'a', 'b')
  for (let val of args) {
    argObj[val] = (argObj[val] ?? 0) + 1;
  }

  // Iterate through the keys of our counter object
  for (let key in argObj) {
    if (argObj[key] > 1) return true;
  }

  return false;
}

//multiple pointers => come back to this later after studying sorting
function areThereDuplicates<T extends number | string>(...args: T[]): boolean {}
```

# Coding exercise 5

Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true if the message can be built with the letters that you are given, or it should return false.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

Bonus Constraints:

If M is the length of message and N is the length of letters:

Time Complexity: O(M+N)

Space Complexity: O(N)
