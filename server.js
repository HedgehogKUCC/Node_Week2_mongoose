const http = require('http');

const PORT = 3005;

const requestListener = (req, res) => {
    console.log(req.url, req.method);
    res.end();
}

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    if ( process.env.PORT || PORT ) {
        console.log('Server is running...');
    }
});
