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

### Verifying An Alien Dictionary

In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

Given a sequence of words written in the alien language, and the order of the alphabets, return true if and only if the given words are sorted lexicographically in this alien language.

```typescript []
//word1 and word2 can be compared the following way:
// word1 should have smaller length than word2 if all letters are same
// if I find a different letter, than one in word1 should have a smaller index from orderMapping, if the index is fine, then we dont need to compare the upcoming letters hence the break statement
function isAlienSorted(words: string[], order: string): boolean {
  const orderMapping = new Map<string, number>();
  for (let i = 0; i < order.length; i++) {
    orderMapping.set(order[i], i);
  }
  for (let i = 1; i < words.length; i++) {
    let word1 = words[i - 1];
    let word2 = words[i];

    for (let j = 0; j < word1.length; j++) {
      if (j === word2.length) {
        return false;
      }

      if (word1[j] !== word2[j]) {
        if (orderMapping.get(word1[j]) > orderMapping.get(word2[j])) {
          return false;
        } else {
          break;
        }
      }
    }
  }
  return true;
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
function longestCommonPrefixH(strs: string[]) {
  //since we compare string at 0 index with everyone else, hence we take it's length as longestCP
  let maxPrefixLength: number = strs[0].length;
  //Loop over all remaining strings in the list
  for (let i = 1; i < strs.length; i++) {
    //variable to check till which character there's a mismatch. Can be zero also in case of empty string
    let j = 0;
    while (j < Math.min(strs[0].length, strs[i].length)) {
      //in case of mismatch we update the maxPrefixLength
      if (strs[0][j] !== strs[i][j]) {
        break;
      }
      j++;
    }
    maxPrefixLength = Math.min(maxPrefixLength, j);
  }
  return strs[0].slice(0, maxPrefixLength);
}

// vertical scanning
function longestCommonPrefixV(strs: string[]): string {
  //initialize
  //outer loop on the first string in the array
  //inner loop going over all other strings in the array and checking column wise
  // breaking conditions: we have reached some string's length or characters mismatch
  //if we come out of both loops then that means first string is already a lcp
  let lcpLength: number = strs[0].length;
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j].length === i || strs[0][i] !== strs[j][i]) {
        lcpLength = Math.min(lcpLength, i);
      }
    }
  }
  return strs[0].slice(0, lcpLength);
}

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
// Bayer-Moore algorithm - precise solution
function majorityElement(nums: number[]): number {
  let majorityElement = 0;
  let majorityElementCount = 0;
  for (let num of nums) {
    if (majorityElementCount === 0) {
      majorityElement = num;
    }
    majorityElementCount += num === majorityElement ? 1 : -1;
  }
  return majorityElement;
}
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
  let nums1Pointer = m - 1;
  let nums2Pointer = n - 1;
  let invalidZeroPointer = m + n - 1;
  while (nums2Pointer >= 0) {
    if (nums1Pointer >= 0 && nums2[nums2Pointer] < nums1[nums1Pointer]) {
      nums1[invalidZeroPointer] = nums1[nums1Pointer];
      nums1Pointer--;
      invalidZeroPointer--;
    } else {
      nums1[invalidZeroPointer] = nums2[nums2Pointer];
      nums2Pointer--;
      invalidZeroPointer--;
    }
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

// using two queues
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

// using one queue
// push O(1)
// pop O(n)
class MyStack {
  private q: MyQueue;
  constructor() {
    this.q = new MyQueue();
  }

  push(x: number): void {
    this.q.push(x);
  }

  pop(): number {
    let size = this.q.size();
    for (let i = 0; i < size - 1; i++) {
      this.q.push(this.q.pop());
    }
    return this.q.pop();
  }

  top(): number {
    let size = this.q.size();
    for (let i = 0; i < size - 1; i++) {
      this.q.push(this.q.pop());
    }
    let top = this.q.pop();
    this.q.push(top);
    return top;
  }

  empty(): boolean {
    return this.q.size() === 0 ? true : false;
  }
}
```

### 21. Linked List Cycle Detection

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

### 22. Guess Number Higher Or Lower

We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

0: your guess is equal to the number I picked (i.e. num == pick).
-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
Return the number that I picked.

```typescript []
// Time O(logN)
// Space O(1)
function guessNumber(n: number): number {
  let left: number = 0;
  let right: number = n;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    let check = guess(mid);
    if (check === 0) {
      return mid;
    } else if (check === -1) {
      right = mid - 1;
    } else if (check === 1) {
      left = mid + 1;
    }
  }
}

//recursive also.
function guessNumber(n: number): number {
  let left: number = 0;
  let right: number = n;
  return this.gr(left, right);
}
function gr(l: number, r: number): number {
  if (l > r) {
    return -1;
  }
  let mid: number = l + Math.floor((r - l) / 2);
  let check: number = guess(mid);
  if (check === 0) {
    return mid;
  } else if (check === 1) {
    return this.gr(mid + 1, r);
  } else if (check === -1) {
    return this.gr(l, mid - 1);
  }
}
```

### 23. Sqrt(x)

You are given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

For example, do not use pow(x, 0.5) in c++ or x \*\* 0.5 in python.

```typescript []
function mySqrt(x: number): number {
  //l has to be 1 as non negative and can't be lower than that
  //r is x itself
  //sqrt idea should make us think of BS since usually sqrt(x)
  // is usually lower than x/2. Think of basic numbers to understand this
  let l: number = 1;
  let r: number = x;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (mid * mid === x) {
      return mid;
    } else if (mid * mid > x) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  if (l === r) {
    return r;
  }
  return r;
}

function recursiveMySqrt(l: number, r: number, x: number): number | null {
  if (l > r) {
    return r;
  }
  let mid: number = l + Math.floor((r - l) / 2);
  if (mid * mid === x) {
    return mid;
  } else if (mid * mid > x) {
    return this.bsr(l, mid - 1, x);
  } else {
    return this.bsr(mid + 1, r, x);
  }
}
```

### 24. Implement Queue using Stacks

