import React from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_IN_GENRE } from "../queries";

const Recommended = (props) => {
  const genre = localStorage.getItem("userGenre");
  const { data } = useQuery(
    BOOKS_IN_GENRE,
    { variables: { genre: genre } } /* , { pollInterval: 2000 } */
  );

  console.log(genre);
  if (!props.show) {
    return null;
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <h3>Recommendations</h3>

      <p>
        books in your favourite genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data &&
            data.allBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recommended;
