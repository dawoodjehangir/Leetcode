# REDO:

- longest common prefix => implement horizontal and vvertical scanning, Trie also
- group anagrams =>

# Easy

## Array & Hashing

### 1: Concatenation of Array

You are given an integer array nums of length n. Create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).
Specifically, ans is the concatenation of two nums arrays.
Return the array ans.

```typescript []
function getConcatenation(nums: number[]): number[] {
  return nums.concat(nums);
}
```

### 2: Contains Duplicate

Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

```typescript []
function hasDuplicate(nums: number[]): boolean {
  if (!nums.length || nums.length === 1) {
    return false;
  }
  const hashMap = new Map<number, number>();
  for (let num of nums) {
    if (hashMap.has(num)) {
      return true;
    }
    hashMap.set(num, 1);
  }
  return false;
}
```

### 3: Valid Anagram

Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

- does strings consist of only english characters? lowercase, uppercase?
- any intended time and space complexity?

- two strings have to be of the same length => invalid if length is different

```typescript []
// Time complexity O(s+t)
// Space complexity O(s+t)

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const sMap: Record<string, number> = {};
  const tMap: Record<string, number> = {};

  for (let i = 0; i < s.length; i++) {
    sMap[s[i]] = (sMap[s[i]] ?? 0) + 1;
    tMap[t[i]] = (tMap[t[i]] ?? 0) + 1;
  }

  return Object.keys(sMap).every((key) => sMap[key] === tMap[key]);
}

// Time complexity O(nlogn) => depends on sort function. This can be asked to implement also
// Space complexity O(logn) to O(n)
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}
```

### 4: Two Sum

Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.

You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

Return the answer with the smaller index first.

```typescript
//recommended time and space complexity
// O(n) time
// O(n) space

//brute force approach
//O(n^2) time
//O(1) space
function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let ind = 0; ind < nums.length; ind++) {
    for (let sind = ind + 1; sind < nums.length; sind++) {
      if (nums[ind] + nums[sind] === target) {
        return [ind, sind];
      }
    }
  }
}

//optimized
// Hash Map (Two pass)
// Time O(n), Space O(n)
function twoSumHashTwoPass(nums: number[], target: number): number[] {
  const numsMap = new Map<number, number>();

  // First pass
  for (let i = 0; i < nums.length; i++) {
    numsMap.set(nums[i], i);
  }

  // Second pass
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const complementIndex = numsMap.get(complement);

    if (complementIndex !== undefined && complementIndex !== i) {
      return [i, complementIndex];
    }
  }

  return [];
}

//optimized
// Hash Map (One pass)
// Time O(n), Space O(n)

function twoSumHashOnePass(nums: number[], target: number): number[] {
  const numsMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const firstIndex = numsMap.get(complement);

    if (firstIndex !== undefined) {
      return [firstindex, i];
    } else {
      numsMap.set(nums[i], i);
    }
  }
  return [];
}

// Optimized
// Sorting
// Time O(nlogn), Space O(n)
// sort the array O(nlogn) and then use constant time to find two indices
function twoSumSorting(nums: number[], target: number): number[] {
  const pairs: [number, number][] = nums.map((num, index) => [num, index]);

  pairs.sort((a, b) => a[0] - b[0]);

  let left = 0;
  let right = pairs.length - 1;

  while (left < right) {
    const sum = pairs[left][0] + pairs[right][0];

    if (sum === target) {
      return [pairs[left][1], pairs[right][1]];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

// generalized Two Sum solution if the assumption of exactly one pair is removed
function allTwoSumPairs(nums: number[], target: number): number[][] {
  const map = new Map<number, number[]>();
  const result: number[][] = [];

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // If complement already seen
    if (map.has(complement)) {
      // Pair current index with ALL previous complement indices
      for (const prevIndex of map.get(complement)!) {
        result.push([prevIndex, i]);
      }
    }

    // Initialize array if first occurrence
    if (!map.has(nums[i])) {
      map.set(nums[i], []);
    }

    // Store current index
    map.get(nums[i])!.push(i);
  }

  return result;
}
```

### 5: Longest Common Prefix

You are given an array of strings strs. Return the longest common prefix of all the strings.

If there is no longest common prefix, return an empty string "".

