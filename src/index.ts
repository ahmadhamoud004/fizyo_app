// MuhammadNour
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import ServiceProvidersRoutes from "./routes/service_providers_routes";
import DisputeRoutes from "./routes/dispute_routes";
import CommunicationsRoutes from "./routes/communications_routes";
import AgreementsRoutes from "./routes/agreements_routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;
const uri: string = process.env.DATABASE_URI ?? "";

mongoose.connect(uri).catch((err: any) => console.log(err));

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log("MongoDB database connection established successfully");
  const ServiceProvidersModel =
    await require("./models/service_providers_model");
  const DisputeModel = require("./models/dispute_model");
  const CommunicationsModel = require("./models/communications_model");
  const AgreementsModel = require("./models/agreements_model");
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/serviceProviders", ServiceProvidersRoutes);
app.use("/disputes", DisputeRoutes);
app.use("/communications", CommunicationsRoutes);
app.use("/agreements", AgreementsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
