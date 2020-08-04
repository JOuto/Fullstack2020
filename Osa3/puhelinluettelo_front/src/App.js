import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import personService from "./services/persons2";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.includes("removed")) {
    return <div className="error">{message}</div>;
  }
  if (message.includes("alidat")) {
    return <div className="error">{message}</div>;
  }
  return <div className="notification">{message}</div>;
};

const Names = ({ names, deleteName }) => {
  return (
    <div>
      {names.name} {names.number}
      <button onClick={deleteName}>delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [nameListRender, setNameListRender] = useState();

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [nameListRender]);
  console.log("render", persons.length, "notes");

  const addPerson = (event) => {
    event.preventDefault();

    if (!persons.some((p) => p.name === newName)) {
      console.log("button clicked", event.target);

      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));

          setNotification(`Added ${newName} `);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error.response.data);
          setNotification(error.response.data.error);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
    if (persons.some((p) => p.name === newName)) {
      if (
        window.confirm(
          `${newName} has already added to phonebook. You wanna replace old number?`
        )
      ) {
        const nameObject = {
          name: newName,
          number: newNumber,
        };

        const nameToReplace = persons.filter((name) =>
          name.name.includes(newName)
        );

        axios
          .put("/api/persons/" + nameToReplace[0].id, nameObject)

          .then((response) => console.log(response.data))
          .catch((error) => {
            setNotification(error.response.data.error);

            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
        setNotification(`${newName}´s number updated`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }

      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    setSearchInput(event.target.value);
  };
  console.log(persons);
  const namesToShow = persons.filter((p) => p.name.includes(searchInput));

  const deleteName = (name) => () => {
    axios
      .delete("/api/persons/" + name.id)
      .then((response) => {
        console.log(response.data);
        setNameListRender(namesToShow);
        setNotification(`${name.name} deleted `);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setNotification(`Note '${name.name}' was already removed from server`);
        setNameListRender(namesToShow);

        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      search
      <input value={searchInput} onChange={handleNameSearch} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Names</h2>
      {namesToShow &&
        namesToShow.map((name, i) => (
          <div key={i + name.name}>
            <Names key={i} names={name} deleteName={deleteName(name)} />
          </div>
        ))}
    </div>
  );
};

export default App;