```typescript
//brute force
// two pointers.
// initial prefix found using first two strings
// Traverse through the entire array and compare adjacent strings and keep comparing with the initial value
// return the shortest one, which in turn would be the longest
function compare(one: string, two: string): string[] {
  let first: string[] = one.split("");
  let second: string[] = two.split("");
  let lcpArray: string[] = [];
  if (first.length < second.length) {
    for (let char = 0; char < first.length; char++) {
      if (first[char] === second[char]) {
        lcpArray.push(first[char]);
      } else {
        break;
      }
    }
  } else {
    for (let char = 0; char < second.length; char++) {
      if (first[char] === second[char]) {
        lcpArray.push(first[char]);
      } else {
        break;
      }
    }
  }
  return lcpArray;
}

function lcp(strs: string[]): string {
  if (strs.length === 1) return strs[0];
  let lcpArray: string[] = compare(strs[0], strs[1]);
  for (let index = 2; index < strs.length; index++) {
    const previous = strs[index - 1];
    const current = strs[index];
    let tempLCP = compare(previous, current);
    if (tempLCP.length < lcpArray.length) {
      lcpArray = tempLCP;
    }
  }
  return lcpArray.join("");
}

// horizontal scanning
// DO THIS LATER

// vertical scanning
// DO THIS LATER

//Sorting
// DO THIS LATER

// Trie

class TrieNode {
  // In TS, we declare properties and their types outside the constructor
  // Record<string, TrieNode> is like a std::map<string, TrieNode*>
  children: Record<string, TrieNode>;

  constructor() {
    this.children = {};
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
  }

  lcp(word: string, prefixLen: number): number {
    let node = this.root;
    let i = 0;
    const maxPossible = Math.min(word.length, prefixLen);

    while (i < maxPossible) {
      const char = word[i];
      if (!node.children[char]) {
        return i;
      }
      node = node.children[char];
      i++;
    }
    return maxPossible;
  }
}

class Solution {
  longestCommonPrefix(strs: string[]): string {
    if (strs.length === 1) return strs[0];

    // Find the shortest string to minimize Trie depth
    let shortestIdx = 0;
    for (let i = 1; i < strs.length; i++) {
      if (strs[i].length < strs[shortestIdx].length) {
        shortestIdx = i;
      }
    }

    const trie = new Trie();
    trie.insert(strs[shortestIdx]);

    let currentPrefixLen = strs[shortestIdx].length;

    for (const word of strs) {
      currentPrefixLen = trie.lcp(word, currentPrefixLen);
      // Optimization: if LCP hits 0, stop early
      if (currentPrefixLen === 0) break;
    }

    return strs[0].substring(0, currentPrefixLen);
  }
}
```

### 7: Valid Palindrome

Given a string s, return true if it is a palindrome, otherwise return false.

A palindrome is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

```typescript []
// Recommended Time & Space complexity
//Time O(n)
//Space O(1)
// easy examples: "abba"
// complex examples: ""
// empty examples: "empty string"
// invalid examples: "including spaces and non-alphanumeric characters"
function isPalindrome(s: string): boolean {
  //remove non-alphanumeric characters from a string => might lead to space issues
  let start = 0;
  let end = s.length - 1;
  const nonAN: RegExp = /[^a-z0-9]/i; // regex expression to identify non alphanumeric keys
  while (start < end) {
    while (start < end && nonAN.test(s[start])) start++;
    while (start < end && nonAN.test(s[end])) end--;
    if (s[start].toLowerCase() !== s[end].toLowerCase()) return false;
    start++;
    end--;
  }
  return true;
}
```

### 8: Valid Palindrome II

You are given a string s, return true if the s can be a palindrome after deleting at most one character from it.

A palindrome is a string that reads the same forward and backward.

```typescript []
// Time O(n)
// Space Recommended O(1), Mine is O(n) since I create new substrings after removing one character
// Space can be made O(1) if isPalindrome is passed with left and right pointers, rather than returning new substrings

function isPalindrome(s: string): boolean {
  let start = 0;
  let end = s.length - 1;
  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}
function validPalindrome(s: string): boolean {
  let start = 0;
  let end = s.length - 1;
  while (start < end) {
    if (s[start] !== s[end]) {
      const s1 = s.slice(0, start) + s.slice(start + 1, s.length); //removing start one
      const try1 = isPalindrome(s1);
      const s2 = s.slice(0, end) + s.slice(end + 1, s.length); //removing end one
      const try2 = isPalidrome(s2);

      if (try1 === false && try2 === false) {
        return false;
      } else {
        return true;
      }
    }
    start++;
    end--;
  }
  return true;
}
```

### 9: Merge Strings Alternately

You are given two strings, word1 and word2. Construct a new string by merging them in alternating order, starting with word1 — take one character from word1, then one from word2, and repeat this process.

If one string is longer than the other, append the remaining characters from the longer string to the end of the merged result.

Return the final merged string.

