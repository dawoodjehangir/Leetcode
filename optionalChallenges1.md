# Coding exercise 3

Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities:

Time: O(N)

// concrete examples

- easy cases
- complex cases
- empty input - NOT catering
- invalid input - NOT catering

```typescript []
function sameFrequency(one: string, two: string): boolean {
  if (one.length !== two.length) return false;
  const oneObj: any = {};
  const twoObj: any = {};

  for (let i = 0; i < one.length; i++) {
    oneObj[one[i]] = (oneObj[one[i]] ?? 0) + 1;
    twoObj[two[i]] = (twoObj[two[i]] ?? 0) + 1;
  }

  const oneObjkeys = Object.keys(oneObj);
  const twoObjkeys = Object.keys(twoObj);
  if (oneObjkeys.length !== twoObjkeys.length) return false;
  // already ensures that both the objects have similar keys. One of oneObj[key] or twoObj[key] would turn out to be false if that's not the case
  return oneObjkeys.every((key) => oneObj[key] === twoObj[key]);
}
```

# Coding exercise 4

Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in. You can solve this using the frequency counter pattern OR the multiple pointers pattern.

Restrictions:
Time - O(n)
Space - O(n)

Bonus:
Time - O(n log n)
Space - O(1)

## important takeaways/notes

- handling a variable number of arguments is done using Rest Parameters. This allows you to represent an indefinite number of arguments as an array.
- use the ellipsis (...) syntax before the parameter name.
- (...args: any[]) or (...args: unknown[])
- _any_ is most flexible but offers the least amount of type checking.
- _unknown_ is safer than _any_ because it forces you to perform some type checking before performing operations on the arguments.
- If you don't know the property names yet (e.g., a dictionary or a map), but you know they will all be a certain type (like strings), use Record.
- for...in loops iterate over keys (indexes), not values VS for...of
- In non-arrow functions, arguments is a built-in, "array-like" object that contains all the values passed to the function.
- most important rule of a Set is that it cannot contain duplicate values.
- new Set(arguments): This takes all the inputs and forces them into a Set. If there were duplicates in the inputs, they are removed here.

```typescript
// A Record where keys are strings and values are numbers
const scores: Record<string, number> = {};

scores["math"] = 95;
scores["science"] = 88;
```

### A Note on "Rest" vs "Spread"

It’s easy to get these confused, but they are two sides of the same coin:

Rest (in the function definition): Takes multiple individual items and "rests" them into an array.

Spread (in the function call): Takes an array and "spreads" it into individual items.

### Generics

To ensure all arguments are of the same type—while still allowing that type to be "anything"—we use Generics.

Generics allow you to create a placeholder (conventionally <T>) that captures the type of the first argument passed and then enforces that same type for all subsequent arguments.

```typescript
function uniformFunc<T>(...args: T[]): void {
  console.log(args);
}

// This will force the function to only accept numbers
uniformFunc<number>(1, 2, 3);

// This would cause a compile error because 'hello' is not a number
uniformFunc<number>(1, "hello", 3);
```

If you want the function to accept a variable number of arguments that are all the same, but they must be either a string or a number (no objects or booleans), you can constrain the generic:

```typescript
function limitedFunc<T extends string | number>(...args: T[]) {
  // args will only ever be an array of strings OR an array of numbers
}
```

```typescript []
// frequency counter pattern
function areThereDuplicates<T extends string | number>(...args: T[]): boolean {
  if (args.length < 2) return false;

  // argObj uses string | number as the key type
  let argObj: Record<string | number, number> = {};

  // Use 'for...of' to get the actual values (1, 2 or 'a', 'b')
  for (let val of args) {
    argObj[val] = (argObj[val] ?? 0) + 1;
  }

  // Iterate through the keys of our counter object
  for (let key in argObj) {
    if (argObj[key] > 1) return true;
  }

  return false;
}

//multiple pointers => come back to this later after studying sorting
function areThereDuplicates<T extends number | string>(...args: T[]): boolean {}

//one liner - using SET
function areThereDuplicates<T>(...args: T[]): boolean {
  return new Set(args).size !== args.length;
}
```

# Coding exercise 5

Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true if the message can be built with the letters that you are given, or it should return false.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

Bonus Constraints:

If M is the length of message and N is the length of letters:

Time Complexity: O(M+N)

Space Complexity: O(N)

## takeaways

- an object was created without a prototype (e.g., Object.create(null))
- if someone accidentally named a property hasOwnProperty. In those cases, user.hasOwnProperty() will crash.
- string doesn't have .every() method like arrays
- you cannot use a return statement inside a ternary operator.

