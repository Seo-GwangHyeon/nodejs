var http = require('http');
var fs = require('fs');
var url = require('url');

//CRUD
//Create
//Read
//Update
//Delete
// File 을 생성 수정 삭제 등

var app = http.createServer(function(request,response){
    var _url = request.url;

    var queryData=url.parse(_url, true).query;

    var title =queryData.id;

    if(_url == '/'){// _url의 첫 값이 /이면  index.thml 이다.
      title= 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`,'utf8', function (err, description){
      var template= `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=html">HTML</a></li>
          <li><a href="/?id=css">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}  </p>
      </body>
      </html>
      `;
          response.end(template);
    });



});
app.listen(3000);
