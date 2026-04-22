import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">NextGen</h1>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/dashboard">Money Snapshot</NavLink>
        <NavLink to="/tracks">Strategy Tracks</NavLink>
        <NavLink to="/simulation">Simulation Lab</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;