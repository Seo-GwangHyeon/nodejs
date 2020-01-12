//CRUD
//Create
//Read
//Update
//Delete
// File 을 생성 수정 삭제 등

// pm2 간단 사용법
// 시작하기 :  pm2 start app.js
// 멈추기 : pm2 stop app[별명]
// 모니터링 : pm2 monit
// 리스트를 통해서 별명 확인 : pm2 listen
// 소스코드 변경후 껐다 켜지 않아도 되는 소스
// pm2 start app.js --watch
//pm2 start web2_node/main.js --watch --ignore-watch="data/*"


var http = require('http');//http 모듈을 가져
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
//template 모듈을 불러온다.
var template = require('./lib/template.js');
var path =require('path');
var sanitizeHtml = require('sanitize-html');

console.log(sanitizeHtml);
function confirm_delete() {
  alert('delete');
}
// request : 요청할 때 웹브라우저가 보낸 정보
// response : 응답할 때 우리가 웹브라우저에 줄 정보
var app = http.createServer(function(request, response) {
  //http 모듈읜ㄴ CreateServer 메소드
  // 함수의 첫번째 parameter 로는 request를 주고
  // 함수의 두번째 parameter 사용자에게 전송할 정보 responose를 준다.
  var _url = request.url;

  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var html = '';
  console.log(pathname);
  //console.log(url.parse(_url, true));
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data/', function(err, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var html = template.html(title, list,
          `<h2>${title}</h2><p>${description}</p>`,
          `<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir('./data/', function(err, filelist) {
        // .. 을 이용해서 서버 컴퓨터의 모든 정보 및 디렉토리를 읽을 수 있음
        // 그러므로 오염된 정보가 들어오지 않도록 보안 해준다.
        // ../를 걸러준다.
        var filteredId=path.parse(queryData.id).base;

        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
          var title = queryData.id;
          var sanitizedTtile = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description,{
            allowedTags:['h1']
          });
          var list = template.list(filelist);
          var html = template.html(title, list,
            `<h2>${sanitizedTtile}</h2><p>${sanitizedDescription}</p>`,
            `<a href="/create">create</a>
             <a href="/update?id=${sanitizedTtile}">update</a>
             <form action="delete_process" method="post" onsubmit="confirm_delete">
              <input type="hidden" name="id" value="${sanitizedTtile}">
              <input type="submit" value="delete">
              </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } //end else
  } //end if path name
  else if (pathname === '/create') {
    fs.readdir('./data/', function(err, filelist) {
      var title = 'WEB - Create';
      var list = template.list(filelist);
      var html = template.html(title, list,
        `
        <form action="/create_process" method="post">
          <p>
            <input type="text" name="title" placeholder="title">
          </p>
          <p>
            <textarea name="description" placeholder="descripttion"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>

        `,
        '');
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function(data) { // 웹브라우저가  post방식으로 데이터를 처리할 때
      // 큰 데이터를 한꺼번에 처리하다가는 프로그램이 꺼지거나
      // 컴퓨터에 무리가 간다
      // -> nodejs에서는 post 방식으로 전송된 데이터가 많을 경우를 대비해서
      // 특정량의 데이터로 나누어서  서버쪽에서 수신 할때마다 콜백함수를 호출하도록 약속 되어있다.
      // 콜백함수를 호출할때 data라는 인자를 통해서 데이터 정보를 준다.
      body = body + data;
      //콜백이 실행될 때마다 body에 데이터 추가
    });
    request.on('end', function() {
      //더이상 들어올 데이터가 없으 이 콜백함수를 호출하도록 약속되어있음
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        // 에러 처리방법
        response.writeHead(200);
        // 302는 페이지를 리다이렉션 시킨다.
        response.writeHead(302, {
          Location: `/?id=${title}`
        });
        response.end();

        //글 작성 후 리다이렉션 해준다.

      });
    });
  } //end create_process
  else if (pathname === '/update') { //update를 구현하려면 2가지가 필요하다.
    //1. 폼이 필요하고
    //2. 읽어오는 기능이 필요하다.
    fs.readdir('./data/', function(err, filelist) {
      var filteredId=path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.html(title, list,
          `
          <form action="/update_process" method="post">
            <!-- 이런 식으로  id를 할 때 hidden 타입을 사용한다-->
            <input type="hidden" name="id" value="${title}" >
            <p>
              <input type="text" name="title" placeholder="title" value="${title}">
            </p>
            <p>
              <textarea name="description" placeholder="descripttion">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(html);
      });
    });

  } //else if update를
  else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function(data) { // 웹브라우저가  post방식으로 데이터를 처리할 때
      // 큰 데이터를 한꺼번에 처리하다가는 프로그램이 꺼지거나
      // 컴퓨터에 무리가 간다
      // -> nodejs에서는 post 방식으로 전송된 데이터가 많을 경우를 대비해서
      // 특정량의 데이터로 나누어서  서버쪽에서 수신 할때마다 콜백함수를 호출하도록 약속 되어있다.
      // 콜백함수를 호출할때 data라는 인자를 통해서 데이터 정보를 준다.
      body = body + data;
      //콜백이 실행될 때마다 body에 데이터 추가
    });
    request.on('end', function() {
      //더이상 들어올 데이터가 없으 이 콜백함수를 호출하도록 약속되어있음
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      var filteredId=path.parse(id).base;
      //파일이름을 먼저 Rename 한다.

      fs.rename(`data/${filteredId}`, `data/${title}`, function(error) {
        console.log(error);
        // 콜백함수의 변수와 내부 콜백의 변수가 같아서 오류 발생 했었음
        fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
          // 에러 처리방법
          // 302는 페이지를 리다이렉션 시킨다.
          response.writeHead(302, {
            Location: `/?id=${title}`
          });
          response.end();

          //글 작성 후 리다이렉션 해준다.

        });
      });
    });
  } // end else /update_process
  else if (pathname === '/delete_process') {
    var body = '';
    request.on('data',function(data) {
      body = body + data;
      //콜백이 실행될 때마다 body에 데이터 추가
    });
    request.on('end', function() {
      var post = qs.parse(body);
      //var filteredId=path.parse(id).base;
      var id = post.id;
      const path=`./data/${id}`;

      fs.unlink(path, function(err){
        if( err)
        {
          console.error(err)
          return;
        }
        response.writeHead(302, {  Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