```typescript []
// Time O(n+m)
// Space O(n+m)
// A better solution would be to have one pointer (as we are picking from the same index always), and have only one loop
    mergeAlternately(word1: string, word2: string): string {
        let w1Pointer = 0;
        let w2Pointer = 0;
        const shortStr = word1.length < word2.length ? word1 : word2;
        let newStr = "";
        while (w1Pointer < shortStr.length) {
            newStr = newStr + word1[w1Pointer] + word2[w2Pointer];
            w1Pointer++;
            w2Pointer++;
        }
        if (shortStr === word1) {
            return newStr + word2.slice(w2Pointer);
        } else {
            return newStr + word1.slice(w1Pointer);
        }
    }
```

### 10: Baseball Game

You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.

Given a list of strings operations, where operations[i] is the ith operation you must apply to the record and is one of the following:

An integer x: Record a new score of x.
'+': Record a new score that is the sum of the previous two scores.
'D': Record a new score that is the double of the previous score.
'C': Invalidate the previous score, removing it from the record.
Return the sum of all the scores on the record after applying all the operations.

Note: The test cases are generated such that the answer and all intermediate calculations fit in a 32-bit integer and that all operations are valid.

```typescript []
// approach #1
function calPoints(operations: string[]): number {
  let record: number[] = [];
  // traverse the operations array
  // based on the opertions encountered, modify record
  for (let op of operations) {
    switch (op) {
      case "C":
        record.pop();
        break;
      case "D":
        record.push(2 * record[record.length - 1]);
        break;
      case "+":
        record.push(record[record.length - 1] + record[record.length - 2]);
        break;
      default: //will always be numbers
        record.push(parseInt(op));
    }
  }
  //calculate the sum of scores in record
  // O(n)
  return record.reduce((acc, current) => acc + current, 0);
}

// approach #2: where we maintain the final sum while we traverse the operations array
function calPoints(operations: string[]): number {
  let record: number[] = [];
  let recordSum: number = 0;
  // traverse the operations array
  // based on the opertions encountered, modify record
  for (let op of operations) {
    switch (op) {
      case "C":
        recordSum -= record.pop();
        break;
      case "D":
        record.push(2 * record[record.length - 1]);
        recordSum += record[record.length - 1];
        break;
      case "+":
        record.push(record[record.length - 1] + record[record.length - 2]);
        recordSum += record[record.length - 1];
        break;
      default: //will always be numbers
        record.push(parseInt(op));
        recordSum += record[record.length - 1];
    }
  }
  //calculate the sum of scores in record
  // O(n)

  return recordSum;
}
```

### 11: Valid Parentheses

You are given a string s consisting of the following characters: '(', ')', '{', '}', '[' and ']'.

The input string s is valid if and only if:

Every open bracket is closed by the same type of close bracket.
Open brackets are closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
Return true if s is a valid string, and false otherwise.

```typescript []
// Time O(N)
// Space O(N)
function isValid(s: string): boolean {
  const stack: string[] = [];
  const closeToOpenObj: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const closeToOpenMap = new Map<string, string>([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  //   for (let char of s) {
  //     if (closeToOpenObj[char]) {
  //       if (
  //         stack.length > 0 &&
  //         stack[stack.length - 1] === closeToOpenObj[char]
  //       ) {
  //         stack.pop();
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       stack.push(char);
  //     }
  //   }

  for (let char of s) {
    if (closeToOpenMap.has(char)) {
      if (
        stack.length > 0 &&
        stack[stack.length - 1] === closeToOpenMap.get(char)
      ) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0 ? true : false;
}
```

### 12. Reverse Linked List

Given the beginning of a singly linked list head, reverse the list, and return the new beginning of the list.

```typescript []
//1 2 3 4 5
//A, B, C

class ListNode {
  constructor(
    public value: number = 0,
    public next: ListNode | null = null,
  ) {}
}

// Time O(N)
// Space O(1)
// iterativedd
function reverseList(head: ListNode | null): ListNode | null {
  let current: ListNode | null = head;
  let previous: ListNode | null = null;
  while (current !== null) {
    let temp: ListNode | null = current.next;
    current.next = previous;
    previous = current;
    current = temp;
  }
  head = previous;
  return head;
}

//recursive - two pointer
// Space O(N)
function reverseList(head: ListNode | null): ListNode | null {
  const reverseTwoPointer = (
    first: ListNode | null,
    second: ListNode | null,
  ) => {
    if (first !== null) {
      reverseTwoPointer(first.next, first);
      first.next = second;
    } else {
      head = second;
    }
  };
  reverseTwoPointer(head, null);
  return head;
}
```

### 13. Merge Two Sorted Linked Lists

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted linked list and return the head of the new sorted linked list.

