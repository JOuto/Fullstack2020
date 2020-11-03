import React from "react";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosisList } from "../state";
import { Entry, Diagnosis } from "../types";
import axios from "axios";

import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";

//import axios from "axios";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  console.log(diagnoses);
  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses/`
        );
        dispatch(setDiagnosisList(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnoses();
  }, [dispatch]);

  const diagnoseRender = (codes: string[]) => {
    return codes.map((code, i) => {
      try {
        const diagnose = diagnoses.find((d) => d.code === code);
        return (
          <li key={i}>
            {code} {diagnose && diagnose.name}
          </li>
        );
      } catch (e) {
        console.log(e + "diagnose not found");
      }
    });
  };

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoseRender={diagnoseRender} />;

    case "Hospital":
      return <HospitalEntry entry={entry} diagnoseRender={diagnoseRender} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthCareEntry
          entry={entry}
          diagnoseRender={diagnoseRender}
        />
      );
    default:
      return assertNever(entry);
  }
};
export default EntryDetails;
