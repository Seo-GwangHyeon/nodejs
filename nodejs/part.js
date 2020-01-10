//객체들을 파일로 나눠서 쪼개서 관리 할 수 있다.
var M={
  v: 'v',
  f:function (){
    console.log(this.v);
  }
}
//module이라는 약속된 객체
module.exports = M;
//==>part.js 의 M의 객체를 모듈 바깥에서 사용할 수 있도록 export한다.
