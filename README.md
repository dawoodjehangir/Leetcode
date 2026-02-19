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
- Object.hasOwn(obj, 'key'): : $$O(1)$$
  To check if a Key exists in the object

- Object.assign(user, { location: "Berlin", active: true });

```
Action: Object {}, Map new Map()
Add/Update: obj.key = value,"map.set(key, value)"
Remove: delete obj.key,map.delete(key)
Clear All: obj = {},map.clear()
Check: "Object.hasOwn(obj, key)",map.has(key)
```

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

- _Introduction:_
  - 8 important patterns for coding interviews split into two categories:
    - _Linear structures:_ arrays, linked lists, strings.
    - _Nonlinear structures:_ trees, graphs.
  - Focus on pre-built code templates for these patterns.

- _Linear Data Structure Patterns:_
  1. _Two Pointers:_
     - Reduces time complexity to linear time \(O(n)\).
     - Two methods:
       - Same direction: used for scanning data in a single pass (e.g., fast and slow pointers to detect cycles or find middle elements).
       - Opposite directions: used for finding pairs (e.g., sum of two numbers in a sorted array).
  2. _Sliding Window:_
     - Refines two pointers to manage a window of elements dynamically.
     - Expands or contracts the window to meet specific conditions (e.g., longest substring without repeating characters).
     - Often combined with hashmaps.
  3. _Binary Search:_
     - Efficiently finds target in logarithmic time \(O(\log n)\).
     - Extends to lists with monotonic conditions, not just sorted numbers.
     - Example: finding the minimum in a rotated sorted array.

- _Nonlinear Data Structure Patterns:_ 4. _Breadth-First Search (BFS):_
  - Explores nodes level by level.
  - Uses a queue to keep track of visited nodes (ideal for level order traversal).
  5. _Depth-First Search (DFS):_
     - Dives deep into one path before exploring others.
     - Often uses recursion and is memory efficient for exploring all paths.
     - Example: counting islands in a grid.
  6. _Backtracking:_
     - Extension of DFS, explores all possible solutions.
     - Builds the solution dynamically by making decisions and backtracking on invalid paths.
     - Example: letter combinations of a phone number.

- _Heaps (Priority Queue):_ 7. _Heaps:_
  - Used for questions related to top K, K smallest/largest.
  - _Min Heap:_ smallest value at the root.
  - _Max Heap:_ largest value at the root.
  - Max Heap is used to find K smallest values, and vice versa for K largest.

- _Dynamic Programming (DP):_ 8. _Dynamic Programming:_
  - Optimizes solutions by breaking problems into overlapping subproblems.
  - Two approaches:
    - _Top-down:_ recursive with memoization to store results.
    - _Bottom-up:_ solves smaller subproblems iteratively using a table.
  - Too complex for this video but covered in-depth on their website.

### Frequency counter pattern

- Particularly common in comparing arrays and strings. Make use of an object to break down each of the array/string and then compare the frequency or related stuff of the arrays/strings.
- anytime we have multiple pieces of data and we need to compare them e.g. anagrams, check if two arrays are equal, etc, use frequency pattern

- example question in video:

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
  return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
}
```

- example anagram question:

```typescript
function validAnagram(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) return false;
  const obj1: any = {};
  const obj2: any = {};
  for (let i = 0; i < str1.length; i++) {
    obj1[str1[i]] = (obj1[str1[i]] ?? 0) + 1;
    obj2[str2[i]] = (obj2[str2[i]] ?? 0) + 1;
  }
  const str1Keys = Object.keys(obj1);
  const str2Keys = Object.keys(obj2);
  if (str1Keys.length !== str2Keys.length) return false;

  return str1Keys.every((key) => obj1[key] === obj2[keys]);
}
```

### Multiple Pointers Pattern

- creating pointers that correspond to an index/position and move towards beginning, end, or middle based on certain condition
- idea: searching for a pair of values/something that meets a condition. Direction isn't defined in an array, string, linked list, or doubly linked list. This usually works efficiently if the data structure we have is sorted, rather than unsorted.
- efficient for solving problems with minimal space complexity as well

- example question in video:
  CountUniqueValues which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

```typescript []
// my solution
function countUniqueValues(sortedArray: number[]): number {
  // state easy examples/test cases/inputs
  // [1,2,3] // 3
  // - state complex examples/test cases/inputs
  // [1,1,1,2] // 2
  // [1,1,1,2,2,2,3,33] //4
  // - edge cases
  // - explore empty inputs
  // [] // 0
  // - explore invalid inputs
  // floating points // not catering in the simplied solution
  // code breakdown
  // check length of array. if zero, return 0
  // intialize count to 1
  // initialize pointers at first and second position
  // check if first and second are different => move second to right
  // check if first and second are same => move both to the right
  // end condition is right one reaching the end of array

  if (sortedArray.length === 0) return 0;
  else if (sortedArray.length === 1) return 1;
  //at least one unique number
  let count: number = 1;
  let first: number = 0;
  let second: number = 1;
  while (second < sortedArray.length) {
    if (sortedArray[first] !== sortedArray[second]) count++;
    first++;
    second++;
  }
  return count;
}

