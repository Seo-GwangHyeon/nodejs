/*
function a(){
  console.log('A');

}
a();
*/
//익명 함수
//함수가 값이다.
var a=function(){
  console.log('A');

}

a();
console.log('slowfunc');
//slowfunc라는 오래걸리는 함수 실행 완료 이후
//callback이라는 함수를 실행하여 slowfunc가 완료 됐을을
function slowfunc(callback)
{
  console.log('B');
  callback();
}

slowfunc(a);
