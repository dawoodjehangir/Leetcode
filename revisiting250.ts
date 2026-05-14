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

// Binary Search
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
