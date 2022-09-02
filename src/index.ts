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
import UsersRoutes from "./routes/users_routes";
import RolesRoutes from "./routes/roles_route";
import EmployeesRoutes from "./routes/employees_routes";

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
  const UsersModel = require("./models/users_model");
  const RolesModel = require("./models/roles_model");
  const EmployeesModel = require("./models/employees_model");
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
app.use("/users", UsersRoutes);
app.use("/roles", RolesRoutes);
app.use("/employees", EmployeesRoutes);


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