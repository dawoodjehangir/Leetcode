// frequency counter pattern
// two pointers
// sliding window
// interval coding pattern
// fast slow pointers
// divide and conquer
// recursion
// binary search
// sorting

2. Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

```typescript []
function hasDuplicate(nums: number[]): boolean {
  let dupChecker: Record<number, number> = {};
  for (let num of nums) {
    if (!dupChecker[num]) {
      dupChecker[num] = 1;
    } else {
      return true;
    }
  }
  return false;
}

//Using a Set is generally preferred in TypeScript because it handles type inference automatically and is specifically designed for unique collections.

//AI solution 1
function hasDuplicate(nums: number[]): boolean {
  // TypeScript knows 'seen' will only contain numbers
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}

//AI one liner
function hasDuplicate(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}
```

3.  Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

```typescript []
// time O(s+t)
// space O(s+t)

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const objS: Record<string, number> = {};
  const objT: Record<string, number> = {};
  for (let char of s) {
    objS[char] = (objS[char] ?? 0) + 1;
  }
  for (let char of t) {
    objT[char] = (objT[char] ?? 0) + 1;
  }

  for (let char of s) {
    if (
      !(
        objS.hasOwnProperty(char) &&
        objT.hasOwnProperty(char) &&
        objS[char] === objT[char]
      )
    ) {
      return false;
    }
  }
  return true;
}

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts: Record<string, number> = {};

  for (let i = 0; i < s.length; i++) {
    counts[s[i]] = (counts[s[i]] ?? 0) + 1;
    counts[t[i]] = (counts[t[i]] ?? 0) - 1;
  }

  // Every key must be 0 for it to be a perfect match
  for (let char in counts) {
    if (counts[char] !== 0) return false;
  }

  return true;
}

//time (O(slogs + tlogt))

// sort doesnot exist for string prototype

// This one is trickier because it depends on the language's implementation of .sort().Auxiliary Space: $O(n)$The "JS/TS" Reality: In your previous code, we called .split(''). This creates a brand-new array of characters of length $n$. Therefore, you are using $O(n)$ extra space immediately.The Algorithm itself: Most modern engines (like V8) use Timsort, which has an internal space complexity of $O(n)$. Even if you used an "in-place" sort like Heapsort ($O(1)$), strings in JavaScript are immutable, meaning you cannot sort them without first copying them into a mutable structure (like an array).
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  // 1. Split into characters
  // 2. Sort alphabetically
  // 3. Join back into a string for comparison
  const sortedS = s.split("").sort().join("");
  const sortedT = t.split("").sort().join("");

  return sortedS === sortedT;
}
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  return s.split("").sort().join("") === t.split("").sort().join("");
}
```

4.  Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.

You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

Return the answer with the smaller index first.

// solution had to be seen to do this question

```typescript []
function twoSum(arr: number[], target: number): number[] {
  const hMap: Record<number, number> = {};
  let found: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    let diff = target - arr[i];
    if (hMap.hasOwnProperty(diff) && hMap[diff] !== i) {
      found = [hMap[diff], i];
      break;
    } else {
      hMap[arr[i]] = i;
    }
  }
  return found;
}
```

// Bonus
Three Sum (3Sum)
The Question:

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Constraint: Notice that the solution set must not contain duplicate triplets.

Optimal Time Complexity: O(N^2)

```typescript []
function threeSum(arr: number[], target: number): number[] {
  arr.sort((a, b) => a - b);
  const results: number[][] = [];
  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue;
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right];
      if (sum === 0) {
        results.push([arr[i], arr[left], arr[right]]);

        while (left < right && arr[left] === arr[left + 1]) {
          left++;
        }
        while (left < right && arr[right] === arr[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return results;
}
```

```

```
