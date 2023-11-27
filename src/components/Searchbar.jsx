import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [term, setTerm] = useState(""); //검색어
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`); //q= 검색어로 요청한다.
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">검색:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
