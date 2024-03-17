import express, { Request, Response } from 'express'
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8080
import { createDatabase } from './database'
const instanceConnectionName = process.env.CLOUD_INSTANCE || ''
const username = process.env.DB_USERNAME || ''
const databaseName = process.env.DB_NAME || ''

async function startServer() {
  const database = await createDatabase({instanceConnectionName, username, databaseName});
  console.log(database);
  
  app.get('/',  (_req: Request, res: Response) => {
    console.log('Request received')
    return res.send('Request received')
  })

  app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
  })

  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })
}
 startServer().then(() => {
  console.log('Server started')
  }).catch((err) => {
    console.error('Error starting server', err)
    });