//course solution
// only works if we are allowed to alter the array
function countUniqueValues(sortedArray: number[]): number {
  if (sortedArray.length === 0) return 0;
  else if (sortedArray.length === 1) return 1;
  let first: number = 0;
  let second: number = 1;
  while (second < sortedArray.length) {
    if (sortedArray[first] !== sortedArray[second]) {
      first++;
      sortedArray[first] = sor tedArray[second];
    }
    second++;
  }
  return first + 1;
}
```

### Sliding Window Pattern

- This is really useful when we have a set of data like an array or a string, and we are looking for a subset of that data that is continuous in some way.
- This pattern involves creating a window which can either be an array or number from one position to another. Depending on a certain condition, the window either increases or closes (and a new window is created).
- Very useful for keeping track of a subet of data in an array/string, etc

- example question
  write a function call maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

```typescript
// naive solution
// O(n^2) time complexity
function maxSubarraySum(numArr: number[], consecNum: number): any {
  if (consecNum > numArr.length) return null;
  let left: number = 0;
  let right: number = left + consecNum - 1;
  let max: number = -Infinity;
  let sum: number = 0;
  while (right < numArr.length) {
    for (let i = left; i <= right; i++) {
      sum = sum + numArr[i];
    }
    max = max > sum ? max : sum;
    sum = 0;
    left++;
    right++;
  }
  return max;
}

//sliding window solution
// O(n) time complexity
function maxSubarraySum(arr: number[], consecNum: number): any {
  if (arr.length < consecNum) return null;
  let maxSum: number = -Infinity;
  let tempSum: number = 0;
  for (let i = 0; i < consecNum; i++) {
    maxSum += arr[i];
  }
  for (let i = consecNum; i < arr.length; i++) {
    tempSum = maxSum + arr[i] - arr[i - consecNum];
    maxSum = Math.max(tempSum, maxSum);
  }
  return maxSum;
}
```

### Divide and Conquer

- This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
- Can tremendously decrease time complexity

### Intervals Coding Pattern

- typically this is associated with array, linked list, strings and heap (uses interval type of problem).
- How to Identify? => Most of the cases you are given some time sequence and in that time sequence you are being asked specific different intervals that are separate from each other or somehow they overlap between each other. And you might be given task to find like a common window or a common space between any two set of variables, where you can find some value that is empty in between (e.g. for a meeting)
- questions like calendar management, project management (trying to do certain things in a sequential manner due to dependencies), find a room, meeting slot, etc.

### Fast and Slow Pointers

- rabbit/hare & tortoise problem.
- We move across arrays, linkedlist or strings
- #1 - where is this used? => Given any single array/linked list, you want to find middle point the DS. Considering F pointer reaches the end of DS, the S pointer will be in the middle.
- #2 - Where is this used? => Detect cycles

## Recursion

- Two essential parts of a recursive function is: Base case and A Different Input
- Things to look at:
- Can you spot the base case?
- Do you notice the different input?
- What would happen if we didn't return?

- break the sequence/formula/problem to figure out return statement.

### Pitfalls/Common problems

- No base case; base case is wrong
- forgetting to return; returning the wrong thing

### Design Pattern: Recursion

- Helper Method Recursion => Usually useful when we have to compile result in an array or some other DS.
- Define a recursive function inside another outer function and then call that recursive function from that outer function.

### Pure Recursion Tips

- For arrays, use methods like slice, the spread operator, and concat that make copies of arrays so you don't mutate them.
- Strings are immutable so you will need to use methods like slice, substr, or substring to make copies of strings
- To make copies of objects use Object.assign, or the spread operator

```typescript []
function sumRange(num: number): number {
  if (num === 1) {
    return 1;
  }
  return num + sumRange(num - 1);
}

function factorial(num: number): number {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}

function collectOddValues(arr: number[], index: number = 0): number[] {
  //base case
  //check if value at the first index is odd
  //if yes, add that into an empty array + return call to same function with one index less
  // just return call to same function with one index less.

  if (index >= arr.length) return [];
  if (arr[index] % 2 === 0) return collectOddValues(arr, index + 1);
  else {
    return [arr[index], ...collectOddValues(arr, index + 1)];
  }
}

