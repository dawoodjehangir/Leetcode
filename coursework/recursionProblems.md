# Problem #1: Power

Write a function called power which accepts a base and an exponent. The function should return the power of the base to the exponent. This function should mimic the functionality of Math.pow() - do not worry about negative bases and exponents.

```typescript []
function power(base: number, exp: number): number {
  if (exp <= 0) return 1;
  return base * power(base, exp - 1);
}
```

# Problem #2: factorial

```typescript []
function factorial(num: number): number {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}
```

# Problem #3: productOfArray

Write a function called productOfArray which takes in an array of numbers and returns the product of them all.

```typescript []
// Time complexity would be O(N*2) because N is the length of array for making multiple copies through slice * times the function is called through recursion
function productOfArray(arr: number[]): number {
  if (arr.length === 0) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}

// using pointer to reduce time complexity to O(N)

function productOfArray(arr: number[], ind: number): number {
  if (ind >= arr.length) return 1;
  return arr[ind] * productOfArray(arr, ind + 1);
}
```

# Problem #4: recursiveRange

Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function

```typescript []
function recursiveRange(num: number): number {
  if (num <= 0) return 0;
  return num + recursiveRange(num - 1);
}
```

# Problem #5: fib

Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci sequence. Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.

```typescript []
//iterative
function fib(num: number): number {
  if (num === 1 || num === 2) {
    return 1;
  }
  const last: number = 1;
  const secondLast: number = 1;
  let count: number = 2;
  while (count <= num) {
    let next: number = secondLast + last;
    last = secondLast;
    secondLast = next;
    count++;
  }

  return secondLast;
}

// fib(1) = 1;
// fib(2) = 1;
// fib(3) = fib(1) + fib(2);
// fib(4) = fib(3) + fib(2);
// fib(5) = fib(4) + fib(3);
function fib(num: number): number {
  if (num === 1 || num === 2) return 1;
  return fib(num - 1) + fib(num - 2);
}
```

# Problem #6: reverse

Write a recursive function called reverse which accepts a string and returns a new string in reverse.

```typescript []
//break it
// "abc"
// => reverse("bc") + "a"
// => reverse("c") + "b"
// => reverse("") + "c"

function reverse(str: string, index: number = 0): string {
  if (index >= str.length) return "";
  return reverse(str, index + 1) + str[index];
}
```

# Problem #7: isPalindrome

Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.

```typescript []
// awesome,"",6 => awesome,"e", 5
// awesome,"e",5 => awesome, "em", 4
function isPalindrome(
  given: string,
  check: string = "",
  ind: number = given.length - 1,
): boolean {
  if (check.length === given.length) {
    return given === check ? true : false;
  }
  return isPalindrome(given, check + given[ind], ind - 1);
}
```

# Problem #8: someRecursive

Write a recursive function called someRecursive which accepts an array and a callback. The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.

```typescript []
// return func(arr[index]) ? true : someRecursive(arr, func, index+1)
function someRecursive(
  arr: number[],
  func: (val: number) => boolean,
  index: number = 0,
): boolean {
  if (index >= arr.length) {
    return false;
  }
  return func(arr[index]) ? true : someRecursive(arr, func, index + 1);
}
```

# Problem #9: flatten

Write a recursive function called flatten which accepts an array of arrays and returns a new array with all values flattened.

## takeaways

- In TypeScript, instead of any, you can use a Recursive Type Alias to make this super typesafe:

```typescript []
type NestedArray = number | NestedArray[];

function flatten(arr: NestedArray[]): number[] {
  // ... same logic ...
}
```

```typescript []
//[1, [3,4]]
// return [...arr[index]] + flatten(arr, index+1)

// will fail in extreme cases
function flatten(arr: any): number[] {
  if (arr.length === 0) return [];
  if (Array.isArray(arr[0])) {
    return flatten(arr[0]).concat(flatten(arr.slice(1)));
  } else {
    return [arr[0]].concat(flatten(arr.slice(1)));
  }
}

// better version of the above
function flatten(arr: any): number[] {
  // 1. Guard clause for non-arrays
  if (!Array.isArray(arr)) return [arr];

  if (arr.length === 0) return [];
  if (Array.isArray(arr[0])) {
    return flatten(arr[0]).concat(flatten(arr.slice(1)));
  } else {
    return [arr[0]].concat(flatten(arr.slice(1)));
  }
}

// more safer and better Time Complexity
type NestedArray = number | NestedArray[];
function flatten(arr: NestedArray[], index: number = 0): number[] {
  if (index >= arr.length) return [];

  const current = arr[index];

  // If the current item is an array, flatten it AND the rest of this array
  if (Array.isArray(current)) {
    return [...flatten(current, 0), ...flatten(arr, index + 1)];
  } else {
    // If it's just a value, keep it and move to the next index
    return [current, ...flatten(arr, index + 1)];
  }
}
```

# Problem #10: capitalizeFirst

Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first letter of each string in the array.

## Takeaways

- The Spread operator (...) is elegant but expensive in loops/recursion because it copies the entire array every time.

```typescript []
// Total Time: $O(N.K)$ for the string manipulations + $O(N^2)$ for the array spreading.
// Bad considering time complexity
function capitalizeFirst(arr: string[], index: number = 0): string[] {
  if (index >= arr.length) return [];
  let word: string = arr[index];
  return [
    word[0].toUpperCase() + word.slice(1),
    ...capitalizeFirst(arr, index + 1),
  ];
}
```

