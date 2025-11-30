import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorMiddleware);

export default app;
