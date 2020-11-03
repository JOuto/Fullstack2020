import React from "react";
//import { apiBaseUrl } from "../constants";
//import { useStateValue, setDiagnosisList } from "../state";
import { Entry } from "../types";
//import axios from "axios";
import { Icon } from "semantic-ui-react";

const OccupationalHealthCareEntry: React.FC<{
  entry: Entry;
  diagnoseRender: Function;
}> = ({ entry, diagnoseRender }) => {
  if (entry.type === "OccupationalHealthcare") {
    return (
      <div>
        <h2>
          {entry.date} <Icon name="suitcase" /> {entry.employerName}
        </h2>
        <p>{entry.description}</p>
        {entry.diagnosisCodes && diagnoseRender(entry.diagnosisCodes)}
      </div>
    );
  }
  return null;
};
export default OccupationalHealthCareEntry;
