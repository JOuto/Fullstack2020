import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_IN_GENRE } from "../queries";

const Books = ({ show }) => {
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

  return (
    <div>
      <h2>books</h2>
      {books !== allBooks && (
        <p>
          {" "}
          in genre <b>{genre} </b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b, i) => (
            <tr key={i}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      choose genre:{" "}
      {allGenres &&
        allGenres
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((genres) => (
            <button onClick={() => settingGenre(genres)}>{genres}</button>
          ))}
      <button onClick={() => setBooks(allBooks)}>all genres</button>
    </div>
  );
};

export default Books;
