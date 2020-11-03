import diagnoseData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnoseData;
const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

/* const addEntry = () => {
  return null;
};
 */
export default {
  getDiagnoses,
};
