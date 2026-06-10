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

//125. Valid Palindrome
function isAlphanumeric(char: string): boolean {
  return (
    (char >= "A" && char <= "Z") ||
    (char >= "a" && char <= "z") ||
    (char >= "0" && char <= "9")
  );
}
//but this takes O(n) space
function isPalindromeHeavy(s: string): boolean {
  //strings are immutable so creating a array and then filtering out
  //unnecessary characters
  const toFilter: string[] = s.split("");
  const finalString = toFilter.filter((char: string) => isAlphanumeric(char));
  let left: number = 0;
  let right: number = finalString.length - 1;
  while (left <= right) {
    if (finalString[left].toLowerCase() !== finalString[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

//recommended O(N) time
//recommended O(1) space
function isPalindrome(s: string): boolean {
  let left: number = 0;
  let right: number = s.length - 1;
  while (left <= right) {
    //keep moving left forward if non-alphaumeric
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    //keep moving right back if non-alphanumeric
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }
    //valid comparison of characters
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

//680. Valid Palindrome II
function isBasicPalindrome(s: string, left: number, right: number): boolean {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
// space needs improving
function validPalindrome(s: string): boolean {
  let flag: boolean = false;
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      //cater two cases
      //removing left one
      //removing right one
      return (
        isBasicPalindrome(s, left + 1, right) ||
        isBasicPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }
  return true;
}

//169. Majority Element
// Bayer-Moore algorithm - own implementation
function majorityElementSimple(nums: number[]): number {
  let majorityElement: number = nums[0];
  let majorityElementCount: number = 1;
  for (let i = 1; i < nums.length; i++) {
    if (majorityElement !== nums[i]) {
      if (majorityElementCount > 0) {
        majorityElementCount--;
      } else {
        majorityElement = nums[i];
        majorityElementCount = 1;
      }
    } else {
      majorityElementCount++;
    }
  }
  return majorityElement;
}

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

//35. Search Insert Position
// upon the end of loop of binary search in a scenario where target is not found, then the L pointer
// always ends up being at the position where the target can be inserted
function searchInsert(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left <= right) {
    let mid: number = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

//14. Longest Common Prefix
//horizontal scanning
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

//vertical scanning
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

//1768. Merge Strings Alternately
function mergeAlternately(word1: string, word2: string): string {
  //check the length of two strings
  // one pointer at each string respectively
  //loop till the smaller string finishes
  // rest loop over two strings
  const result: string[] = [];
  let i = 0;
  let j = 0;
  while (i < word1.length && j < word2.length) {
    result.push(word1[i++]);
    result.push(word2[j++]);
  }
  while (i < word1.length) {
    result.push(word1[i++]);
  }
  while (j < word2.length) {
    result.push(word2[j++]);
  }

  return result.join("");
}

function mergeAlternatelySingleP(word1: string, word2: string): string {
  //check the length of two strings
  // one pointer at each string respectively
  //loop till the smaller string finishes
  // rest loop over two strings
  const result: string[] = [];
  const len1: number = word1.length;
  const len2: number = word2.length;
  let ind: number = 0;
  while (ind < len1 || ind < len2) {
    if (ind < len1) {
      result.push(word1[ind]);
    }
    if (ind < len2) {
      result.push(word2[ind]);
    }
    ind++;
  }

  return result.join("");
}

//88. Merge Sorted Array
/**
 Do not return anything, modify nums1 in-place instead.
 */
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

//26. Remove Duplicates from Sorted Array
function removeDuplicates(nums: number[]): number {
  let r = 1;
  let l = 1;
  while (r < nums.length) {
    if (nums[r] === nums[r - 1]) {
      r++;
    } else {
      nums[l] = nums[r];
      r++;
      l++;
    }
  }
  return l;
}

//27. Remove Element
function removeElement(nums: number[], val: number): number {
  let start: number = 0;
  let end: number = nums.length;
  while (start < end) {
    if (nums[start] === val) {
      end--;
      [nums[start], nums[end]] = [nums[end], nums[start]];
    } else {
      start++;
    }
  }
  return start;
}

//94. Binary Tree Inorder Traversal
//recursive way
function inorderTraversalRecursive(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  let left: number[] = inorderTraversal(root.left);
  left.push(root.val);
  return left.concat(...inorderTraversal(root.right));
}

//iterative way
function inorderTraversal(root: TreeNode | null): number[] {
  const treeStack: TreeNode[] = [];
  let current: TreeNode | null = root;
  const result: number[] = [];
  while (current !== null || treeStack.length > 0) {
    if (current !== null) {
      treeStack.push(current);
      current = current.left;
    } else {
      current = treeStack.pop();
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
}

//144. Binary Tree Preorder Traversal
//recursive way
function preorderTraversalRecursive(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  } else {
    return [
      root.val,
      ...preorderTraversalRecursive(root.left),
      ...preorderTraversalRecursive(root.right),
    ];
  }
}

//iterative way
function preorderTraversal(root: TreeNode | null): number[] {
  const treeStack: TreeNode[] = [];
  let current: TreeNode | null = root;
  const result: number[] = [];
  while (current !== null || treeStack.length > 0) {
    if (current !== null) {
      result.push(current.val);
      treeStack.push(current);
      current = current.left;
    } else {
      current = treeStack.pop();
      current = current.right;
    }
  }
  return result;
}

//145. Binary Tree Postorder Traversal
function postorderTraversal(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  let left = postorderTraversal(root.left);
  let right = postorderTraversal(root.right);
  return [...left, ...right, root.val];
}

//iterative way
function postorderTraversal(root: TreeNode | null): number[] {
  const treeStack: [TreeNode, boolean][] = [];
  let current: TreeNode | null = root;
  const result: number[] = [];
  while (current !== null || treeStack.length > 0) {
    if (current !== null) {
      treeStack.push([current, false]);
      current = current.left;
    } else {
      const [node, flag] = treeStack.pop()!;
      if (!flag) {
        treeStack.push([node, true]);
        current = node.right;
      } else {
        result.push(node.val);
      }
    }
  }
  return result;
}

//226. Invert Binary Tree
//recursive
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}

//iterative using proper bfs - more complicated
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }
  const treeQueue: TreeNode[] = [root];
  while (treeQueue.length > 0) {
    let size = treeQueue.length;
    for (let i = 0; i < size; i++) {
      let current: TreeNode | null = treeQueue.shift();
      [current.left, current.right] = [current.right, current.left];
      if (current.left) treeQueue.push(current.left);
      if (current.right) treeQueue.push(current.right);
    }
  }
  return root;
}

//iterative using simpler bfs
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }
  const treeQueue: TreeNode[] = [root];
  while (treeQueue.length > 0) {
    let current: TreeNode | null = treeQueue.shift()!;
    [current.left, current.right] = [current.right, current.left];
    if (current.left) treeQueue.push(current.left);
    if (current.right) treeQueue.push(current.right);
  }
  return root;
}

//iterative dfs
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

//141. Linked List Cycle
function hasCycle(head: ListNode | null): boolean {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
}

//374. Guess Number Higher or Lower
function guessNumber(n: number): number {
  let low: number = 1;
  let high: number = n;
  while (low <= high) {
    let mid: number = low + Math.floor((high - low) / 2);
    const result = guess(mid);
    if (result === 0) {
      return mid;
    } else if (result === 1) {
      low = mid + 1;
    } else if (result === -1) {
      high = mid - 1;
    }
  }
  return -1;
}

//69. Sqrt(x)
function mySqrt(x: number): number {
  let low: number = 0;
  let high: number = x;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (mid * mid === x) {
      return mid;
    } else if (mid * mid < x) {
      low = mid + 1;
    } else if (mid * mid > x) {
      high = mid - 1;
    }
  }
  return high;
}

//104. Maximum Depth of Binary Tree
//recursive
function maxDepthRecursive(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

//iterative bfs
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  const treeQueue: TreeNode[] = [root];
  let depth: number = 0;
  while (treeQueue.length > 0) {
    const size: number = treeQueue.length;
    for (let i = 0; i < size; i++) {
      let current: TreeNode = treeQueue.shift();
      if (current.left !== null) treeQueue.push(current.left);
      if (current.right !== null) treeQueue.push(current.right);
    }
    depth++;
  }
  return depth;
}

//iterative dfs
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

//219. Contains Duplicate II
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  let r: number = 0; //leading pointer
  let l: number = 0; //trailing pointer
  const numsSet = new Set<number>();
  while (r < nums.length) {
    if (r - l > k) {
      numsSet.delete(nums[l]);
      l++;
    }
    if (numsSet.has(nums[r])) {
      return true;
    }
    numsSet.add(nums[r]);
    r++;
  }
  return false;
}

//121. Best Time to Buy and Sell Stock
function maxProfit(prices: number[]): number {
  if (prices.length <= 1) return 0;
  let buy: number = 0;
  let sell: number = 1;
  let maxProfit: number = 0;
  while (sell < prices.length) {
    let profit: number = prices[sell] - prices[buy];
    if (profit < 0) {
      buy = sell;
    } else {
      maxProfit = Math.max(maxProfit, profit);
    }
    sell++;
  }
  return maxProfit;
}

//682. Baseball Game
function calPoints(operations: string[]): number {
  const baseBallStack: number[] = [];
  let result: number = 0;
  let temp: number = 0;
  for (let op of operations) {
    if (op === "+") {
      temp = baseBallStack.pop()!;
      let sum = temp + baseBallStack[baseBallStack.length - 1];
      result += sum;
      baseBallStack.push(temp);
      baseBallStack.push(sum);
    } else if (op === "C") {
      temp = baseBallStack.pop()!;
      result -= temp;
    } else if (op === "D") {
      temp = baseBallStack[baseBallStack.length - 1] * 2;
      baseBallStack.push(temp);
      result += temp;
    } else {
      temp = Number(op);
      baseBallStack.push(temp);
      result += temp;
    }
  }
  return result;
}

//110. Balanced Binary Tree
//recursive
function isBalanced(root: TreeNode | null): boolean {
  const dfs = (root: TreeNode | null): [boolean, number] => {
    if (root === null) {
      return [true, 0];
    }
    let left = dfs(root.left);
    let right = dfs(root.right);
    let isParentBalanced =
      left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;
    return [isParentBalanced, 1 + Math.max(left[1], right[1])];
  };
  return dfs(root)[0];
}

//100. Same Tree
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null) {
    return q === null;
  }
  if (p !== null && q !== null && p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  } else {
    return false;
  }
}

