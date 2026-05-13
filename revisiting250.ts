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
