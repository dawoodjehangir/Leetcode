# Leetcode

## most common patterns:

hash maps for lookups,
binary search for ordered data,
two pointers for array manipulation,
BFS and DFS for tree or graph traversal, and
dynamic programming for optimization problems.

## Problem Solving

### understand the problem

Questions to ask yourself:

- can I restate the problem in my own words?
- what inputs go into the problem?
- what outputs should come from the solution to the problem?
- can the outputs be determined from the inputs? in other words, do I have enough info to solve the problem? (you may not be able to answer this question until you set about solving the problem).
- how should I label the important pieces of data that are a part of the problem?

### explore concrete examples

Against a certain problem:

- state easy examples/test cases/inputs
- state complex examples/test cases/inputs
- edge cases
- explore empty inputs
- explore invalid inputs

### break it down

- explicity write out the steps you need to take e.g pseudocode

### solve/simplify

- Solve, it it's already simple for you
- If you find it complex, solve a "simpler" problem. And incorporate the complexity iteratively or later on

### look back and refactor

- can you check the result?
- can you derive the result differently?
- can you understand it at a glance?
- can you use the result or method for some problem?
- can you improve the performance of your solution?
- can you think of other ways to refactor?
- how have other people solved this problem?

## Data Structures

### Objects

- works for us when we don't need ordering of data within
- how it works is explained by hashing and hash maps
- insertion, access, removal: $$O(1)$$
- searching: $$O(N)$$

#### methods

- Object.keys: $$O(N)$$
- Object.values: $$O(N)$$
- Object.entries: $$O(N)$$
  This is a little more work as it gives both the Key-Value pair
- hasOwnProperty: $$O(1)$$
  To check if a Key exists in the object

### Arrays

- there is intrinsic ordering in arrays. But ordering comes at a cost
- if we dont need order, we shouldnt try to use arrays
- access: $$O(1)$$
- searching: $$O(N)$$
- insertion: $$depends$$
- removal: $$depends$$

#### methods

- push: $$O(1)$$
- pop: $$O(1)$$
- shift: $$O(N)$$
- unshift: $$O(N)$$
- concat: $$O(N)$$
  concatenates two arrays together `array1.concat(array2)`
- slice: $$O(N)$$
  returns a shallow copy of a part of an array. doesnt modify original array. `array.slice(start,end) //copying from start till end-1, array.slice(start) //copying from start till the last element of array`
- splice: $$O(N)$$
  //study this
- sort: $$O(N*logN)$$
- forEach/map/filter/reduce/etc: $$O(N)$$

## Problem Solving Patterns

### Frequency patterns

example question in video:

```typescript []
// naive solution
// understand, concrete examples, breakdown, solve/simplify, refactor

// if length of two arrs is different, return false
// make two objects corresponding to each arrays

// traverse through arr 1
// put sq value and count in obj 1
// introduce a check such that if value already present then +1, otherwise value is 1

// traverse through arr 2
// introduce a check such that if value already present then +1, otherwise value is 1

// compare if keys and values of objects are same, then true, otherwise false
function same(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) return false;

  let obj1: any = {};
  let obj2: any = {};

  for (let i = 0; i < arr1.length; i++) {
    let squared = arr1[i] ** 2;

    obj1[squared] = (obj1[squared] ?? 0) + 1;
    obj2[arr2[i]] = (obj2[arr2[i]] ?? 0) + 1;
  }
  console.log(Object.entries(obj1));
  console.log(Object.entries(obj2));
  return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
}
```
