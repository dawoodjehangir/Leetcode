# First possible solution (pending)

## Intuition

- If the array is somehow sorted, I just have to pick the middle values for the average salary

## Approach

- Somehow sort the array with the best time and space complexity
- if array length is odd then: (len - 1)/2 is average
- if array length is even then: (array[floor((len-1)/2)] + array[ceil((len-1)/2)])/2

## Complexity

- Time complexity:
  <!-- $$O(N)$$ -->

- Space complexity:
  <!-- $$O(N)$$ -->

## Code

```typescript []
function average(salary: number[]): number {}
```
