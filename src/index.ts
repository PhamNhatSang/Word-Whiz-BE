import express, { Request, Response } from 'express'
import { createExpressServer } from 'routing-controllers';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8080
import { database } from './database'
import UserController from './controllers/user.controller';
createExpressServer({
  routePrefix: '/api',
  controllers: [UserController],
}).listen(port, async () => {
  await database.sync({alter: true})
  return console.log(`Server is listening on ${port}`)
})


  