// While the Divide step is now $O(1)$, the Combine step [arr[index], ...collectOddValues(...)] still technically takes $O(K)$ time (where $K$ is the number of odd values found so far) because it creates a new array and copies the elements into it.If you were dealing with millions of items and wanted to reach Absolute Maximum Performance, you would use the Helper Method with .push()
```

## Searching Algorithms

- Following javascript methods all do linear search: indexOf, includes, find, findIndex with O(N) time complexity

### Binary Search

- Time complexity in worst and average case is O(logN)

```typescript []
function binarySearch(arr: number[], num: number): number {
  if (arr.length <= 0) return -1;
  let left: number = 0;
  let right: number = arr.length - 1;
  while (left <= right) {
    let middle = left + Math.floor((right - left) / 2);
    if (num === arr[middle]) {
      return middle;
    } else if (num > arr[middle]) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}
```

### Naive String Search

- count the no. of times a substring appears in a string

```typescript []
khenaaahenpp;

hen;

function naiveStringSearch(str: string, sub: string): number {
  if (str.length <= 0) return -1;
  let count = 0;
  let ptr = 0;
  for (let char of str) {
    if (char === sub[ptr]) {
      ptr++;
    } else {
      ptr = 0;
    }

    if (ptr === sub.length) count++;
  }
  return count;
}
```

## Sorting Algorithms

### Course2 notes

- Comparison based sorts: Bubble, Insertion, Selection, Heap, Merge, Quick, Tree, Shell
- Index based sorts: Count, Bucket/Bin, Radix

- $$O(N^2)$$: Bubble, Insertion, Selection
- $$O(NlogN)$$: Heap, Merge, Quick, Tree
- $$O(N^1.5)$$: Shell
- $$O(N)$$: Count, Bucket/Bin, Radix // But these consume a lot of space

#### Bubble sort

- For an array of length N, the no. of passes required to sort are N-1.
  No. of Passes=N-1
- The time complexity of the sorting algorithm depends on the no. of comparisons done.
- No. of comparisons (For array length N) = (n-1) + (n-2) + (n-3) + ... + 3 + 2 + 1 = (n\*(n-1))/2 = O(N^2)
- Maximum no. of possible swaps (For array length N) = (n-1) + (n-2) + (n-3) + ... + 3 + 2 + 1 = (n\*(n-1))/2 = O(N^2)
- By nature, Bubble sort isn't adaptive (e.g. if array already sorted, the algo keeps running and comparing elements). It is made adaptive with the help of a flag variable.
- Minimum time taken by Bubble Sort is O(N) - if array is already sorted. Max time taken by Bubble Sort is O(N^2).
- Bubble Sort is also stable (preserves the order of elements after sorting).
- In the first pass, we get the largest element. Second pass we get two largest elements and so on.

```typescript []
// looping is done for N-1 times because N-1 passes are need for an array of length N. That is why "i < arr.length - 1"

// comparisons between consective elements reduce with every passing iteration because the end of the array starts to get sorted. One less comparison with every pass. Hence "j < arr.length - 1 - i"
function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    //loop dictating the passes through the array
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // loop needed for comparing consective elements
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
  return arr;
}

//adaptive bubble sort
function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    //loop dictating the passes through the array
    let flag = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // loop needed for comparing consective elements
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
        flag = false;
      }
    }
    if (flag) break;
  }
  return arr;
}
```

#### Insertion sort

##### Mechanism of Insertion

- Focus has to done on the name: Insertion
- Insertion works differently for an array vs linkedlist
- To insert an element in a sorted position within a sorted array, start from the end of the array and start shifting the existing elements to the right, until you come across an element that is smaller than that element. So basically you shift all the larger elements to the right side in the array and perform insertion.
- For array: Min is O(1). Max is O(N)
- For a singly linkedlist, traverse from the beginning using two pointers. When the Front pointer reaches a value that is greater than the element, create a new node. Point the Tail pointer to the new Node and point the new Node's pointer to the Front pointer.
- For a singly linkedlist: Min is O(1). Max is O(N)

##### The Algorithm

- For an array of length N, the no. of passes required to sort are N-1.
  No. of Passes=N-1
- No. of comparison = 1 + 2 + 3 + ... + n-1 = (n\*(n-1))/2 = O(N^2)
- Max No. of swaps = 1 + 2 + 3 + ... + n-1 = (n\*(n-1))/2 = O(N^2)
- Unlike bubble sort, intermediate passes of the algo doesn't return us either the smallest or the largest elements.
- It is more suitable for sorting a linkedlist than array, since we don't have to shift items of a linkedlist. By it's nature, it's more so designed of linkedlist

```typescript []
// we build a sorted array on the left hand side.
// first element is taken to be the sorted one, from first pass. e.g. we start from i=1 (and not i=0)
// progressively we build sorted array on the left side, by picking elements from the right side

