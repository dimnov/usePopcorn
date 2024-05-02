import Logo from "./Logo.jsx";

function Navigation({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navigation;
