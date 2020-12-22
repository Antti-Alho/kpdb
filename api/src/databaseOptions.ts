import path from 'path'
import { ConnectionOptions } from 'typeorm'
import * as dotenv from 'dotenv';

dotenv.config();

export const dbOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    path.join(__dirname, '/entity/*.ts')
  ],
  synchronize: true,
  logging: [ 'error', 'info', 'log']
}