- To make this function truly efficient O(N.K), spread operator needs to be avoided

## The "In-Place" Mutation Approach (Most Memory Efficient)

```typescript []
function capitalizeFirst(arr: string[], index: number = 0): string[] {
  if (index >= arr.length) return arr;
  // Mutate the element in place
  arr[index] = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
  // Recurse to the next index
  return capitalizeFirst(arr, index + 1);
}
```

## The "Accumulator" Pattern (Functional & Efficient)

If you want to keep the function "pure" (not changing the original array), use an accumulator. By passing the result-in-progress down through the recursive calls, you only build the array once.

```typescript []
function capitalizeFirst(
  arr: string[],
  index: number[] = 0,
  acc: string[],
): string[] {
  if (index >= arr.length) return acc;

  const capitalized: string =
    arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
  acc.push(capitalized); // O(1) operation

  return capitalizeFirst(arr, index + 1, acc);
}
//Pro-Tip: Tail Call Optimization (TCO)
// The Accumulator version above is "Tail Recursive." In some languages (and theoretically in the ES6 spec, though support varies by engine), the compiler can optimize this so it doesn't add new frames to the call stack. This prevents "Stack Overflow" errors on very large arrays.
```

# Problem #11: nestedEvenSum

Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.

```typescript []
// passing sum as part of the arguments. At the end of object, everything will be summed up
function nestedEvenSum(obj: any, sum: number = 0): number {
  for (let key in obj) {
    if (typeof obj[key] === "number" && Number(obj[key]) % 2 === 0) {
      sum += Number(obj[key]);
    } else if (typeof obj[key] === "object") {
      sum = nestedEvenSum(obj[key], sum);
    }
  }
  return sum;
}

//add the result from recursive call to sum as the sum isn't part of the arguments
function nestedEvenSum(obj: any, sum: number = 0): number {
  for (let key in obj) {
    if (typeof obj[key] === "number" && Number(obj[key]) % 2 === 0) {
      sum += Number(obj[key]);
    } else if (typeof obj[key] === "object") {
      sum += nestedEvenSum(obj[key]);
    }
  }
  return sum;
}
```

# Problem #12: capitalizeWords

Write a recursive function called capitalizeWords. Given an array of words, return a new array containing each word capitalized.

```typescript []
function capitalizeWords(arr: string[], index: number): string[] {
  if (index >= arr.length) return arr;
  const current: string = arr[index];
  arr[index] = current.toUpperCase();
  return capitalizeWords(arr, index + 1);
}
```

# Problem #13: stringifyNumbers

Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings. Recursion would be a great way to solve this!

The exercise intends for you to create a new object with the numbers converted to strings, and not modify the original. Keep the original object unchanged.

## takeaways:

- Object.assign performs a Shallow Copy. It does not merge nested objects deeply. If a property value is an object itself, Object.assign only copies the reference (the "address") to that object, not the actual contents.

```typescript []
function stringifyNumbers(obj: any, newObj: any = {}): object {
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      let num: number = obj[key];
      newObj[key] = String(num);
    } else if (typeof obj[key] === "object") {
      if (!Array.isArray(obj[key])) {
        newObj[key] = stringifyNumbers(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
```

# Problem #14: collectStrings

Write a function called collectStrings which accepts an object and returns an array of all the values in the object that have a typeof string

## takeaways

In JavaScript and TypeScript, .concat() creates a shallow copy of the existing array plus the new elements. If you have 1,000 strings, you might end up copying strings tens of thousands of times as they bubble up through recursive calls.

Here are the best ways to improve it:

1. The Spread Operator (Modern Improvement)
   While the spread operator (...) is syntactically cleaner, it's important to note that in many engines, it performs similarly to .concat() because it still creates a new array. However, it is the "standard" modern way to merge if you must return a new array.

If you want to keep the "build and return" style of the first function but gain the performance of the second, you can use .push() with the spread operator on the result of the recursive call.

Why this is better: Instead of strObj = strObj.concat(...) (which replaces the whole array), strObj.push(...recursiveCall()) mutates the current level's array.

Caveat: For extremely large datasets (tens of thousands of elements), spreading into a push can hit call stack limits.

```typescript []
// build a fresh string array in every function call and then return that to build a final string array.
function collectStringsOne(obj: any): string[] {
  let strObj: string[] = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      strObj.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      strObj = strObj.concat(collectStringsOne(obj[key]));
    }
  }
  return strObj;
}

// using accumulator that will keep adding strings as it traverses in the object
function collectStringsTwo(obj: any, acc: string[] = []): string[] {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      acc.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      acc = collectStringsTwo(obj[key], acc);
    }
  }
  return acc;
}

//better version of One implementation

function collectStringsOneOptimized(obj: Record<string, any>): string[] {
  const result: string[] = [];

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      result.push(value);
    }
    // Ensure value is an object and NOT null before recursing
    else if (value !== null && typeof value === "object") {
      // Use push with spread to avoid creating an extra intermediate array
      result.push(...collectStringsOneOptimized(value));
    }
  }

  return result;
}
```