```typescript []
//using Two stacks
// this is brute force i.e. bad. Pop and Peek take O(N) time

class MyStack {
  private myStack: number[];
  constructor() {
    this.myStack = [];
  }
  push(x: number): void {
    this.myStack.push(x);
  }
  pop(): number | undefined {
    return this.myStack.pop();
  }
  peek(): number {
    return this.myStack[this.size() - 1];
  }
  size(): number {
    return this.myStack.length;
  }
  isEmpty(): boolean {
    return this.size() === 0 ? true : false;
  }
}

// brute force queue with O(1) push and O(N) pop and peek
class MyQueue {
  private s1: MyStack;
  private s2: MyStack;
  constructor() {
    this.s1 = new MyStack();
    this.s2 = new MyStack();
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x: number): void {
    this.s1.push(x);
  }

  /**
   * @return {number}
   * O(n) since item's have to be popped from s1 to s2
   */
  pop(): number {
    while (this.s1.size() > 1) {
      this.s2.push(this.s1.pop()!);
    }
    let res = this.s1.pop();
    while (!this.s2.isEmpty()) {
      this.s1.push(this.s2.pop()!);
    }
    return res!;
  }

  /**
   * @return {number}
   */
  peek(): number {
    while (!this.s1.isEmpty()) {
      this.s2.push(this.s1.pop()!);
    }
    let res = this.s2.peek();
    while (!this.s2.isEmpty()) {
      this.s1.push(this.s2.pop()!);
    }
    return res;
  }

  /**
   * @return {boolean}
   */
  empty(): boolean {
    return this.s1.isEmpty();
  }
}

// Amortized O(1) pop and peek
// Push is still O(1)
class MyQueue {
  private s1: MyStack;
  private s2: MyStack;
  constructor() {
    this.s1 = new MyStack();
    this.s2 = new MyStack();
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x: number): void {
    this.s1.push(x);
  }

  /**
   * @return {number}
   * O(n) since item's have to be popped from s1 to s2
   */
  pop(): number {
    let res: number;
    if (this.s2.isEmpty()) {
      while (this.s1.size() > 1) {
        this.s2.push(this.s1.pop());
      }
      res = this.s1.pop();
    } else {
      res = this.s2.pop();
    }
    return res;
  }

  /**
   * @return {number}
   */
  peek(): number {
    let res: number;
    if (this.s2.isEmpty()) {
      while (!this.s1.isEmpty()) {
        this.s2.push(this.s1.pop());
      }
    }
    res = this.s2.peek();
    return res;
  }

  /**
   * @return {boolean}
   */
  empty(): boolean {
    return this.s1.isEmpty() && this.s2.isEmpty();
  }
}
```

### 25. Binary Tree Inorder Traversal

You are given the root of a binary tree, return the inorder traversal of its nodes' values.

```typescript []
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//pure recursion
// This is bad becuase copying of result array using ... is O(N) in worst case on top of the usual O(N) time complexity. Similarly, usage of space is also more due to array building than the stack that's anyway needed
function inorderTraversal(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  let result: number[] = [];
  result.push(...this.inorderTraversal(root.left));
  result.push(root.val);
  result.push(...this.inorderTraversal(root.right));
  return result;
}

//using a nested function/accumulator
// O(N) Time
// O(height of tree) Space considering the stack
// O(N) space for array
function inorderTraversal(root: TreeNode | null): number[] {
  let result: number[] = [];
  const it = (root) => {
    if (!root) return;
    it(root.left);
    result.push(root.val);
    it(root.right);
  };
  it(root);
  return result;
}

// iterative solution
// this will need a stack to keep track of the nodes.
// Time complexity is again O(N). Space is O(height of tree) for stack and O(N) for result
function inorderTraversal(root: TreeNode | null): number[] {
  const myStack: TreeNode[] = [];
  const result: number[] = [];
  let curr: TreeNode | null = root;

  while (curr !== null || myStack.length > 0) {
    while (curr !== null) {
      myStack.push(curr);
      curr = curr.left;
    }
    curr = myStack.pop();
    result.push(curr.val);
    curr = curr.right;
  }

  return result;
}

// bari's iterative solution
function inorderTraversal(root: TreeNode | null): number[] {
  const myStack: TreeNode[] = [];
  let result: number[] = [];
  let curr: TreeNode | null = root;
  while (curr !== null || myStack.length > 0) {
    if (curr !== null) {
      myStack.push(curr);
      curr = curr.left;
    } else {
      curr = myStack.pop();
      result.push(curr.val);
      curr = curr.right;
    }
  }
  return result;
}
```

### 26. Binary Tree Preorder Traversal

You are given the root of a binary tree, return the preorder traversal of its nodes' values.

```typescript []
// we will now try the optimal recursive solution
function preorderTraversal(root: TreeNode | null): number[] {
  let result: number[] = [];
  const preorder = (root) => {
    if (root === null) {
      return;
    }
    result.push(root.val);
    preorder(root.left);
    preorder(root.right);
  };
  preorder(root);
  return result;
}

// we will now try the optimum iterative solution
function preorderTraversal(root: TreeNode | null): number[] {
  const myStack: TreeNode[] = [];
  let result: number[] = [];
  let curr: TreeNode | null = root;
  while (curr !== null || myStack.length > 0) {
    while (curr !== null) {
      myStack.push(curr);
      result.push(curr.val);
      curr = curr.left;
    }
    curr = myStack.pop();
    curr = curr.right;
  }
  return result;
}

// bari's iterative solution
function preorderTraversal(root: TreeNode | null): number[] {
  const myStack: TreeNode[] = [];
  let result: number[] = [];
  let curr: TreeNode | null = root;
  while (curr !== null || myStack.length > 0) {
    if (curr !== null) {
      myStack.push(curr);
      result.push(curr.val);
      curr = curr.left;
    } else {
      curr = myStack.pop();
      curr = curr.right;
    }
  }
  return result;
}
```

### 27. Binary Tree Postorder Traversal

You are given the root of a binary tree, return the postorder traversal of its nodes' values.

