const express = require('express');
const dbConnection = require('../database/config');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');


class Server {

    constructor() {
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            notes: '/api/notes',
            users: '/api/users'
        }
        this.app = express();
        this.dbConnect()
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp'
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.notes, require('../routes/notes'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(require('../routes/productionRoute'));
    }

    async dbConnect() {
        await dbConnection();
    }

    runServer() {
        this.app.listen(this.port, () => {
            console.log('Server is running in the port ', this.port)
        })
    }

}

module.exports = Server;