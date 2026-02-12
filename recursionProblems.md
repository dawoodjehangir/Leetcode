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