```typescript []
// recursive
function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const postorder = (root) => {
    if (root === null) {
      return;
    }
    postorder(root.left);
    postorder(root.right);
    result.push(root.val);
  };
  postorder(root);
  return result;
}

// bari's iterative post order
function postorderTraversal(root: TreeNode | null): number[] {
  const myStack: TreeNode[] = [];
  const visited: boolean[] = [];
  const result: number[] = [];
  let curr: TreeNode = root;
  let visitValue: boolean;

  while (curr !== null || myStack.length > 0) {
    if (curr !== null) {
      myStack.push(curr);
      visited.push(false);
      curr = curr.left;
    } else {
      curr = myStack.pop();
      visitValue = visited.pop();
      if (!visitValue) {
        myStack.push(curr);
        visited.push(!visitValue);
        curr = curr.right;
      } else {
        result.push(curr.val);
        curr = null;
      }
    }
  }
  return result;
}

// bari's iterative post order with a tuple stack
function postorderTraversal(root: TreeNode | null): number[] {
  const myStack: [TreeNode, boolean][] = [];
  const result: number[] = [];
  let curr: TreeNode | null = root;

  while (curr !== null || myStack.length > 0) {
    if (curr !== null) {
      myStack.push([curr, false]);
      curr = curr.left;
    } else {
      const [node, visitVal] = myStack.pop()!;
      curr = node;
      if (!visitVal) {
        myStack.push([curr, !visitVal]);
        curr = curr.right;
      } else {
        result.push(curr.val);
        curr = null;
      }
    }
  }
  return result;
}
```

### 28. Contains Duplicate II

You are given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k, otherwise return false.

```typescript []
// Tried Hash Set since it allows storing single values and doesn't allow duplication at all
//Time Complexity is O(N)
// Space Complexity O(k) => size of the set at a certain time
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const hSet = new Set<number>();
  let j: number = 0;
  let counter: number = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > k) {
      hSet.delete(nums[j]);
      j++;
    }
    if (hSet.has(nums[i])) {
      return true;
    } else {
      hSet.add(nums[i]);
    }
  }
  return false;
}

// same as above but with better naming convention for understanding
function containsNearbyDuplicate(nums, k) {
  let window = new Set();
  let L = 0;

  for (let R = 0; R < nums.length; R++) {
    if (R - L > k) {
      window.delete(nums[L]);
      L++;
    }
    if (window.has(nums[R])) {
      return true;
    }
    window.add(nums[R]);
  }
  return false;
}
```

### 29. Best Time to Buy and Sell Stock

You are given an integer array prices where prices[i] is the price of NeetCoin on the ith day.

You may choose a single day to buy one NeetCoin and choose a different day in the future to sell it.

Return the maximum profit you can achieve. You may choose to not make any transactions, in which case the profit would be 0.

```typescript []
//O(n) time
// re-read the question statement i.e. they aren't asking the exact days i.e. indices when you buy and sell, rather they just want to know the max profit possible which is very easy.
function maxProfit(prices: number[]): number {
  //if there's only one buy option then we can't sell hence 0 profit
  if (prices.length === 0) return 0;
  let buy: number = 0;
  let sell: number = 1;
  let maxP: number = 0;
  while (sell < prices.length) {
    if (prices[sell] > prices[buy]) {
      maxP = Math.max(maxP, prices[sell] - prices[buy]);
    } else {
      buy = sell;
    }
    sell++;
  }
  return maxP;
}
```

### 30. Invert Binary Tree

You are given the root of a binary tree root. Invert the binary tree and return its root.

```typescript []
// idea is to follow levelorder traversal and then switch children as we go down the tree or as we come up
//method #1 going down the tree
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }
  [root.right, root.left] = [root.left, root.right];
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  return root;
}

//below solution unnecessarily complicated since it's moving in the tree in inorder way, while inverting the tree. Inverting the tree, doesn't require inorder. Hence, not recommended as it shows lack of deep understanding. Instead shows maybe memorization
function invertTreeiterative(root: TreeNode | null): TreeNode | null {
  const myStack: TreeNode[] | null = [];
  let curr: TreeNode | null = root;
  while (curr !== null || myStack.length > 0) {
    if (curr !== null) {
      [curr.left, curr.right] = [curr.right, curr.left];
      myStack.push(curr);
      curr = curr.left;
    } else {
      curr = myStack.pop();
      curr = curr.right;
    }
  }
  return root;
}

//straightforward iterative dfs solution
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop()!;

    [current.left, current.right] = [current.right, current.left];

    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }

  return root;
}
//using BFS
function bfs(root: TreeNode | null) {
  if (root == null) return null;
  const myQueue: TreeNode[] | null = [];
  myQueue.push(root);
  while (myQueue.length > 0) {
    let node = myQueue.shift();
    [node.left, node.right] = [node.right, node.left];
    if (node.left !== null) {
      myQueue.push(node.left);
    }
    if (node.right !== null) {
      myQueue.push(node.right);
    }
  }
  return root;
}
```

### 31. Maximum Depth of Binary Tree

Given the root of a binary tree, return its depth.

The depth of a binary tree is defined as the number of nodes along the longest path from the root node down to the farthest leaf node.

