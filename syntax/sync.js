var fs=require('fs');

console.log('readFileSync');
//readFileSync
console.log('A');
var result= fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');


console.log('readFile');
//readFile - 비동기식
console.log('A');
//readFile 은 리턴 값이 없다.
fs.readFile('syntax/sample.txt','utf8', function(err,result)
{
  console.log(result);

});

console.log('C');
