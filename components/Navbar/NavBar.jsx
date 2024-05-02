import React from "react";
// import Logo from "./Logo";
// import SearchBar from "./SearchBar";
// import TotalMovies from "./TotalMovies";
function NavBar({ children }) {
  return (
    <>
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

export default NavBar;