```typescript []
// recursive way
// this is donw top -> down
function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  } else {
    let left = this.maxDepth(root.left);
    let right = this.maxDepth(root.right);

    return 1 + Math.max(left, right);
  }
}
//Breadth-First Search (BFS) processes the tree level by level.
//This makes it a perfect fit for computing the maximum depth because:

//Every iteration of BFS processes one entire level of the tree.
//So each completed level corresponds to increasing the depth by 1
//implement the same using bfs
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  const myQueue: TreeNode[] | null = [];
  myQueue.push(root);
  let maxDepth = 0;
  while (myQueue.length > 0) {
    const size = myQueue.length;
    for (let i = 0; i < size; i++) {
      let node: TreeNode | null = myQueue.shift();
      if (node.left !== null) {
        myQueue.push(node.left);
      }
      if (node.right !== null) {
        myQueue.push(node.right);
      }
    }
    maxDepth++;
  }
  return maxDepth;
}

// implement using iterative dfs
// this algo looks like the inorder and preorder traversal
// maxDepth is used because depth varaible is the "height till a particular node" which keeps changing as we traverse through the tree, while maxDepth keeps track of max depth we achieved at a certain point in traversal.
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  const myStack: [TreeNode, number][] = [];
  let current: TreeNode | null = root;
  let depth = 1;
  let maxDepth = 0;
  while (current !== null || myStack.length > 0) {
    if (current !== null) {
      myStack.push([current, depth]);
      maxDepth = Math.max(maxDepth, depth);
      current = current.left;
      depth++;
    } else {
      const [node, d] = myStack.pop()!;
      current = node.right;
      depth = d + 1;
    }
  }
  return maxDepth;
}

//cleaner iterative dfs solution
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  const myStack: [TreeNode, number][] = [];
  myStack.push([root, 1]);
  let maxDepth = 0;
  while (myStack.length > 0) {
    const [node, depth] = myStack.pop();
    maxDepth = Math.max(depth, maxDepth);
    if (node.left !== null) {
      myStack.push([node.left, depth + 1]);
    }
    if (node.right !== null) {
      myStack.push([node.right, depth + 1]);
    }
  }
  return maxDepth;
}
```

### 32. Diameter of Binary Tree

The diameter of a binary tree is defined as the length of the longest path between any two nodes within the tree. The path does not necessarily have to pass through the root.

The length of a path between two nodes in a binary tree is the number of edges between the nodes. Note that the path can not include the same node twice.

Given the root of a binary tree root, return the diameter of the tree.

```typescript []
//Since the core algorithm uses the height of BT, that indirectly ensures that one node isn't counted twice

function diameterOfBinaryTree(root: TreeNode | null): number {
  if (root === null) return 0;
  let maxDiameter: number = 0;
  const dbt = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    } else {
      let left = dbt(node.left);
      let right = dbt(node.right);
      let d = left + right;
      maxDiameter = Math.max(maxDiameter, d);
      return Math.max(left, right) + 1;
    }
  };
  dbt(root);
  return maxDiameter;
}
```

### 33. Balanced Binary Tree

Given a binary tree, return true if it is height-balanced and false otherwise.

A height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

```typescript []
function isBalanced(root: TreeNode | null): boolean {
  const helper = (root: TreeNode | null): [boolean, number] => {
    if (root === null) return [true, 0];
    let left = helper(root.left);
    let right = helper(root.right);

    let balanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

    return [balanced, 1 + Math.max(left[1], right[1])];
  };

  return helper(root)[0];
}

//iterative dfs
// seems quite complicated, hence left out for now
```

### 34. Same Binary Tree

Given the roots of two binary trees p and q, return true if the trees are equivalent, otherwise return false.

Two binary trees are considered equivalent if they share the exact same structure and the nodes have the same values.

```typescript []
// my first solution. Works but might be slightly difficult to understand.
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null) {
    return q === null;
  }
  if (q === null) return false;
  if (p.val !== q.val) return false;
  let left = isSameTree(p.left, q.left);
  let right = isSameTree(p.right, q.right);
  return left && right;
}

//easy to understand solution
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true;
  if (p !== null && q !== null && p.val === q.val) {
    return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
  } else {
    return false;
  }
}

//iterative dfs

//bfs
```

### 35. Subtree of Another Tree

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

```typescript []
//edge cases
// if both trees are null, then the answer is yes for subtree
// what if main tree is normal, but smaller tree is null, then the answer is also yes

//Time complexity s O(m.n), where m is # of nodes in root and n is # of nodes in subRoot
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null) {
    return q === null;
  }
  if (p !== null && q !== null && p.val === q.val) {
    return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
  } else {
    return false;
  }
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (subRoot === null) return true;
  if (root === null) return false;

  if (this.isSameTree(root, subRoot)) {
    return true;
  } else {
    return (
      this.isSubtree(root.left, subRoot) || this.isSubtree(root.right, subRoot)
    );
  }
}
```

### 36. Sum of All Subsets XOR Total

The XOR total of an array is defined as the bitwise XOR of all its elements, or 0 if the array is empty.

For example, the XOR total of the array [2,5,6] is 2 XOR 5 XOR 6 = 1.
You are given an array nums, return the sum of all XOR totals for every subset of nums.

Note: Subsets with the same elements should be counted multiple times.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b.

```typescript []
// using the standard backtracking approach
// draw a tree first to understand how the solution will pan out
// consider the template for a general backtracking problem, that explores all solutions
// our parameters would be index (the next index we are interested to consider) and the subset (a valid subset of the array we have)
// since our "processing" is not just done on leaf nodes -> that's also a reason why the end base condition seems to be missing. We need to "process/work" on all the nodes we visit i.e. calculate the XOR values of all possible subsets (all nodes of the recursive tree)

//Time Complexity O(n * 2^n) => n is the size of nums
//Space O(n)
function subsetXORSum(nums: number[]): number {
  let total: number = 0;
  const backtracking = (index: number, subset: number[]) => {
    let xor: number = 0; //for calculating the current (of a particular subset) xor result
    for (let num of subset) {
      xor = xor ^ num;
    }
    total += xor; //accumulating the sums of all xors of all subsets

    for (let j = index; j < nums.length; j++) {
      subset.push(nums[j]); //adding the current choice to the subset
      backtracking(j + 1, subset); //we move on to consider next subset after making our choice
      subset.pop(); //we remove the current choice from the subset and move on to next ones
    }
  };
  backtracking(0, []);
  return total;
}

//recursive approach
// Provides better time complexity as the XOR is calculated recursively and not within each call
// this recursive approach considers a sort of decision tree, splitting at every index in terms of including it or excluding it => which means we need two recursive calls: one which includes a certain index, while the second one excludes it
// we pass the XOR total in the call itself along with tracking the index of an array
function subsetXORSum(nums: number[]): number {
  const dfsXOR = (ind: number, total: number): number => {
    if (ind === nums.length) {
      return total;
    }

    //we choose a certain index and we exclude a certain index, and sum their results as we want to consider the sum of all subsets including and excluding all possible subsets
    return dfsXOR(ind + 1, total ^ nums[ind]) + dfsXOR(ind + 1, total);
  };
  return dfsXOR(0, 0);
}
```

