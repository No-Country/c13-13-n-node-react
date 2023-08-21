const express=require('express');
const cors= require('cors');

class Server{

    constructor(){
        this.app= express();
        this.port= process.env.PORT;
        this.users='/users'

        //Server methods
        this.middlewares();

        //Routes
        this.routes();

        //DbConnection
        //this.dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //body parse
        this.app.use(express.json());

        //public directory
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.users, require('../routes/users'));
    }

    //Server start
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`App running at port ${this.port}`);
        })
    }
}

module.exports= Server;