The new list should be made up of nodes from list1 and list2.

```typescript []
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let dummy = new ListNode(0, null);
  let temp = dummy;
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      temp.next = list1;
      list1 = list1.next;
    } else {
      temp.next = list2;
      list2 = list2.next;
    }
    temp = temp.next;
  }
  if (list1 === null) {
    temp.next = list2;
  } else if (list2 === null) {
    temp.next = list1;
  }
  return dummy.next;
}
```

### 14. Binary Search

You are given an array of distinct integers nums, sorted in ascending order, and an integer target.

Implement a function to search for target within nums. If it exists, then return its index, otherwise, return -1.

Your solution must run in O(logn) time.

```typescript []
// iterative
// Time O(logN)
// Space O(1)
function search(nums: number[], target: number): number {
  if (nums.length <= 0) return -1;
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left <= right) {
    let mid: number = left + Math.floor((right - left) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid - 1;
    }
  }
  return -1;
}

function binarySearchRecursive(
  l: number,
  r: number,
  nums: number[],
  target: number,
): number {
  if (l > r) return -1;
  let mid: number = l + Math.floor((r - l) / 2);
  if (nums[mid] === target) {
    return mid;
  } else if (target > nums[mid]) {
    return binarySearchRecursive(mid + 1, r, nums, target);
  } else if (target < nums[mid]) {
    return binarySearchRecursive(l, mid - 1, nums, target);
  }
}
```

### 15. Remove Element

You are given an integer array nums and an integer val. Your task is to remove all occurrences of val from nums in-place.

After removing all occurrences of val, return the number of remaining elements, say k, such that the first k elements of nums do not contain val.

```typescript []
// algorithm more complex
// first try
// Space O(1)
// Time O(N^2) because splice is inside an existing loop. Splice itself needs O(N) time for deletion,mutation.
function removeElement(nums: number[], val: number): number {
  if (nums.length <= 0) return 0;
  if (val > 50) return nums.length;
  let start: number = 0;
  let end: number = nums.length - 1;
  let k: number = 0;
  while (start <= end) {
    if (nums[start] === val) {
      while (nums[end] === val) {
        end--;
      }
      let temp = nums.splice(start, 1);
      start--;
      nums.push(temp[0]);
    } else {
      k++;
    }
    start++;
  }
  return k;
}

//Better solution with optimal time and space
function removeElement(nums: number[], val: number): number {
  let start: number = 0;
  let end: number = nums.length;
  let k: number = 0;
  while (start < end) {
    if (nums[start] === val) {
      end--;
      [nums[start], nums[end]] = [nums[end], nums[start]];
    } else {
      start++;
      k++;
    }
  }
  return k;
}
```

### 16. Majority Element

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times in the array. You may assume that the majority element always exists in the array.

```typescript []
// first algo: without optimum time O(2N) and space complexity O(N)
// create a hashmap and traverse through the array => O(N) space in worst case, Time O(N)
// traverse the entries at the end => O(N) worst case

function majorityElement(nums: number[]): number | null {
  const hMap = new Map<number, number>();
  let majorityElement: number;
  for (let num of nums) {
    hMap.set(num, (hMap.get(num) ?? 0) + 1);
  }
  for (let [key, val] of hMap.entries()) {
    if (val > Math.floor(nums.length / 2)) {
      return key;
    }
  }
  return null;
}

// another solution with O(N) Time and O(N) Space
// finding majorityElement in a single traversal

function majorityElement(nums: number[]): number {
  const hMap = new Map<number, number>();
  let majorityNumCount: number = 0;
  let majorityNum: number = 0;

  for (let num of nums) {
    hMap.set(num, (hMap.get(num) ?? 0) + 1);

    if (hMap.get(num)! > majorityNumCount) {
      majorityNumCount = hMap.get(num)!;
      majorityNum = num;
    }
  }
  return majorityNum;
}

// Optimum solution: Linear time and O(1) space
```

### 17. Merge Sorted Array

You are given two integer arrays nums1 and nums2, both sorted in non-decreasing order, along with two integers m and n, where:

m is the number of valid elements in nums1,
n is the number of elements in nums2.
The array nums1 has a total length of (m+n), with the first m elements containing the values to be merged, and the last n elements set to 0 as placeholders.

Your task is to merge the two arrays such that the final merged array is also sorted in non-decreasing order and stored entirely within nums1.
You must modify nums1 in-place and do not return anything from the function.

