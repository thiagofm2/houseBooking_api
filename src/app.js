import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes.js'
import returnDirName from '../helpers/dirname.js'

class App{
    constructor(){
        this.server = express();
        mongoose.connect('mongodb+srv://devhouse:devhouse@cluster0.ghoq8ft.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());
        this.server.use(
            '/files',
            express.static(path.resolve(`${returnDirName}/../uploads`))
        );
        
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;