const http = require('http');

const PORT = 3005;

const requestListener = (req, res) => {
    if ( req.url === '/' && req.method === 'GET' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Home Page</h1>');
        res.end();
    } else if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>Not Found Page</h1>');
        res.end();
    }
}

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    if ( process.env.PORT || PORT ) {
        console.log('Server is running...');
    }
});
