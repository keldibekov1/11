import userRoute from "./user.routes.js";
import { Router } from "express";

const mainRoute = Router();

mainRoute.use("/api", userRoute);

export default mainRoute;
