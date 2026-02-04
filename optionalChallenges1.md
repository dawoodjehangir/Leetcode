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
- In non-arrow functions, arguments is a built-in, "array-like" object that contains all the values passed to the function.
- most important rule of a Set is that it cannot contain duplicate values.
- new Set(arguments): This takes all the inputs and forces them into a Set. If there were duplicates in the inputs, they are removed here.

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

//one liner - using SET
function areThereDuplicates<T>(...args: T[]): boolean {
  return new Set(args).size !== args.length;
}
```

# Coding exercise 5

Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true if the message can be built with the letters that you are given, or it should return false.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

Bonus Constraints:

If M is the length of message and N is the length of letters:

Time Complexity: O(M+N)

Space Complexity: O(N)

## takeaways

- an object was created without a prototype (e.g., Object.create(null))
- if someone accidentally named a property hasOwnProperty. In those cases, user.hasOwnProperty() will crash.
- string doesn't have .every() method like arrays
- you cannot use a return statement inside a ternary operator.

```typescript []
function constructNote(letters: string, note: string): boolean {
  //check the unique letters in letters. Object1
  //check the unique letters in note. Object2
  //compare the keys of Object1 and Object2. If Object2 is a subset of Object1, then true, otherwise false
  //easy input
  // abc, abcbacbacbabbacbabcabcbac
  //complex inputs
  // similar
  //empty inputs
  // cater if letters are empty, then return false. Other way around also
  //invalid inputs - assumption laid out

  //aaa, aabc
  if (note.length === 0) return true;
  if (letters.length === 0) return false;

  //O(N) space
  const lettersKeys: Record<string, number> = {};
  //O(N) time
  for (const l of letters) {
    lettersKeys[l] = (lettersKeys[l] ?? 0) + 1;
  }
  //O(M) time
  for (const character of note) {
    if (!lettersKeys.hasOwnProperty(character) || lettersKeys[character] === 0)
      return false;
    lettersKeys[character]--;
  }
  return true;
}
```

# Coding exercise 6

Given an array of positive integers, some elements appear twice and others appear once. Find all the elements that appear twice in this array. Note that you can return the elements in any order.

//time complexity O(N)

## takeaways

- Object requires for...in or Object.keys()
- Set is directly iterable with for...of

```typescript []
function findAllDuplicates(parray: number[]): number[] {
  if (parray.length === 0) return [];
  const arrayObject: Record<string, number> = {};
  for (const num of parray) {
    arrayObject[String(num)] = (arrayObject[String(num)] ?? 0) + 1;
  }

  return Object.keys(arrayObject).filter((key) => arrayObject[key] === 2);
}
```

# Coding exercise 7

Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

## takeaways

- in a production TypeScript environment, you might encounter a Precision Issue because of how JavaScript handles floating-point numbers.

- For example, if the average is exactly 2.5, but tav is provided via a calculation that results in 2.50000000000001, tempAve === tav might return false.

```typescript []
// - sorted array. can have +ve -ve integers
// - a target average
// - returns boolean

//easy input
//[1,2,3],2.5
//complex input
//empty input
//invalid input

function averagePair(inputArray: number[], tav: number): boolean {
  //create two pointers. one pointing at start, second pointing at end.
  //create while loop that runs until start<end
  //take average of the currently pointed positions
  //if it matches target average, return true
  //Otherwise:
  //if the calculated average turns out to be smaller than tav, then move First to Right.
  //if the calculated average turns out to be higher than tav, then move Second to Left.
  //return false outside

  if (inputArray.length === 0) return false;

  let first: number = 0;
  let second: number = inputArray.length - 1;

  while (first < second) {
    let tempAve = inputArray[first] + inputArray[second];
    if (tempAve === tav * 2) return true;
    else if (tempAve < tav * 2) {
      first++;
    } else if (tempAve > tav * 2) {
      second--;
    }
  }
  return false;
}
```

# Coding exercise 8

Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

Time Complexity - O(N + M)
Space Complexity - O(1)

```typescript []
// both arguments are strings
// return boolean depending on the result

// easy input ('hello', 'hello world')
// complex input
// empty input - if either of inputs is empty, return false
// invalid input - Cant think of anything

function isSubsequence(smallseq: string, textstr: string): boolean {
  //return false if either of strings are empty
  //return false if length of second string is smaller than first
  //create two pointers, with each pointing at the start of the two different strings
  //intialize two pointers at the start of each of the strings
  //create a while loop, that runs until
  //if reached the end of first and second < length of second => return true
  //return false

  //('sing', 'stigern')
  if (smallseq.length === 0 || textstr.length === 0) return false;
  if (textstr.length < smallseq.length) return false;

  let first: number = 0; //smallseq
  let second: number = 0; //textstr

  while (second < textstr.length && first < smallseq.length) {
    if (smallseq[first] === textstr[second]) {
      first++;
    }
    second++;
  }
  return first === smallseq.length;
}
```
