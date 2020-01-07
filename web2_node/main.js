var http = require('http');
var fs = require('fs');
var url = require('url');
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

function templateHTML(_title, _list, body) {
  var template = `
  <!doctype html>
  <html>
  <head>
  <title>WEB2 - ${_title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${_list}
  <a href="/create">create</a>
  ${body}
  </body>
  </html>`;
  return template;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request, response) {
  var _url = request.url;

  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var template = '';
  console.log(pathname);
  //console.log(url.parse(_url, true));
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data/', function(err, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data/', function(err, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    } //end else
  } //end if path name
  else if (pathname === '/create') {
    fs.readdir('./data/', function(err, filelist) {
      var title = 'WEB - Create';
      var list = templateList(filelist);
      var template = templateHTML(title, list,
        `
        <form action="http://localhost:3000/process_create"
        method="post">
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

        `);
      response.writeHead(200);
      response.end(template);
    });
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
