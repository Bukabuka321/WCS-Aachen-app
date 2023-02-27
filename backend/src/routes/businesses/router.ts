import { Router } from "express";
import { createBusiness, getAllBusinesses, getBusinessById } from "./handlers";

const BusinessesRouter = Router();

BusinessesRouter.get("/", getAllBusinesses);
BusinessesRouter.get("/:itemId", getBusinessById);
BusinessesRouter.post("/", createBusiness);

export default BusinessesRouter;