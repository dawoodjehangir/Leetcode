//Contains Duplicate
//Always use Set when checking/working with duplicates
function hasDuplicateSet(nums: number[]): boolean {
  const dupeChecker = new Set<number>(nums);
  return nums.length !== dupeChecker.size;
}

function hasDuplicate(nums: number[]): boolean {
  const dupeChecker = new Set<number>();
  for (let num of nums) {
    if (dupeChecker.has(num)) {
      return true;
    } else {
      dupeChecker.add(num);
    }
  }
  return false;
}

//Valid Anagram
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}
