import React from "react";
//import { apiBaseUrl } from "../constants";
//import { useStateValue, setDiagnosisList } from "../state";
import { Entry } from "../types";
//import axios from "axios";
import { Icon } from "semantic-ui-react";
const HospitalEntry: React.FC<{ entry: Entry; diagnoseRender: Function }> = ({
  entry,
  diagnoseRender,
}) => {
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

  return (
    <div>
      <h2>
        {entry.date} <Icon name="user md" />
      </h2>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && diagnoseRender(entry.diagnosisCodes)}
    </div>
  );
};
export default HospitalEntry;