function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let current = arr[i];
    while (j > -1 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }

  return arr;
}
```

- In a sorted array, No. of comparisons = (n-1) times in insertionSort => O(N)
- In a sorted array, No. of Swaps = 0 in insertionSort => O(1)
- By nature, insertionSort is adaptive. We didn't force adaptivity through some extra variable.
- Time complexity: Min=O(N) Max=O(N^2)
- Swaps: Min=O(1) Max=O(N^2)
- Insertion sort is also stable in nature.

#### Selection Sort

#### Comparison of Sorting Algorithms

| Parameters | Bubble Sort                                                  |                      Insertions Sort                       |
| :--------- | :----------------------------------------------------------- | :--------------------------------------------------------: |
| Min Comp   | N (list in Ascending Order)                                  |         N (actually N-1) (list in Ascending Order)         |
| Max Comp   | N^2 (if list is in descending order)                         |            N^2 (if list is in descending order)            |
| Min Swap   | O(1) (0 swaps, Ascending)                                    |                 O(1) (0 swaps, Ascending)                  |
| Max Swap   | N^2 (Descending)                                             |                      N^2 (Descending)                      |
| Adaptive   | Yes                                                          |                            Yes                             |
| Stable     | Yes                                                          |                            Yes                             |
| Linkedlist | No (you may have to shift elements, create a new Linkedlist) | Yes (No shifting of elements or creating a new Linkedlist) |
| K passes   | Yes, gives you K sorted elements                             |   No, doesn't confirm any sorting in intermediate steps    |

### Course 1:

### Built-in sort in Javascript

- It sorts based on unicode characters
- By itself, it doesn't always work as expected, especially when it comes to non-string based data.
- Therefore, we need to give a comparator function to it. That basically informs the sorting funtion to sort based on the comparator function.

```typescript []
let arr = [2, 5, 73, 2, 57, 8];

// this will sort ascending
arr.sort((a, b) => a - b);
// if a-b is negative, a comes before b
// if a-b is positive, b comes before a
// if a-b is 0, nothing happens

// this will sort descending
arr.sort((a, b) => b - a);

// this will sort array of strings based on the length of each string
array.sort((a, b) => a.length - b.length);
```

### Bubble Sort

- It's not that efficient.
- In one use-case, it performs better.
- An algorithm where the largest values bubble up to the top of the data structure i.e. array. The algorithm spans multiple passes through the array.
- for data that is almost sorted, bubble sort isn't great. So we make an optimization to this i.e. make use of a variable that checks if there have been any swaps in a single pass of the array
- Time complexity is O(N^2) in the worst case. In the best case scenairo, when the data is almost sorted + check variable is used, time complexity would be O(N).

```typescript []
// optimized bubble sort

function bubbleSort(arr: number[]): number[] {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
// optimized bubble sort - for almost sorted data
function bubbleSort(arr: number[]): number[] {
  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;
    console.log(`Pass: ${arr.length - i + 1}`);
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

//exercise
function bubbleSort<T>(arr: T[], callback?: (a: T, b: T) => number) {
  // 1. Handle the default comparator if one isn't provided
  if (typeof callback !== "function") {
    console.log("no callback");
    callback = (a: any, b: any): number => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      const decision = callback(arr[j], arr[j + 1]);
      if (decision > 0) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
```

### Selection Sort

- Similar to bubble sort, but instead of first placing large values into sorted position, it places small values into sorted position
- Only efficient if => we are worried about writing to memory since only one swap is done after a whole pass, unlike bubble sort where the swapping keeps happening.
- Time complexity is O(N^2)

```typescript []
function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

//optimized - only swap if needed
function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}
```

### Insertion Sort

- builds up the sort by gradually creating a larger left half which is always sorted

## Quick notes:

- frequency counter = deals with >1 arrays, strings, linked list (probably). Can be sorted/unsorted. Makes use of objects to compare these DS between themselves.
- multiple pointers = deals with sorted (not necessarily) arrays/strings/linkedlists to compare a pair of values within against a certain condition. Pointers point towards different indexes, etc and then move with the DS
- sliding window = deals with arrays/strings (sorted/unsorted) while looking for a subset of data within
- divide & conquer = divides a data set into smaller chunks and repeats the process with a subset of data
