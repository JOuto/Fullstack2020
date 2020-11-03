import patientData from "../../data/patientData";
import { Patient, NewPatient, Entry } from "../types";

//import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = patientData;
const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};
const getPatientsWithoutSsn = (): Omit<Patient, "ssn">[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};
const uuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const addPatient = (patient: NewPatient): Omit<Patient, "ssn"> => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
  };

  patients.push(newPatient);
  const patientWithoutSsn: Omit<Patient, "ssn"> = {
    id: id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  };
  return patientWithoutSsn;
};
const addEntry = (entry: Entry, id: string): void => {
  patients.map((patient) => {
    if (patient.id !== id) {
      return patient;
    }
    const updatedPatient = { ...patient, entries: patient.entries.push(entry) };
    return updatedPatient;
  });
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatient,
  addEntry,
};
