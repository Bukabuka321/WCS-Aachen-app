import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import MainRouter from "./routes/mainRouter";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

interface Business {
  category: string;
  name: string;
}

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(MainRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
