//21. Merge Two Sorted Lists

class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null,
  ) {}
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null) {
  const dummyHead: ListNode = new ListNode(0, null);
  let tempNode: ListNode = dummyHead;
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      tempNode.next = list1;
      list1 = list1.next;
    } else {
      tempNode.next = list2;
      list2 = list2.next;
    }
    tempNode = tempNode.next;
  }
  while (list1 !== null) {
    tempNode.next = list1;
    list1 = list1.next;
    tempNode = tempNode.next;
  }
  while (list2 !== null) {
    tempNode.next = list2;
    list2 = list2.next;
    tempNode = tempNode.next;
  }
  return dummyHead.next;
}

//20. Valid Parentheses
function isValid(s: string): boolean {
  const stackArr: string[] = [];
  const sMap = new Map<string, string>([
    ["]", "["],
    ["}", "{"],
    [")", "("],
  ]);
  for (let char of s) {
    if (!sMap.has(char)) {
      stackArr.push(char);
    } else {
      if (sMap.get(char) !== stackArr[stackArr.length - 1]) {
        return false;
      } else {
        stackArr.pop();
      }
    }
  }
  return stackArr.length === 0 ? true : false;
}

//brute forcce
function isValidBrute(s: string): boolean {
  while (s.includes("()") || s.includes("{}") || s.includes("[]")) {
    s = s.replace("[]", "");
    s = s.replace("()", "");
    s = s.replace("{}", "");
  }
  return s.length === 0;
}

//1. Two Sum
function twoSum(nums: number[], target: number): number[] {
  const hMap = new Map<number, number>();
  for (let ind = 0; ind < nums.length; ind++) {
    let targetComplement: number = target - nums[ind];
    if (hMap.has(targetComplement)) {
      return [hMap.get(targetComplement)!, ind];
    } else {
      hMap.set(nums[ind], ind);
    }
  }
  return [];
}

//206. Reverse Linked List
function reverseList(head: ListNode | null): ListNode | null {
  let current: ListNode | null = head;
  let previous: ListNode | null = null;

  while (current !== null) {
    let tempStore: ListNode | null = current.next;
    current.next = previous;
    previous = current;
    current = tempStore;
  }
  return previous; //new head
}

//344. Reverse String
function reverseString(s: string[]): void {
  let start: number = 0;
  let end: number = s.length - 1;
  // even case: s and e crossover
  // odd case: s and e meet in the middle
  while (start < end) {
    let tempStore = s[start];
    s[start++] = s[end];
    s[end--] = tempStore;
  }
}

//704. Binary Search
// recursive
function bsr(
  l: number,
  r: number,
  nums: number[],
  target: number,
): number | null {
  if (l > r) {
    return null;
  }
  let mid: number = l + Math.floor((r - l) / 2);
  if (nums[mid] === target) {
    return mid;
  } else if (nums[mid] > target) {
    return bsr(l, mid - 1, nums, target);
  } else {
    return bsr(mid + 1, r, nums, target);
  }
}

// iterative
function searchIterative(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left <= right) {
    const mid: number = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

function searchRecursive(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  const bs = (
    nums: number[],
    target: number,
    left: number,
    right: number,
  ): number => {
    if (left > right) {
      return -1;
    }
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      return bs(nums, target, left, mid - 1);
    } else {
      return bs(nums, target, mid + 1, right);
    }
  };
  return bs(nums, target, left, right);
}

//49. Group Anagrams
function groupAnagrams(strs: string[]): string[][] {
  const groupAnagrams = new Map<string, string[]>();

  const baseCode: number = "a".charCodeAt(0);

  for (const str of strs) {
    let key: number[] = new Array(26).fill(0);

    for (let char of str) {
      key[char.charCodeAt(0) - baseCode] += 1;
    }
    const keyStr = key.join(",");
    if (groupAnagrams.has(keyStr)) {
      let gAnagramArr = groupAnagrams.get(keyStr)!;
      gAnagramArr.push(str);
    } else {
      groupAnagrams.set(keyStr, [str]);
    }
  }
  return [...groupAnagrams.values()];
}
