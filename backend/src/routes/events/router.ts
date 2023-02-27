import { Router } from "express";
import { getAllEvents, getEventById, createEvent } from "./handlers";

const EventsRouter = Router();

EventsRouter.get("/", getAllEvents);
EventsRouter.get("/:itemId", getEventById);
EventsRouter.post("/", createEvent);

export default EventsRouter;
