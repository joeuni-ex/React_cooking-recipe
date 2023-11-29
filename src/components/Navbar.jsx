import { Link } from "react-router-dom";
import "./Navbar.css";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const { color } = useContext(ThemeContext);
  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>🍳쿠킹 레시피</h1>
        </Link>

        <Link to="/create" className="btn">
          레시피 만들기
        </Link>
      </nav>
    </div>
  );
}
