import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8080
import { database } from './database'
import express from 'express';
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

useExpressServer(app,{
  cors: true,
  routePrefix: '/api',
  controllers: [path.join(__dirname + '/controllers/*.controller.{js,ts}')],
  middlewares: [path.join(__dirname + '/middlewares/*.middleware.{js,ts}')],
})

app.listen(port, async () => {
  await database.initialize()
  return console.log(`Server is listening on ${port}`)
})


  

