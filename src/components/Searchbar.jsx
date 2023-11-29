import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

const Searchbar = () => {
  const [term, setTerm] = useState(""); //검색어
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`); //q= 검색어로 요청한다.
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" className="searchText"></label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="레시피를 검색하세요"
        />
      </form>
    </div>
  );
};

export default Searchbar;
