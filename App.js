// import { useState, useEffect } from "react";
// import "./App.css";
// import NavBar from "./components/Navbar/NavBar";
// import Main from "./components/Main/Main";
// import Logo from "./components/Navbar/Logo";
// import SearchBar from "./components/Navbar/SearchBar";
// import TotalMovies from "./components/Navbar/TotalMovies";
// import Box from "./components/Main/LeftBox";
// import WatchedMoviesAverage from "./components/Main/RightBox";
// import StarRating from "./components/StarRating";
// import { WatchedList } from "./components/Main/RightBox";

// import { MoviesList } from "./components/Main/LeftBox";

// const KEY = "c9cbbce3";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [watched, setWatched] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("inception");
//   const [selectedId, setSelectedId] = useState(null);

//   function handleSelectedMovie(id) {
//     setSelectedId((selectedId) => (id === selectedId ? null : id));
//   }

//   function closeDetailsPage() {
//     setSelectedId(null);
//   }

//   function handleAddWatched(movie) {
//     setWatched((watched) => [...watched, movie]);
//   }

//   function handleDeleteWatched(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }

//   useEffect(() => {
//     async function fetchMovieData() {
//       setTimeout(async () => {
//         try {
//           setIsLoading(true);
//           setError("");
//           const rawData = await fetch(
//             `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
//           );

//           if (!rawData.ok)
//             throw new Error("Something went wrong while fetching data");

//           const parsedData = await rawData.json();
//           if (parsedData.Response === "False")
//             throw new Error("Movie not found");
//           setMovies(parsedData.Search);

//           setIsLoading(false);
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setIsLoading(false);
//         }
//       }, 900);
//     }

//     if (query.length < 0) {
//       setMovies([]);
//       setError("");
//       return;
//     }

//     fetchMovieData();
//   }, [query]);

//   return (
//     <div className="App">
//       <NavBar movies={movies}>
//         <Logo />
//         <SearchBar query={query} setQuery={setQuery} />
//         <TotalMovies key={crypto.randomUUID()} movies={movies} />
//       </NavBar>

//       <Main>
//         <Box>
//           {/* for reference */}
//           {/* {isLoading ? (
//             <Loader />
//           ) : (
//             <MoviesList key={crypto.randomUUID()} movies={movies} />
//           )} */}

//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MoviesList movies={movies} onSelectedMovie={handleSelectedMovie} />
//           )}
//           {error && <ErrorMessage message={error} />}
//         </Box>

//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               closeDetailsPage={closeDetailsPage}
//               handleAddWatched={handleAddWatched}
//               watched={watched}
//               setWatched={setWatched}
//             />
//           ) : (
//             <>
//               <WatchedMoviesAverage watched={watched} />
//               <WatchedList
//                 watched={watched}
//                 handleDeleteWatched={handleDeleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </div>
//   );
// }

// export default App;

// function MovieDetails({
//   selectedId,
//   closeDetailsPage,
//   handleAddWatched,
//   watched,
//   setWatched,
// }) {
//   const [details, setDetails] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === selectedId
//   )?.userRating;
//   const {
//     Title: title,
//     Year: year,
//     Poster,
//     Runtime,
//     imdbRating,
//     Plot,
//     Released,
//     Actors,
//     Director,
//     Genre,
//   } = details;
//   console.log(title, year);

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       Poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(Runtime.split(" ").at(0)),
//       userRating,
//     };

//     handleAddWatched(newWatchedMovie);
//     closeDetailsPage();
//   }

//   async function dataFetchById() {
//     setIsLoading(true);
//     const fetchDetails = await fetch(
//       `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//     );

//     const parsedDetails = await fetchDetails.json();
//     setDetails(parsedDetails);
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     dataFetchById();
//   }, [selectedId]);

//   useEffect(() => {
//     if (!title) return;
//     document.title = `Movie | ${title}`;

//     return function () {
//       document.title = "usePopcorn";
//     };
//   }, [title]);

//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={closeDetailsPage}>
//               &larr;
//             </button>
//             <img src={Poster} alt={`Poster of ${title} movie`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>{Released} &bull;</p>
//               <p>{Genre}</p>
//               <p>
//                 <span>⭐</span>
//                 {imdbRating} IMDB rating
//               </p>
//             </div>
//           </header>
//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>Rated this movie {watchedUserRating}</p>
//               )}
//             </div>
//             <p>
//               <em>{Plot}</em>
//             </p>
//             <p>Starring {Actors}</p>
//             <p> Directed by {Director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function Loader() {
//   return <p className="loader"> Loading...</p>;
// }

// function ErrorMessage({ message }) {
//   return (
//     <div className="error">
//       <span>⚠️</span> {message}
//     </div>
//   );
// }

// // you should close the movie details back to its original form when you click a button
// // and when you click on the same movie that should also close

// // class Name of the button is btn-back
// // html - &larr

// // neeed to change movie details when clicked on new movie
// // need to add div - cn rating for starts
// //  add loading component when details is loading

import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "./useKey";
import { useLocalStorageState } from "./useLocalStorageState";
import { useMovies } from "./useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "c9cbbce3";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // if (imdbRating > 8) return <p>Greatest ever!</p>;
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  // useEffect(
  //   function () {
  //     setIsTop(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );

  const isTop = imdbRating > 8;
  console.log(isTop);

  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();

    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