### 37. Kth Largest Element in a Stream

Design a class to find the kth largest integer in a stream of values, including duplicates. E.g. the 2nd largest from [1, 2, 3, 3] is 3. The stream is not necessarily sorted.

Implement the following methods:

constructor(int k, int[] nums) Initializes the object given an integer k and the stream of integers nums.
int add(int val) Adds the integer val to the stream and returns the kth largest integer in the stream.

```typescript
// the most important concept in this question is that we have a stream i.e. nums, and a corresponding minHeap, where we don't remove any items from nums or minHEap. Rather they are only added.
class KthLargest {
  private minHeapObj: MinHeap<number>;
  private kSize: number;
  /**
   * @param {number} k
   * @param {number[]} nums
   */
  constructor(k: number, nums: number[]) {
    this.minHeapObj = new MinHeap<number>((a: number, b: number) => a - b);
    this.kSize = k;

    for (const num of nums) {
      this.minHeapObj.push(num);
    }
    while (this.minHeapObj.size() > k) {
      this.minHeapObj.pop();
    }
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val: number): number {
    //size of stream will always be >= k, once val gets added to the stream. Not before it
    this.minHeapObj.push(val);
    while (this.minHeapObj.size() > this.kSize) {
      this.minHeapObj.pop();
    }
    return this.minHeapObj.peek()!;
  }
}

//generic Min Heap implementation
class MinHeap<T> {
  private heap: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  public push(val: T): void {
    this.heap.push(val);
    this.shiftUp(this.size() - 1);
  }

  public pop(): T | null {
    if (this.isEmpty()) return null;

    let minElement: T = this.heap[0]; //storing min element

    if (this.size() === 1) {
      this.heap.pop();
      return minElement;
    }

    //if there are more elements in heap, then we have to adjust
    //storing last element at starting index
    this.heap[0] = this.heap[this.size() - 1];
    //removing last index
    this.heap.pop();
    //shifting first element down
    this.shiftDown(0);

    return minElement;
  }

  public peek(): T | null {
    return this.heap.length ? this.heap[0] : null;
  }

  public size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // -----------------------
  // Helper methods
  // -----------------------

  // arguments are array indexes
  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private left(i: number): number {
    return 2 * i + 1;
  }

  private right(i: number): number {
    return 2 * i + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private shiftUp(i: number): void {
    let newAddition: T = this.heap[i]; //save the newly added item

    //we shift up until we reach index >= 0 (root) AND new item is smaller than its parent
    while (i > 0 && this.compare(newAddition, this.heap[this.parent(i)]) < 0) {
      this.heap[i] = this.heap[this.parent(i)];
      i = this.parent(i);
    }
    this.heap[i] = newAddition;
  }

  private shiftDown(i: number): void {
    const heapSize: number = this.size();
    //check if left child exists
    while (this.left(i) < heapSize) {
      let smaller = this.left(i);

      //check if value at right child is smaller than left child
      if (
        this.right(i) < heapSize &&
        this.compare(this.heap[this.right(i)], this.heap[smaller]) < 0
      ) {
        smaller = this.right(i);
      }

      //if value at parent is <= than the smaller child
      if (this.compare(this.heap[i], this.heap[smaller]) <= 0) {
        break;
      }
      this.swap(i, smaller);
      i = smaller;
    }
  }
}
```

## Graphs

### 42. Island Perimeter

You are given a row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1.

Return the perimeter of the island.

```typescript []
//naive/simple approach, but also the most efficient
//observation: we visit each value/part of the grid and then check if
//firstly, if it's 1
//then we check, if neighbouring grids: 1 or not.
//if neighbouring grid (NG) is 1, then perimeter is 4, if NG is 2, then perimeter 3, if NG is 3, perimeter is 1, if NG is 4, then perimeter is 0.
//Time O(rc) => O(rc)
function islandPerimeter(grid: number[][]): number {
  let rows: number = grid.length;
  let cols: number = grid[0].length;
  let totalP: number = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        let perimeter = 4;
        if (r - 1 >= 0 && grid[r - 1][c] === 1) {
          //up
          perimeter--;
        }
        if (c - 1 >= 0 && grid[r][c - 1] === 1) {
          //left
          perimeter--;
        }
        if (r + 1 < rows && grid[r + 1][c] === 1) {
          //down
          perimeter--;
        }
        if (c + 1 < cols && grid[r][c + 1] === 1) {
          //right
          perimeter--;
        }
        totalP += perimeter;
      }
    }
  }
  return totalP;
}

//recursive => dfs approach
//Time O(r,c)
//Space O(r,c)
function islandPerimeter(grid: number[][]): number {
  const key = (r: number, c: number) => `${r},${c}`;
  const visited = new Set<string>();
  const dfs = (r, c): number => {
    if (
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length ||
      grid[r][c] === 0
    ) {
      return 1;
    }
    if (!visited.has(key(r, c))) {
      visited.add(key(r, c));
      let up = dfs(r - 1, c);
      let down = dfs(r + 1, c);
      let left = dfs(r, c - 1);
      let right = dfs(r, c + 1);
      return up + down + left + right;
    }
    return 0;
  };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        return dfs(i, j);
      }
    }
  }
}
```

## Dynamic Programming

### Climbing Stairs

You are given an integer n representing the number of steps to reach the top of a staircase. You can climb with either 1 or 2 steps at a time.

Return the number of distinct ways to climb to the top of the staircase.

