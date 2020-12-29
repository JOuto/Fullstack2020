import React from "react";
import { setPatient } from "../../src/state/reducer";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import {
  Gender,
  HealthCheckEntry,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { Segment, Icon, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import axios from "axios";
import AddEntryModal from "../AddEntryModal";
import { v4 as uuid } from "uuid";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const postEntry = async (
    entry: Entry,
    id: string,
    values: EntryFormValues
  ) => {
    try {
      console.log(entry);
      console.log(values.diagnosisCodes);
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, {
        entry,
        id,
      });
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const submitNewEntry = (values: EntryFormValues) => {
    const baseEntry = {
      id: uuid(),
      date: values.date,
      description: values.description,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes,
    };
    if (!isDate(values.date)) {
      setError("incorrect date");
    } else {
      if (values.type === "HealthCheck") {
        const entry: HealthCheckEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: values.healthCheckRating,
        };

        postEntry(entry, id, values);
        closeModal();
      }
      if (values.type === "HospitalEntry") {
        const entry: HospitalEntry = {
          ...baseEntry,
          type: "Hospital",
          discharge: values.discharge,
        };
        if (
          (values.discharge && values.discharge.criteria === "") ||
          (values.discharge && !isDate(values.discharge.date))
        ) {
          setError("incorrect discharge date or description");
        } else {
          postEntry(entry, id, values);
          closeModal();
        }
      }
    }
    if (values.type === "OccupationalHealthcareEntry") {
      const entry: OccupationalHealthcareEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: values.employerName,
      };
      if (
        (values.sickLeave && !isDate(values.sickLeave.endDate)) ||
        (values.sickLeave && !isDate(values.sickLeave.startDate)) ||
        values.employerName === ""
      ) {
        setError("incorrect sick leave date or missing employer name");
      } else if (values.sickLeave) {
        entry.sickLeave = {
          startDate: values.sickLeave.startDate,
          endDate: values.sickLeave.endDate,
        };
        postEntry(entry, id, values);
        closeModal();
      }
    }
  };

  const genderIcon = (gender: Gender) => {
    if (gender === "male") {
      return "mars";
    }
    if (gender === "female") {
      return "venus";
    }
    return "question";
  };

  React.useEffect(() => {
    if (!patient || patient.id !== id) {
      const fetchPatient = async () => {
        console.log("hep");
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patient));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [dispatch, id, patient]);

  if (patient !== null) {
    return (
      <div>
        <h2>
          {patient.name} <Icon name={genderIcon(patient.gender)} />
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h2>Entries</h2>
        {patient.entries.map((entry, i) => (
          <Segment key={i}>
            <EntryDetails key={i} entry={entry} />
          </Segment>
        ))}

        <AddEntryModal
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          modalOpen={modalOpen}
        />
        <Button onClick={() => openModal()}>Add Entry</Button>
      </div>
    );
  }
  return null;
};
export default PatientPage;
