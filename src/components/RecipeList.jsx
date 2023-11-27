import React, { useContext } from "react";
import "./RecipeList.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { firedb } from "../firebase/config";
import Trashcan from "../assets/delete-icon.svg";

export const RecipeList = ({ recipes }) => {
  const { mode } = useContext(ThemeContext);
  if (recipes.length === 0) {
    return <div className="error">검색된 레시피가 없습니다.</div>;
  }

  //파이어베이스로 db삭제하기
  const handleClick = (id) => {
    firedb.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>요리하기</Link>
          <img
            src={Trashcan}
            alt=""
            className="delete"
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};
