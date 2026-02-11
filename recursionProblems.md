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
