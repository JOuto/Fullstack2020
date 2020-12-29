import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import {
  TextField,
  NumberField,
  SelectRatingField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import { SickLeave, HealthCheckRating } from "../types";

import { useStateValue } from "../state";

interface CombinedEntryvalues {
  id: string;
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: SickLeave;
  discharge?: { date: string; criteria: string };
}

export type EntryFormValues = Omit<CombinedEntryvalues, "id">;

export enum EntryType {
  HealthCheckEntry = "HealthCheck",
  HospitalEntry = "HospitalEntry",
  OccupationalHealthcareEntry = "OccupationalHealthcareEntry",
}
export type EntryOption = {
  value: EntryType;
  label: string;
};
type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryOption[];
};

const healthCheckOptions: EntryOption[] = [
  { value: EntryType.HealthCheckEntry, label: "Healthcheck" },
  { value: EntryType.HospitalEntry, label: "Hospital" },
  {
    value: EntryType.OccupationalHealthcareEntry,
    label: "Occupational healthcare",
  },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectRatingField
              label="Entry type *"
              name="type"
              options={healthCheckOptions}
            />
            <Field
              label="Date *"
              placeholder="YYYY_MM_DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist *"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <Field
              label="Description *"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === "HealthCheck" && (
              <Field
                label="healthCheckRating *"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {values.type === "OccupationalHealthcareEntry" && (
              <div>
                <Field
                  label="Employer *"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />

                <Field
                  label="Sick leave *"
                  placeholder="startDate YYYY_MM_DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label=""
                  name="sickLeave.endDate"
                  placeholder="endDate YYYY_MM_DD"
                  component={TextField}
                />
              </div>
            )}
            {values.type === "HospitalEntry" && (
              <div>
                <Field
                  label="Discharge *"
                  placeholder="date YYYY_MM_DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label=""
                  name="discharge.criteria"
                  placeholder="criteria"
                  component={TextField}
                />
              </div>
            )}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