```typescript []
function constructNote(letters: string, note: string): boolean {
  //check the unique letters in letters. Object1
  //check the unique letters in note. Object2
  //compare the keys of Object1 and Object2. If Object2 is a subset of Object1, then true, otherwise false
  //easy input
  // abc, abcbacbacbabbacbabcabcbac
  //complex inputs
  // similar
  //empty inputs
  // cater if letters are empty, then return false. Other way around also
  //invalid inputs - assumption laid out

  //aaa, aabc
  if (note.length === 0) return true;
  if (letters.length === 0) return false;

  //O(N) space
  const lettersKeys: Record<string, number> = {};
  //O(N) time
  for (const l of letters) {
    lettersKeys[l] = (lettersKeys[l] ?? 0) + 1;
  }
  //O(M) time
  for (const character of note) {
    if (!lettersKeys.hasOwnProperty(character) || lettersKeys[character] === 0)
      return false;
    lettersKeys[character]--;
  }
  return true;
}
```

# Coding exercise 6

Given an array of positive integers, some elements appear twice and others appear once. Find all the elements that appear twice in this array. Note that you can return the elements in any order.

//time complexity O(N)

## takeaways

- Object requires for...in or Object.keys()
- Set is directly iterable with for...of

```typescript []
function findAllDuplicates(parray: number[]): number[] {
  if (parray.length === 0) return [];
  const arrayObject: Record<string, number> = {};
  for (const num of parray) {
    arrayObject[String(num)] = (arrayObject[String(num)] ?? 0) + 1;
  }

  return Object.keys(arrayObject).filter((key) => arrayObject[key] === 2);
}
```

# Coding exercise 7

Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

## takeaways

- in a production TypeScript environment, you might encounter a Precision Issue because of how JavaScript handles floating-point numbers.

- For example, if the average is exactly 2.5, but tav is provided via a calculation that results in 2.50000000000001, tempAve === tav might return false.

```typescript []
// - sorted array. can have +ve -ve integers
// - a target average
// - returns boolean

//easy input
//[1,2,3],2.5
//complex input
//empty input
//invalid input

function averagePair(inputArray: number[], tav: number): boolean {
  //create two pointers. one pointing at start, second pointing at end.
  //create while loop that runs until start<end
  //take average of the currently pointed positions
  //if it matches target average, return true
  //Otherwise:
  //if the calculated average turns out to be smaller than tav, then move First to Right.
  //if the calculated average turns out to be higher than tav, then move Second to Left.
  //return false outside

  if (inputArray.length === 0) return false;

  let first: number = 0;
  let second: number = inputArray.length - 1;

  while (first < second) {
    let tempAve = inputArray[first] + inputArray[second];
    if (tempAve === tav * 2) return true;
    else if (tempAve < tav * 2) {
      first++;
    } else if (tempAve > tav * 2) {
      second--;
    }
  }
  return false;
}
```

# Coding exercise 8

Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

Time Complexity - O(N + M)
Space Complexity - O(1)

```typescript []
// both arguments are strings
// return boolean depending on the result

// easy input ('hello', 'hello world')
// complex input
// empty input - if either of inputs is empty, return false
// invalid input - Cant think of anything

function isSubsequence(smallseq: string, textstr: string): boolean {
  //return false if either of strings are empty
  //return false if length of second string is smaller than first
  //create two pointers, with each pointing at the start of the two different strings
  //intialize two pointers at the start of each of the strings
  //create a while loop, that runs until
  //if reached the end of first and second < length of second => return true
  //return false

  //('sing', 'stigern')
  if (smallseq.length === 0 || textstr.length === 0) return false;
  if (textstr.length < smallseq.length) return false;

  let first: number = 0; //smallseq
  let second: number = 0; //textstr

  while (second < textstr.length && first < smallseq.length) {
    if (smallseq[first] === textstr[second]) {
      first++;
    }
    second++;
  }
  return first === smallseq.length;
}
```

# Coding exercise 9

Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n. This function should return true if the pair exists or false if it does not.

notes:
// unsorted array
// number n; positive/negative?
// returns boolean;

Part 1 - solve this with the following requirements:
Time Complexity Requirement - O(n)
Space Complexity Requirement - O(n)

Part 2 - solve this with the following requirements:
Time Complexity Requirement - O(n log n)
Space Complexity Requirement - O(1)
// Later after sorting
// solution would be to sort the array with a complexity of nlogn
// use two pointers and find the pair

