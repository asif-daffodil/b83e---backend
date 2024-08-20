var http = require('http');
var url = require('url');
var mt = require('./myfirstmodule');
var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.open('mynewfile2.txt', 'w', function (err, file) {
    if (err) throw err;
    fs.write(file, 'Hello content!', function (err) {
        if (err) throw err;
        fs.close(file, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
});

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});


fs.unlink('mynewfile3.txt', function (err) {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('File does not exist!');
        } else {
            throw err;
        }
    } else {
        console.log('File deleted!');
    }
});

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
});

http.createServer(function (req, res) {
    var path = url.parse(req.url, true);
    var q = path.query;
    var filename = path.pathname == '/' ? './home.html' : "."+path.pathname+".html";
    fs.readFile(filename, function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data + "<br>The date and time are currently: " + mt + "<br>" + "My name is : " + q.name + " and my city is : " + q.city);
        return res.end();
    })
}).listen(8080);