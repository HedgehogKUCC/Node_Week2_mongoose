const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { success, error } = require('./responseHandle.js');

const PostModel = require('./models/Post.js');

const PORT = 3005;

dotenv.config(
    {
        path: './config.env',
    }
);

const DB = process.env.MongoDB.replace(
    '<password>',
    process.env.MongoDB_Password,
)

mongoose
    .connect(DB)
    .then(() => console.log('mongodb is connected...'))
    .catch((err) => console.log(err.message));

const requestListener = async (req, res) => {

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    if ( req.url === '/' && req.method === 'GET' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Home Page</h1>');
        res.end();
    } else if ( req.url === '/posts' && req.method === 'GET' ) {
        try {
            const data = await PostModel.find();
            success(res, data);
        } catch(err) {
            error(res, err.message);
        }
    } else if ( req.url === '/posts' && req.method === 'POST' ) {
        req.on('end', async () => {
            try {
                const { content } = JSON.parse(body);
                if ( !content ) {
                    error(res, '【內容】必填');
                    return;
                }

                const data = await PostModel.create(
                    {
                        content,
                    }
                );
                success(res, data);
            } catch(err) {
                error(res, err.message);
            }
        });
    } else if ( req.url === '/posts' && req.method === 'DELETE' ) {
        try {
            await PostModel.deleteMany({});
            success(res, []);
        } catch(err) {
            error(res, err.message);
        }
    } else if ( req.url.startsWith('/posts/') && req.method === 'DELETE' ) {
        try {
            const id = req.url.split('/').pop();
            const data = await PostModel.findByIdAndDelete(id);
            success(res, data);
        } catch(err) {
            error(res, err.message);
        }
    } else if ( req.url.startsWith('/posts/') && req.method === 'PATCH' ) {
        req.on('end', async () => {
            try {
                const id = req.url.split('/').pop();
                const { content } = JSON.parse(body);

                if ( !content ) {
                    error(res, '【內容】必填');
                    return;
                }

                const data = await PostModel.findByIdAndUpdate(
                    id,
                    {
                        content,
                    }
                )
                success(res, data);
            } catch(err) {
                error(res, err.message);
            }
        });
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

server.listen(process.env.PORT || PORT, () => {
    if ( process.env.PORT ) {
        console.log('Deploy Heroku Successfully');
        return;
    }
    console.log(`Server running at http://localhost:${PORT}/`);
});
