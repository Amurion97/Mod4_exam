import * as express from "express"
import * as bodyParser from "body-parser"
import {AppDataSource} from "./data-source"
import * as cors from 'cors';
import {router} from "./router/routes";

const hostname = '127.0.0.1';
const port = 4999;

AppDataSource.initialize().then(async () => {

        // create express app
        const app = express()

        // setup express app here
        app.use(bodyParser.json());
        app.use(cors({
            // origin: the port that front end server is running on
            // origin: `http://${hostname}:1400`,
            credentials: true
        }));
        app.use('', router);

        // start express server
        app.listen(port);

        let current = new Date(Date.now())
        console.log(`${current.getHours()}:${current.getMinutes()} Express server has started on port ${port}. 
        Open http://${hostname}:${port}/cars to see results`)

    }
).catch(error => console.log(error))