```typescript []
//This is the most optimal solution
// Space O(1)
// Time O(N)
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let num1Pointer = m - 1;
  let num2Pointer = n - 1;
  let placeholderPointer = m + n - 1;
  while (placeholderPointer > num1Pointer) {
    //recheck condition
    if (nums1[num1Pointer] > nums2[num2Pointer]) {
      nums1[placeholderPointer] = nums1[num1Pointer];
      num1Pointer--;
    } else {
      nums1[placeholderPointer] = nums2[num2Pointer];
      num2Pointer--;
    }
    placeholderPointer--;
  }
}
```

### 18. Remove Duplicates From Sorted Array

You are given an integer array nums sorted in non-decreasing order. Your task is to remove duplicates from nums in-place so that each element appears only once.

After removing the duplicates, return the number of unique elements, denoted as k, such that the first k elements of nums contain the unique elements.

Note:

The order of the unique elements should remain the same as in the original array.
It is not necessary to consider elements beyond the first k positions of the array.
To be accepted, the first k elements of nums must contain all the unique elements.
Return k as the final result.

```typescript []
function removeDuplicates(nums: number[]): number {
  if (nums.length === 1) return 1;
  let first: number = 1;
  let second: number = 1;

  while (first < nums.length) {
    if (nums[first] !== nums[first - 1]) {
      nums[second] = nums[first]; //Main trick: a unique number is encountered
      second++;
      first++;
    } else {
      first++;
    }
  }
  return second;
}
```

### 19. Search Insert Position

You are given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

```typescript
//O(log n) time optimum
function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid - 1;
    }
  }
  return left;
}
```

### 20. Implement Stack Using Queues

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:

void push(int x) Pushes element x to the top of the stack.
int pop() Removes the element on the top of the stack and returns it.
int top() Returns the element on the top of the stack.
boolean empty() Returns true if the stack is empty, false otherwise.
Notes:

You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

```typescript []
// using shift/unshift in case of Queue implementation
class MyQueue {
  private myQueue: number[];

  constructor() {
    this.myQueue = [];
  }
  push(x: number): void {
    this.myQueue.push(x);
  }
  peek(): number {
    return this.myQueue[0];
  }
  pop(): number {
    return this.myQueue.length > 0 ? this.myQueue.shift()! : -1;
  }

  isEmpty(): boolean {
    return this.myQueue.length > 0 ? false : true;
  }

  size(): number {
    return this.myQueue.length;
  }
}

class MyStack {
  private q1: MyQueue;
  private q2: MyQueue;
  constructor() {
    this.q1 = new MyQueue();
    this.q2 = new MyQueue();
  }

  push(x: number): void {
    this.q1.push(x);
  }

  pop(): number {
    while (this.q1.size() > 1) {
      this.q2.push(this.q1.pop());
    }
    let popped = this.q1.pop();
    [this.q1, this.q2] = [this.q2, this.q1];
    return popped;
  }

  top(): number {
    while (this.q1.size() > 1) {
      this.q2.push(this.q1.pop());
    }
    let top = this.q1.pop();
    this.q2.push(top);
    [this.q1, this.q2] = [this.q2, this.q1];
    return top;
  }

  empty(): boolean {
    return this.q1.size() === 0 ? true : false;
  }
}
```

### Linked List Cycle Detection

Given the beginning of a linked list head, return true if there is a cycle in the linked list. Otherwise, return false.

There is a cycle in a linked list if at least one node in the list can be visited again by following the next pointer.

Internally, index determines the index of the beginning of the cycle, if it exists. The tail node of the list will set it's next pointer to the index-th node. If index = -1, then the tail node points to null and no cycle exists.

Note: index is not given to you as a parameter.

```typescript []
function hasCycle(head: ListNode | null): boolean {
  let slowP: ListNode = head;
  let fastP: ListNode = head;
  while (fastP !== null && fastP.next !== null) {
    fastP = fastP.next.next;
    slowP = slowP.next;
    if (fastP === slowP) {
      //has a cycle
      return true;
    }
  }
  return false;
}
```

# Medium

### 6: Group Anagrams

Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

Constraints:

- `1 <= strs.length <= 1000`
- `0 <= strs[i].length <= 100`
- `strs[i]` is made up of lowercase English letters.

```typescript []
//smart solution using hashmaps
// key: would be an entire 26 character array
// val: would be list of strings that share the same structure of 26 char array
function groupAnagrams(strs: string[]): string[][] {
  const result = new Map<string, string[]>();

  for (const word of strs) {
    const key: number[] = new Array(26).fill(0);
    for (const char of word) {
      key[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    const fixedKey = key.join(",");

    if (!result.has(fixedKey)) {
      result.set(fixedKey, []);
    }

    result.get(fixedKey)!.push(word);
  }
  return Array.from(result.values());
}
```

# Hard
