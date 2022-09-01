import express, { Application, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';


import  SessionRoute from "./routes/session_routes";
import AnnouncementRoute from "./routes/announcement_routes";
import AlarmRoute from "./routes/alarm_routes";
import NotificationRoute from "./routes/notification_routes";
import EnumRoute from "./routes/enum_routes";

dotenv.config();


const app: Application = express();
const port = process.env.PORT;
const uri: string = process.env.DATABASE_URI ??"";

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use(express.static('public'));

app.use("/sessions", SessionRoute);
app.use("/announcements", AnnouncementRoute);
app.use("/alarms", AlarmRoute);
app.use("/notifications", NotificationRoute);
app.use("/enums", EnumRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('HOME Page');
});

mongoose.connect(uri).catch((err: any) => console.log(err));

const connection = mongoose.connection;
connection.once('open', async () => {
  console.log('MongoDB database connection established successfully');
  const SessionModel = require("./models/SessionsModel");
  const AnnouncementModel = require("./models/AnnouncementsModel");
  const AlarmModel = require("./models/AlarmsModel");
  const NotificationModel = require("./models/NotificationsModel");
  const EnumModel = require("./models/EnumsModel");
  
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
