var http = require('http');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var formidable = require('formidable');

var myEventHandler = function () {
  console.log('I hear a scream!');
};

eventEmitter.on('shaon', myEventHandler);


// Read demo.txt and log its content
var rs = fs.createReadStream('./demo.txt');
rs.on('open', function () {
  fs.readFile('./demo.txt', function (err, data) {
    if (err) throw err;
    console.log(data.toString());
  });
});


eventEmitter.emit('shaon');

// Create HTTP server
http.createServer(async function (req, res) {
  const { upperCase } = await import('upper-case');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(upperCase("Hello World!"));

  if(req.url == '/fileupload'){
    var form = formidable({});
    let fields;
    let files;
    [fields, files] = form.parse(req);
    console.log(files);
  }else{
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="imgpic">');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);

console.log('Server running at http://localhost:8080/');
