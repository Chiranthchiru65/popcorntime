import React from "react";
import { useState } from "react";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && <>{children}</>}
    </div>
  );
}

function MoviesList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((item) => (
        <ListItem
          eachMovie={item}
          key={crypto.randomUUID()}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

function ListItem({ eachMovie, onSelectedMovie }) {
  return (
    <li
      key={eachMovie.imdbID}
      onClick={() => onSelectedMovie(eachMovie.imdbID)}
    >
      <img src={eachMovie.Poster} alt={`${eachMovie.Title} poster`} />
      <h3>{eachMovie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{eachMovie.Year}</span>
        </p>
      </div>
    </li>
  );
}
export default Box;
export { MoviesList };
