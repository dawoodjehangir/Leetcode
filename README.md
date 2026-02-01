# Leetcode

## most common patterns:

hash maps for lookups,
binary search for ordered data,
two pointers for array manipulation,
BFS and DFS for tree or graph traversal, and
dynamic programming for optimization problems.

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
