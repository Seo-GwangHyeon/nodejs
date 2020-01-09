var members = ['egoing','k8805','hoya'];
//배열은 대괄호
console.log(members[1]); // k8805
// 객체는 중괄호 맵 과 같이
var i=0;
while(i< members.length)
{
  console.log('array:'+members[i]);
  i+=1;
}


var roles =
{
  'programmer':'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}

for(var name in roles)
{//name 에는 객체의 식별자가 들어가도록 약속되어 있다.
  console.log('object:', name, 'value :',roles[name] );
    console.log('object:', name, 'value :',roles.name );
    

}

console.log(roles.manager); //k8805