//572. Subtree of Another Tree
// recursive
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {}

////////////////////////////////////////////////////////////////////////////
// SECOND RUN
//206. Reverse Linked List
// iterative
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  let current: ListNode | null = head;
  let prev: ListNode | null = null;
  while (current !== null) {
    let temp: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = temp;
  }
  head = prev;
  return head;
}

// recursive
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  const reverseRecursion = (
    current: ListNode | null,
    prev: ListNode | null,
  ) => {
    if (current === null) {
      head = prev;
      return;
    }
    reverseRecursion(current?.next, current);
    current.next = prev;
  };
  reverseRecursion(head, null);
  return head;
}

//21. Merge Two Sorted Lists
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const newHead: ListNode | null = new ListNode(-1, null);
  let temp = newHead;
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      temp.next = list1;
      list1 = list1.next;
    } else {
      temp.next = list2;
      list2 = list2.next;
    }
    temp = temp.next;
  }
  if (list1 !== null) {
    temp.next = list1;
  }
  if (list2 !== null) {
    temp.next = list2;
  }
  return newHead.next;
}

//141. Linked List Cycle
function hasCycle(head: ListNode | null): boolean {
  let slowP: ListNode | null = head;
  let fastP: ListNode | null = head;
  while (fastP !== null && fastP.next !== null) {
    fastP = fastP.next.next;
    slowP = slowP!.next;
    if (fastP === slowP) {
      return true;
    }
  }
  return false;
}

