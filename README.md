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
