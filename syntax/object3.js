//객체에 함수를 담음으로서 좋은점 !
 var v1='v1';
 // 100000 개의 코드 가 많아지면
 v1='egoing';// 중간에 다른 값이 된다.
 var v2='v2';

 var o={// 폴더와 같은 기능을 하는 객체
   v1:'v1',
   v2:'v2',
   f1:function()
   {
     console.log(this.v1);
   },
   f2:function()
   {
     console.log(this.v2);
   }
 }

o.f1();
o.f2();
