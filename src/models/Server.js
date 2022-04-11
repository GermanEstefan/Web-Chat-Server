const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, { cors: { origin: "*" } });
        this.middlewares();
        this.io.on('connection', socket => {
            console.log('User connected');
        })
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    runServer() {
        this.server.listen(this.port, () => {
            console.log('Server is running in the port ' + this.port);
        })
    }

}

module.exports = Server;