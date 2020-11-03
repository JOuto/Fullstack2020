/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import patientService from "../Services/patientService";
import toNewPatient from "../utils";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: Omit<
    Patient,
    "ssn"
  >[] = patientService.getPatientsWithoutSsn();
  res.send(patients);
});

router.get("/:id", (_req, res) => {
  const p: Patient | undefined = patientService.getPatient(_req.params.id);
  res.send(p);
});

router.post("/", (req, res) => {
  const patient = toNewPatient(req.body);

  const newPatient: Omit<Patient, "ssn"> = patientService.addPatient(patient);
  res.json(newPatient);
});
router.post("/:id/entries", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { entry, id } = req.body;

  switch (entry.type) {
    case "HealthCheck":
      if (entry.healthCheckRating) {
        patientService.addEntry(entry, id);
        res.send("added");
      } else {
        res.send("field missing");
      }
      break;

    case "Hospital":
      if (entry.discharge) {
        patientService.addEntry(entry, id);
        res.send("added");
      } else {
        res.send("field missing");
      }
      break;

    case "OccupationalHealthcare":
      if (entry.employerName) {
        patientService.addEntry(entry, id);
        res.send("added");
      } else {
        res.send("field missing");
      }
      break;

    default:
      res.send("field missing");
      break;
  }
});

/* router.post("/", (_req, res) => {
  res.send("Saving a diary!");
}); */

export default router;