```typescript []
//this solution is efficient and hence doesn't work at leetcode
// can also be transformed into memoized, but computing result becomes redundant
function climbStairs(n: number): number {
  let result: number = 0;

  const re = (steps: number) => {
    if (steps < 0) {
      return;
    } else if (steps === 0) {
      result++;
      return;
    }
    re(steps - 1);
    re(steps - 2);
  };
  re(n);
  return result;
}

//rewriting the brute force solution which can then be memoized
//solution written in a way such that as we progress through the recursive tree, we get
function climbStairs(n: number): number {
  const bruteForce = (i: number): number => {
    if (i > n) return 0; //if we end up here then it's going to be an invalid path
    if (i === n) return 1; //if we land here, then we figured one possible pathway
    return bruteForce(i + 1) + bruteFroce(i + 2);
  };
  return bruteForce(0);
}

//Time O(n) => we are utilizing subproblems nows
//Space O(n) => For the memoization array

function climbStairs(n: number): number {
  const dp: number[] = new Int32Array(n).fill(-1);
  const memoized = (i: number): number => {
    if (i > n) return 0; //if we end up here then it's going to be an invalid path
    if (i === n) return 1; //if we land here, then we figured one possible pathway
    if (dp[i] !== -1) return dp[i];
    dp[i] = memoized(i + 1) + memoized(i + 2);
    return dp[i];
  };
  return memoized(0);
}

//tabulation method
function climbStairs(n: number): number {
  let one = 1,
    two = 1;
  for (let i = 0; i < n - 1; i++) {
    let temp = one;
    one = one + two;
    two = temp;
  }
  return one;
}
```

### Min Cost Climbing Stairs

You are given an array of integers cost where cost[i] is the cost of taking a step from the ith floor of a staircase. After paying the cost, you can step to either the (i + 1)th floor or the (i + 2)th floor.

You may choose to start at the index 0 or the index 1 floor.

Return the minimum cost to reach the top of the staircase, i.e. just past the last index in cost.

```typescript []
//problem is much like basic climb stairs. We can either take 1 step at a time or 2 steps at a time
//differences:
//(1) there is a cost associated with taking each step that we have to pay. Our goal is to make that as minimum as possible
//(2) we also have two options as the beginning point: 0th index or 1st index
//(3) we have to reach nth index where n is size of the array

function minCostClimbingStairs(cost: number[]): number {
  const dp = new Int32Array(cost.length).fill(-1);
  const memoization = (step: number): number => {
    if (step >= cost.length) {
      return 0;
    }
    if (dp[step] !== -1) return dp[step];

    dp[step] =
      cost[step] + Math.min(memoization(step + 1), memoization(step + 2));
    return dp[step];
  };
  return Math.min(memoization(0), memoization(1));
}

function minCostClimbingStairs(cost: number[]): number {
  cost.push(0);
  //we store at index the min cost to reach the end. We append an extra 0 at the end since
  //it's cost would 0.
  //at the end of this computation, each index in cost array would store the min Cost from that index till the end.
  //Hence for the final result, we check out 0th or 1st index whichever has minimum value
  for (let i = cost.length - 3; i >= 0; i--) {
    cost[i] = cost[i] + Math.min(cost[i + 1], cost[i + 2]);
  }
}
```

### Last Stone Weight

You are given an array of integers stones where stones[i] represents the weight of the ith stone.

We want to run a simulation on the stones as follows:

At each step we choose the two heaviest stones, with weight x and y and smash them togethers
If x == y, both stones are destroyed
If x < y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
Continue the simulation until there is no more than one stone remaining.

Return the weight of the last remaining stone or return 0 if none remain.

```typescript []
//we have to design max heap
class PriorityQueue<T> {
  private heap: T[] = [];

  constructor(private comparator: (a: T, b: T) => number) {}

  // public methods
  public push(x: T): void {
    //add element to the end of the heap array
    this.heap.push(x);
    //then move it up such that if's value is < parent
    this.shiftUp(this.size() - 1);
  }
  public pop(): T | null {
    if (this.isEmpty()) return null;

    if (this.size() === 1) {
      return this.heap.pop()!;
    }

    let min: T = this.peek()!; //saved min
    this.heap[0] = this.heap.pop()!; // removed the last explicity
    this.shiftDown(0);

    //you will always pop from the root of the heap.
    //then you bring the last element in the heap array to the top
    //then push it down such that it's value is < than both of it's children

    return min;
  }
  public peek(): T | null {
    //return the min from the root
    return this.isEmpty() ? null : this.heap[0];
  }

  public size(): number {
    //return the size of the heap
    return this.heap.length;
  }

  public isEmpty(): boolean {
    //return true if emepty
    return this.heap.length === 0;
  }

  // helper methods
  private leftChild(index: number): number {
    return 2 * index + 1;
  }
  private rightChild(index: number): number {
    return 2 * index + 2;
  }
  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  private shiftUp(index: number): void {
    let temp = this.heap[index];
    while (
      index > 0 &&
      this.comparator(temp, this.heap[this.parent(index)]) < 0
    ) {
      this.heap[index] = this.heap[this.parent(index)];
      index = this.parent(index);
    }
    this.heap[index] = temp;
  }

  private shiftDown(index: number): void {
    // [5,2,3,4]

    while (this.leftChild(index) < this.size()) {
      let smallestChild: number = this.leftChild(index);
      if (
        smallestChild + 1 < this.size() &&
        this.comparator(
          this.heap[this.rightChild(index)],
          this.heap[this.leftChild(index)],
        ) < 0
      ) {
        smallestChild = smallestChild + 1;
      }
      if (this.comparator(this.heap[index], this.heap[smallestChild]) <= 0) {
        break;
      }

      this.swap(index, smallestChild);
      index = smallestChild;
    }
  }
}

function lastStoneWeight(stones: number[]): number {
  //O(n) Space
  //O(nlogn) Time
  if (stones.length === 1) {
    return stones[0];
  }

  const maxPQ = new PriorityQueue<number>((a, b) => b - a);

  //made maxPQ
  for (let stone of stones) {
    maxPQ.push(stone);
  }

  //We keep looping until
  while (maxPQ.size() > 1) {
    let first: number = maxPQ.pop();
    let second: number = maxPQ.pop();

    if (first === second) {
      continue;
    } else if (first > second) {
      maxPQ.push(first - second);
    } else {
      maxPQ.push(second - first);
    }
  }
  return maxPQ.size() > 0 ? maxPQ.peek() : 0;
}
```

