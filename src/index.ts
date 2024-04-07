import express, { Request, Response } from 'express'
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8080
import { database } from './database'

  
  app.get('/',  (_req: Request, res: Response) => {
    console.log('Request received')
    return res.send('Request received')
  })

  app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
  })

  app.listen(port, async () => {
    await database.sync({force: true})
    return console.log(`Server is listening on ${port}`)
  })


