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