# Medium

## Arrays & Hashing

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

## Two Pointers

### Two Integer Sum II

Given an array of integers numbers that is sorted in non-decreasing order.

Return the indices (1-indexed) of two numbers, [index1, index2], such that they add up to a given target number target and index1 < index2. Note that index1 and index2 cannot be equal, therefore you may not use the same element twice.

There will always be exactly one valid solution.

Your solution must use O(1) additional space.

```typescript []
function twoSum(numbers: number[], target: number): number[] {
  let l: number = 0;
  let r: number = numbers.length - 1;
  while (l < r) {
    let sum = numbers[l] + numbers[r];
    if (sum === target) {
      return [l, r];
    } else if (sum > target) {
      r--;
    } else {
      l++;
    }
  }
  return [];
}
```

## Trees

### 38. Lowest Common Ancestor in Binary Search Tree

Given a binary search tree (BST) where all node values are unique, and two nodes from the tree p and q, return the lowest common ancestor (LCA) of the two nodes.

The lowest common ancestor between two nodes p and q is the lowest node in a tree T such that both p and q as descendants. The ancestor is allowed to be a descendant of itself.

```typescript []
// Recursive approach
//Time Complexity O(logn) or O(h)=> where n is the no. of nodes. H because it's BST
// we are using top-down apprach in traversing since we can already decide the outcome/result through parent nodes as we go down
// Decision making is quite simplistic:
// if p and q lie on either side of the root or if root's val matches either p or q => then we know already that root is LCA.
// otherwise, we recursively call either sides of the tree
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (root === null) return null;

  if (p.val > root.val && q.val > root.val) {
    return this.lowestCommonAncestor(root.right, p, q);
  } else if (q.val < root.val && p.val < root.val) {
    return this.lowestCommonAncestor(root.left, p, q);
  } else {
    return root;
  }
}

//iterative
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  let current: TreeNode | null = root;
  while (current !== null) {
    if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else if (q.val < current.val && p.val < current.val) {
      current = current.left;
    } else {
      break;
    }
  }
  return current;
}
```

### 39. Insert into a Binary Search Tree

You are given the root node of a binary search tree (BST) and a value val to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Note: There may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

```typescript []
//first try
function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
  //if root === null
  // if right child exists and val > root => root = root.right
  // else
  // if left child exists and val < root => root = root.left
  if (root === null) {
    return new TreeNode(val, null, null);
  }
  const dfs = (node: TreeNode | null) => {
    if (val > node.val) {
      if (node.right === null) {
        node.right = new TreeNode(val, null, null);
        return;
      }
      dfs(node.right);
    } else {
      if (node.left === null) {
        node.left = new TreeNode(val, null, null);
        return;
      }
      dfs(node.left);
    }
  };
  dfs(root);
  return root;
}

//given solution
function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
  if (root === null) {
    return new TreeNode(val, null, null);
  }
  if (val > root.val) {
    root.right = this.insertIntoBST(root.right, val);
  } else {
    root.left = this.insertIntoBST(root.left, val);
  }
  return root;
}
```

## LinkedList

### 40. Reorder Linked List

You are given the head of a singly linked-list.

The positions of a linked list of length = 7 for example, can intially be represented as:

[0, 1, 2, 3, 4, 5, 6]

Reorder the nodes of the linked list to be in the following order:

[0, 6, 1, 5, 2, 4, 3]

Notice that in the general case for a list of length = n the nodes are reordered to be in the following order:

[0, n-1, 1, n-2, 2, n-3, ...]

You may not modify the values in the list's nodes, but instead you must reorder the nodes themselves.

```typescript []
// recursive solution
// During the returning phase, we patch the last node to front node and so on.
// Time O(n)
// Space O(n) => system recursion stack

function reorderList(head: ListNode | null): void {
  const recursive = (
    root: ListNode | null,
    current: ListNode | null,
  ): ListNode | null => {
    if (current === null) {
      return root;
    }

    root = recursive(root, current.next);
    //in this phase the root points to the first node and current points to the last node

    if (root === null) {
      return null;
    }
    let temp = null; //to store temp node
    if (root === current || root.next === current) {
      current.next = null;
    } else {
      temp = root.next;
      root.next = current;
      current.next = temp;
    }
    return temp;
  };

  recursive(head, head.next);
}

//efficient solution
//involves three phases: find the middle of the list, reverse the second part of the list, and lastly, patch the two lists in correct order
// Time O(n)
// Space O(1)
function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;

  //First: find the middle
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  //slow points to the middle node i.e. which will be last in the final list
  //slow.next is the start of second list

  //Second: reverse the second part
  let listTwo: ListNode | null = slow.next;
  slow.next = null; // separated List1
  let prev: ListNode | null = null;
  while (listTwo !== null) {
    let temp = listTwo.next;
    listTwo.next = prev;
    prev = listTwo;
    listTwo = temp;
  }
  listTwo = prev; //prev points to head of list 2 and then we assign that to listTwo

  //Third: patch together correctly
  //temp variable to point at List one's start
  let listOne = head;
  while (listTwo !== null) {
    let temp1 = listOne.next;
    let temp2 = listTwo.next;
    listOne.next = listTwo;
    listTwo.next = temp1;
    listOne = temp1;
    listTwo = temp2;
  }
}
```

## Backtracking

### 41. Subsets

Given an array nums of unique integers, return all possible subsets of nums.

The solution set must not contain duplicate subsets. You may return the solution in any order.

