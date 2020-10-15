import React, { useState } from "react";
import { gql, useQuery, useMutation, setError } from "@apollo/client";
import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  BOOKS_IN_GENRE,
} from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
      { query: BOOKS_IN_GENRE },
    ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });
  //console.log(createBook);

  const submit = async (event) => {
    event.preventDefault();
    //const published = +published; /* parseInt(published, 10); */
    //console.log(title, author, genres, typeof pub, pub);
    createBook({ variables: { title, author, published, genres } });
    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(+target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
