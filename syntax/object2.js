
// 처리방법을 그룹핑하는 함수 도 데이터 이기 때문에
// 함수도 배열과 객체에 담을 수 있다.
// if statment와 while statment는 데이터가 될 수 없고 변수에도 담을 수가 없지만
// function statement는 데이터가 될 수 있고 변수에도 담을 수 있다.
var f = function()
{
  console.log(1+1);
  console.log(1+2);
}

var a =[f];
a[0](); // a[0]===f

var o={
  func:f
}

o.func();