```typescript []
//put data from an array into an Object
function findPair(unsortedArr: number[], n: number): boolean {
  //if array is empty return false
  //put data from the array into Set => space complexity O(N)
  // trying to find a pair x,y such that x-y=n or y-x=n => y=x-n or y=x+n
  //Loop over the Set using for...of
  // if for any number x, there is exists x-n or x+n within the same Set, return true
  //return false at the end
  if (unsortedArr.length < 0) return false;
  const numSet = new Set(unsortedArr);
  //n=0 can only occur if any number is present more than once in the array
  if (n === 0) {
    return numSet.size !== unsortedArr.length;
  }
  for (const x of numSet) {
    if (numSet.has(x - n) || numSet.has(x + n)) {
      return true;
    }
  }
  return false;
}
```

# coding exercise 10

Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.

Note that a subarray must consist of consecutive elements from the original array. In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.

Constraints:
Time Complexity - O(N)
Space Complexity - O(1)

// array of integers
// number

```typescript []
//[1,4,2,10,23,3,1,0,20], 4
//i=0 till i=5
//len=9
//formula=9-4

//([-3,4,0,-2,6,-1], 2)
//till i=4
//len=6
//formular=6-2
function maxSubarraySum(intArray: number[], windowSize: number): number | null {
  //if size of array is smaller windowSize, return null
  //if window size is zero, return null
  // initialize maxSum to be -Infinity, because sum can be negative too
  // iterate over the array
  // check tempSum > maxSum, set maxSum
  //return maxSum

  if (windowSize <= 0 || intArray.length < windowSize) return null;

  let tempSum: number = 0;
  for (let i = 0; i < windowSize; i++) {
    tempSum = tempSum + intArray[i];
  }
  let maxSum: number = tempSum;
  //if start of window is considered
  // for (let i = 1; i <= intArray.length - windowSize; i++) {
  //   tempSum = tempSum + intArray[i + windowSize - 1] - intArray[i - 1];
  //   maxSum = Math.max(maxSum, tempSum);
  // }

  //if end of window is considered
  for (let i = windowSize; i < intArray.length; i++) {
    tempSum = tempSum + intArray[i] - intArray[i - windowSize];
    maxSum = Math.max(tempSum, maxSum);
  }

  return maxSum;
}
```

# Coding exercise 11

Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.

This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function. If there isn't one, return 0 instead.

## takeways

- changing/dynamic sliding window should use a single loop with start and end pointers (Two pointers) if O(N) has to be ensured

// array of positive integers - sorted/unsorted
// positive int
// return number

Time Complexity - O(n)
Space Complexity - O(1) //no object, no set, no new array

//easy inputs
//complex inputs
//empty inputs
//invalid inputs

```typescript []
//minSubArrayLen([2,3,1,2,4,3], 7)

//longer solution
function minSubArrayLen(conArray: number[], checkSum: number): number {
  //if array is empty return 0
  //initialize min array size = 1
  // might need loop for window size
  //while loop since we need to iterate over array
  if (conArray.length === 0) return 0;
  // let minArrayLen: number = 1;
  let minLen: number = Infinity;
  let start: number = 0;
  let end: number = 0;
  let tempSum: number = 0;

  while (start < conArray.length) {
    //if tempSum is smaller than checkSum, so we keep increasing the end pointer
    if (tempSum < checkSum && end < conArray.length) {
      tempSum = tempSum + conArray[end];
      end++;
    }
    //if tempSum >= checkSum, so we try squeezing in the sliding window by incrementing the start
    else if (tempSum >= checkSum) {
      minLen = Math.min(minLen, end - start);
      tempSum = tempSum - conArray[start];
      start++;
    }
    //tempSum is still less than checkSum, however, end pointer has reached the end of array
    else {
      break;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

//concise solution - use two loops, but each loop is associated with an individual pointer
//minSubArrayLen([2,3,1,2,4,3], 7)
function minSubArrayLen(conArray: number[], checkSum: number): number {
  let minLen: number = Infinity;
  let start: number = 0;
  let tempSum: number = 0;

  //keep moving end pointer till the end of the array
  for (let end = 0; end < conArray.length; end++) {
    tempSum += conArray[end];
    //only goes valid, when we have reached our tartget Sum. We then try shrinking the sliding window
    while (tempSum >= checkSum) {
      minLen = Math.min(minLen, end - start + 1);
      tempSum -= conArray[start];
      start++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```
