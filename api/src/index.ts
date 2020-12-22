import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';

import routes from './routes/index';
import { dbOptions } from './util/databaseOptions'

createConnection(dbOptions).then(async connection => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  const PORT = 3001;
  app.use('/api', routes);
  app.get('/ping', (_req : Request , res: Response) => {
    console.log('someone pinged here');
    res.send('pong');
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log('TypeORM connection error: ', error))