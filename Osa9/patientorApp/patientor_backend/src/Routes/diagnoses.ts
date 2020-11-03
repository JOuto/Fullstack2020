import express from "express";
import diagnoseService from "../Services/diagnoseService";
import { Diagnose } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: Array<Diagnose> = diagnoseService.getDiagnoses();
  res.send(patients);
});

export default router;
