import { createConnection, getConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

getConnectionOptions().then((connectionOptions) => {
  return createConnection(
    Object.assign(connectionOptions, {
      type: process.env.DATABASE_CONNECTION,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASENAME,
    })
  );
});
