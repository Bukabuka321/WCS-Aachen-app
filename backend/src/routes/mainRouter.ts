import { Router } from "express";
import BusinessesRouter from "./businesses/router";
import EventsRouter from "./events/router";

const MainRouter = Router();

MainRouter.use("/businesses", BusinessesRouter);
MainRouter.use("/events", EventsRouter);

export default MainRouter;
