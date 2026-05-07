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

# Medium

# Hard