```typescript []
//general backtracking approach
//Important pointers: duplicates like [1,2] and [2,1] are not possible. Choose one
//order of selection does not matter
//Time n * O(2^n) because n time taken to copy subset array into solution set and then 2^n leaves/subsets that we anyway have to visit
//Space O(n) for the stack as stack size is max n (length of array)
//Space O(2^n) for the output array
function subsets(nums: number[]): number[][] {
  const solution: number[][] = [];
  const backtracking = (index: number, subset: number[]) => {
    solution.push([...subset]);
    for (let i = index; i < nums.length; i++) {
      subset.push(nums[i]);
      backtracking(i + 1, subset);
      subset.pop();
    }
  };
  backtracking(0, []);
  return solution;
}

//recursive appraoch => decision tree
function subsets(nums: number[]): number[][] {
  const solution: number[][] = [];
  const re = (index: number, subset: number[]) => {
    if (index >= nums.length) {
      solution.push([...subset]);
      return;
    }

    subset.push(nums[index]);
    re(index + 1, subset);
    subset.pop();
    re(index + 1, subset);
  };
  re(0, []);
  return solution;
}
```

### Combination Sum

You are given an array of distinct integers nums and a target integer target. Your task is to return a list of all unique combinations of nums where the chosen numbers sum to target.

The same number may be chosen from nums an unlimited number of times. Two combinations are the same if the frequency of each of the chosen numbers is the same, otherwise they are different.

You may return the combinations in any order and the order of the numbers in each combination can be in any order.

```typescript []
//recursive approach => decision tree
function combinationSum(nums: number[], target: number): number[][] {
  const solution: number[][] = [];
  const backtracking = (index: number, subset: number[], remaining: number) => {
    //base condition has to do with remaining to be zero
    // if less than zero than we don't add to solution
    if (remaining === 0) {
      solution.push([...subset]);
      return;
    }
    if (remaining < 0 || index >= nums.length) return;

    subset.push(nums[index]);
    backtracking(index, subset, remaining - nums[index]);
    subset.pop();
    backtracking(index + 1, subset, remaining);
  };
  backtracking(0, [], target);
  return solution;
}
```

### Combination Sum II

You are given an array of integers candidates, which may contain duplicates, and a target integer target. Your task is to return a list of all unique combinations of candidates where the chosen numbers sum to target.

Each element from candidates may be chosen at most once within a combination. The solution set must not contain duplicate combinations.

You may return the combinations in any order and the order of the numbers in each combination can be in any order.

```typescript []
function combinationSum2(candidates: number[], target: number): number[][] {
  const solution: number[][] = [];
  candidates.sort((a, b) => a - b);

  const backtracking = (index: number, subset: number[], remaining: number) => {
    //process the state: index in the array, current subset we have made, remaning chunk out of the target
    if (remaining === 0) {
      solution.push([...subset]);
      return;
    }

    if (remaining < 0 || index >= candidates.length) return;
    //choices: all the candidates present in the array

    //make a choice
    subset.push(candidates[index]);
    //explore
    backtracking(index + 1, subset, remaining - candidates[index]);
    //undo the choice
    subset.pop();

    //skip duplicate elements
    while (
      index + 1 < candidates.length &&
      candidates[index + 1] === candidates[index]
    ) {
      index++;
    }
    backtracking(index + 1, subset, remaining);
  };
  backtracking(0, [], target);
  return solution;
}
```

### Combinations

You are given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.

```typescript []
//recursive solution => with manual push and pop

//Time Complexity O(k * mathematical formula of calculating combination nCk)
function combine(n: number, k: number): number[][] {
  const solution: number[][] = [];
  const backtracking = (i: number, comb: number[]) => {
    //we only choose combination of size k
    if (comb.length === k) {
      solution.push([...comb]);
      return;
    }
    //if we go beyond n then it's wrong. We can only include till n
    if (i > n) {
      return;
    }
    comb.push(i);
    backtracking(i + 1, comb);
    comb.pop();
    backtracking(i + 1, comb);
  };
  backtracking(1, []);
  return solution;
}

//standard backtracking solution
function combine(n: number, k: number): number[][] {
  const solution: number[][] = [];
  const backtracking = (i: number, comb: number[]) => {
    //we only choose combination of size k
    if (comb.length === k) {
      solution.push([...comb]);
      return;
    }
    for (let j = i; j <= n; j++) {
      comb.push(j);
      backtracking(j + 1, comb);
      comb.pop();
    }
  };
  backtracking(1, []);
  return solution;
}
```

### Permutations

Given an array nums of unique integers, return all the possible permutations. You may return the answer in any order.

```typescript
//Time complexity O(n^n) => O(n!)
//Space complexity O(n) => auxiliary array
function permute(nums: number[]): number[][] {
  let result: number[][] = [];
  const flag = new Array(nums.length).fill(false);

  const backtracking = (perm: number[]) => {
    if (perm.length === nums.length) {
      result.push([...perm]);
      return;
    }

    for (let ind = 0; ind < nums.length; ind++) {
      if (flag[ind] !== true) {
        perm.push(nums[ind]);
        flag[ind] = true;
        backtracking(perm);
        perm.pop();
        flag[ind] = false;
      }
    }
  };
  backtracking([]);
  return result;
}
```

## Stack

### Min Stack

Design a stack class that supports the push, pop, top, and getMin operations.

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
Each function should run in O(1) time.

```typescript []
class MinStack {
  constructor(
    private stack: number[] = [],
    private minValStack: number[] = [],
  ) {}

  /**
   * @param {number} val
   * @return {void}
   */
  push(val: number): void {
    this.stack.push(val);
    if (this.minValStack.length === 0) {
      this.minValStack.push(val);
    } else {
      if (val < this.minValStack[this.minValStack.length - 1]) {
        this.minValStack.push(val);
      } else {
        this.minValStack.push(this.minValStack[this.minValStack.length - 1]);
      }
    }
  }

  /**
   * @return {void}
   */
  pop(): void {
    this.minValStack.pop();
    this.stack.pop();
  }

  /**
   * @return {number}
   */
  top(): number {
    return this.stack[this.stack.length - 1];
  }

  /**
   * @return {number}
   */
  getMin(): number {
    return this.minValStack[this.minValStack.length - 1];
  }
}
```

# Hard
