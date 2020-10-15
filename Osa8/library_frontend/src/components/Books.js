import React, { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_IN_GENRE } from "../queries";
//import { withApollo } from "react-apollo";

const Books = ({ client, show }) => {
  const [genre, setGenre] = useState(null);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllbooks] = useState([]);
  const [setGenreFilter, result] = useLazyQuery(BOOKS_IN_GENRE);

  const allBooksResult = useQuery(ALL_BOOKS /* , { pollInterval: 2000 } */);

  useEffect(() => {
    if (allBooksResult.data) {
      setBooks(allBooksResult.data.allBooks);
      setAllbooks(allBooksResult.data.allBooks);
    }
  }, [allBooksResult.data]);

  const settingGenre = (g) => {
    setGenreFilter({ variables: { genre: g } });
    setGenre(g);
  };
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  const genreObjectArray = allBooks.map((book) => book.genres);
  const allGenres = Array.prototype.concat.apply([], genreObjectArray);

  if (!show) {
    return null;
  }
  if (books !== allBooks) {
    return (
      <div>
        <p>
          {" "}
          in genre <b>{genre} </b>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setBooks(allBooks)}>all genres</button>
      </div>
    );
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres &&
        allGenres
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((genres) => (
            <button onClick={() => settingGenre(genres)}>{genres}</button>
          ))}
    </div>
  );
};

export default Books;
