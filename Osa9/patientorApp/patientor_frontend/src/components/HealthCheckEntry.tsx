import React from "react";
//import { apiBaseUrl } from "../constants";
//import { useStateValue, setDiagnosisList } from "../state";
import { Entry, HealthCheckRating } from "../types";
//import axios from "axios";
import { Icon } from "semantic-ui-react";

const HealthCheckEntry: React.FC<{
  entry: Entry;
  diagnoseRender: Function;
}> = ({ entry, diagnoseRender }) => {
  /*  const [{ diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      console.log("hep");
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses/`
        );
        dispatch(setDiagnosisList(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    fetchD();
  }, [dispatch]); */
  const healthCheckResultIcon = (rating: HealthCheckRating) => {
    if (rating === 3) {
      return "red";
    }
    if (rating === 2) {
      return "orange";
    }
    if (rating === 1) {
      return "yellow";
    }
    if (rating === 0) {
      return "green";
    }
  };
  if (entry.type === "HealthCheck") {
    return (
      <div>
        <h2>
          {entry.date} <Icon name="weight" />
        </h2>
        <p>{entry.description}</p>
        <p>
          <Icon
            name="heart"
            color={healthCheckResultIcon(entry.healthCheckRating)}
          />
          {entry.diagnosisCodes && diagnoseRender(entry.diagnosisCodes)}
        </p>
      </div>
    );
  }
  return null;
};
export default HealthCheckEntry;