//125. Valid Palindrome
function isPalindrome(s: string): boolean {
  let l: number = 0;
  let r: number = s.length - 1;
  const isAlphanumeric = (s: string): boolean => {
    if (
      (s >= "a" && s <= "z") ||
      (s >= "A" && s <= "Z") ||
      (s >= "0" && s <= "9")
    )
      return true;
    return false;
  };
  while (l < r) {
    while (l < r && !isAlphanumeric(s[l])) {
      l++;
    }
    while (l < r && !isAlphanumeric(s[r])) {
      r--;
    }
    if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      return false;
    }
    l++;
    r--;
  }
  return true;
}

//94. Binary Tree Inorder Traversal
//pure recursion
function inorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return [];
  return [
    ...inorderTraversal(root.left),
    root.val,
    ...inorderTraversal(root.right),
  ];
}

//helper recursion
function inorderTraversal(root: TreeNode | null): number[] {
  let result: number[] = [];
  const inorder = (root: TreeNode | null): void => {
    if (root === null) return;
    inorder(root.left);
    result.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return result;
}

//helper recursion #2
function inorderTraversal(root: TreeNode | null): number[] {
  let result: number[] = [];
  const inorder = (root: TreeNode | null, result: number[]): void => {
    if (root === null) return;
    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);
  };
  inorder(root, result);
  return result;
}

//iterative
function inorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return [];
  const result: number[] = [];
  const myStack: TreeNode[] = [];
  let current: TreeNode | null = root;
  while (current !== null || myStack.length > 0) {
    if (current !== null) {
      myStack.push(current);
      current = current.left;
    } else {
      current = myStack.pop();
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
}

//169. Majority Element
// more verbose
function majorityElement(nums: number[]): number {
  let mElement: number = nums[0];
  let count: number = 1;
  let index: number = 1;
  while (index < nums.length) {
    if (nums[index] !== mElement) {
      if (count < 1) {
        mElement = nums[index];
        count++;
      } else {
        count--;
      }
    } else {
      count++;
    }
    index++;
  }
  return mElement;
}

//precise
function majorityElement(nums: number[]): number {
  let mElement: number;
  let count: number = 0;
  for (const num of nums) {
    if (count < 1) {
      mElement = num;
    }
    if (mElement! === num) {
      count++;
    } else {
      count--;
    }
  }
  return mElement!;
}

//344. Reverse String
function reverseString(s: string[]): void {
  let left: number = 0;
  let right: number = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}

//100. Same Tree
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  //both have to be null at the same time
  //both have to be not null at the same time => in this case the values have to match
  //top-down approach. I check parent first and then get result from left
  //and right subtree. If all are true, then we return true, otherwise false
  if (p !== null && q !== null && p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  } else if (p === null && q === null) {
    return true;
  } else {
    return false;
  }
}
