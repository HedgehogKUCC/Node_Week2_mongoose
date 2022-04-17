const http = require('http');
const mongoose = require('mongoose');

const PostModel = require('./models/Post.js');

const PORT = 3005;

mongoose
    .connect('mongodb://localhost:27017/week2')
    .then(() => console.log('mongodb is connected...'))
    .catch((err) => console.log(err.message));

const requestListener = async (req, res) => {
    if ( req.url === '/' && req.method === 'GET' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Home Page</h1>');
        res.end();
    } else if ( req.url === '/posts' && req.method === 'GET' ) {
        const data = await PostModel.find();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            result: true,
            data,
        }));
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
