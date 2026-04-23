import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">NextGen</h1>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          ☰
        </button>

        <div className="nav-links desktop-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/dashboard">Money Snapshot</NavLink>
          <NavLink to="/tracks">Strategy Tracks</NavLink>
          <NavLink to="/simulation">Simulation Lab</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>
      </nav>

      <div className={`mobile-overlay ${menuOpen ? "show" : ""}`} onClick={closeMenu}></div>

      <aside className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="mobile-sidebar-top">
          <h2>Menu</h2>
          <button onClick={closeMenu} aria-label="Close navigation menu">
            ✕
          </button>
        </div>

        <div className="mobile-nav-links">
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={closeMenu}>
            Money Snapshot
          </NavLink>
          <NavLink to="/tracks" onClick={closeMenu}>
            Strategy Tracks
          </NavLink>
          <NavLink to="/simulation" onClick={closeMenu}>
            Simulation Lab
          </NavLink>
          <NavLink to="/profile" onClick={closeMenu}>
            Profile
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Navbar;