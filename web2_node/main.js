var http = require('http');
var fs = require('fs');
var url = require('url');
//CRUD
//Create
//Read
//Update
//Delete
// File 을 생성 수정 삭제 등
function templateHTML(_title, _list, body) {
  var template = `
  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${_title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${_list}
  ${body}
  </body>
  </html>`;
  return template;
}


var app = http.createServer(function(request, response) {
  var _url = request.url;

  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var template = '';

  //console.log(url.parse(_url, true));
  if (pathname === '/') {
    var list = '';
    var title = 'Welcome';
    var description = 'Hello, Node.js';

    fs.readdir('./data/', function(err, filelist) {
      list = '<ul>';
      var i = 0;
      while (i < filelist.length) {
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++;
      }
      list += '</ul>';


      if (queryData.id === undefined) {
        title = 'Welcome';
        description = 'Hello, Node.js';
        template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
        response.writeHead(200);
        response.end(template);
      } else {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, filedescription) {
          title = queryData.id;
          description = filedescription;
          template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(template);
        });
      } //end else
    })
  } //end if path name
  else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
