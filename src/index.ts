import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const uri: string = process.env.DATABASE_URI ?? '';

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

mongoose.connect(uri).catch((err: any) => console.log(err));

const connection = mongoose.connection;
connection.once('open', async () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
