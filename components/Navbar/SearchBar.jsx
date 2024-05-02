import React from "react";
// import { useState } from "react";

function SearchBar({ query, setQuery }) {
  // const [query, setQuery] = useState("");

  return (
    <div>
      <input
        className="search"
        placeholder="Search movies..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
