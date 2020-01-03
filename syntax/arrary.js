var arr= ['a','b','c','d','e'];
console.log(arr[1]);
console.log(arr[3]);

arr[2]=3;

console.log(arr);
console.log(arr.length);
arr.push('BBBB'); // 배열 맨마지막에 추가
console.log(arr);
arr.pop(); // 배열 맨마지막에 제거
console.log(arr);
arr.shift(); // 배열 맨 앞 제거
console.log(arr);
arr.unshift("New one"); // 배열 맨 앞 추가
console.log(arr);
