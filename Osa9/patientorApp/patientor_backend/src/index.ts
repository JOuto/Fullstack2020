import express from "express";
const app = express();
app.use(express.json());
import cors from "cors";
import patientRouter from "./Routes/patients";
import diagnoseRouter from "./Routes/diagnoses";
app.use(cors());
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnoseRouter);
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
