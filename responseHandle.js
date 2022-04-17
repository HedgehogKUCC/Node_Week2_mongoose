const config = require('./config');

const success = function(res, data) {
    res.writeHead(200, config.headers);
    res.write(JSON.stringify({
        result: true,
        data
    }));
    res.end();
}

const error = function(res, msg) {
    res.writeHead(400, config.headers);
    res.write(JSON.stringify({
        result: false,
        msg
    }));
    res.end();
}

module.exports = {
    success,
    error,
}
