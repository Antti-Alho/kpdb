import express from 'express'
import { createConnection } from 'typeorm'
import cors from 'cors'
import morgan from 'morgan'

import routes from './routes/index'
import { dbOptions } from './databaseOptions'

createConnection(dbOptions).then(async () => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(morgan('tiny'))
  const PORT = 3001
  app.use('/api', routes)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
}).catch(error => console.log('TypeORM connection error: ', error))