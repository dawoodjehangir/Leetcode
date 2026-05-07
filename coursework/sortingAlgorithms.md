```typescript []
function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let noSwaps = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let current = arr[i];
    while (j > -1 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
```
