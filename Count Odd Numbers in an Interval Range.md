# Takeaway

- write the problem on paper before coding
- try to figure out a smarter/shorter way considering time and space complexity

# Bad Solution

## Intuition

- just check if low is odd or even, then increment accordingly while counting the no. of odd integers

## Approach

- check odd/even and then implement the redundant functionality separately

## Complexity

- Time complexity:
  $$O(N)$$

- Space complexity:
  $$O(N)$$

## Code

```typescript []
function redundantCounter(count: number, low: number, high: number): number {
  let highestLimit: number = 10 ** 9;
  while (low <= high && low <= highestLimit) {
    count += 1;
    low += 2;
  }
  return count;
}
function countOdds(low: number, high: number): number {
  return low % 2 != 0
    ? redundantCounter(0, low, high)
    : redundantCounter(0, low + 1, high);
}
```

# Good Solution

## Approach

- break the problem in two ways: count of odd numbers upto and including HIGH AND count of odd numbers upto but excluding LOW
- count of odd numbers upto and including HIGH = floor ((x+1)/2)
- count of odd numbers upto but excluding LOW = floor (x/2)

## Complexity

- Time complexity:
  $$O(1)$$

- Space complexity:
  $$O(1)$$

## Code

```typescript []
function countOdds(low: number, high: number): number {
  return Math.floor((high + 1) / 2) - Math.floor(low / 2);
}
```
