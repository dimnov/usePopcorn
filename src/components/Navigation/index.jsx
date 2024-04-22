import { useState } from "react";
import Search from "./Search.jsx";
import Logo from "./Logo.jsx";
import NumResults from "./NumResults.jsx";

function Navigation() {
 const [query, setQuery] = useState("");

 return (
  <nav className="nav-bar">
   <Logo />
   <Search query={query} />
   <NumResults />
  </nav>
 );
}

export default Navigation;
