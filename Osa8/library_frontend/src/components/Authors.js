import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS } from "../queries";
import { SET_BIRTHYEAR } from "../queries";

const Authors = (props) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const result = useQuery(ALL_AUTHORS /* , { pollInterval: 2000 } */);

  const [editAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    const setBornTo = +born;
    setBorn("");
    const name = selectedOption.value;
    editAuthor({ variables: { name, setBornTo } });
  };
  const options =
    result.data !== undefined
      ? result.data.allAuthors.map((author) => ({
          value: author.name,
          label: author.name,
        }))
      : [];

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data &&
            result.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {props.user && (
        <div>
          <h2>Set year of birth</h2>

          <form onSubmit={submit}>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">set</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
