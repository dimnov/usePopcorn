import { useState } from "react";
import Search from "./Search.jsx";
import Logo from "./Logo.jsx";
import Result from "./Result.jsx";

function Navigation() {
 const [query, setQuery] = useState("");

 return (
  <nav className="nav-bar">
   <Logo />
   <Search query={query} />
   <Result />
  </nav>
 );
}

export default Navigation;
