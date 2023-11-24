import React from "react";
import "./RecipeList.css";
import { Link } from "react-router-dom";

export const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <div className="error">검색된 레시피가 없습니다.</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>요리하기</Link>
        </div>
      ))}
    </div>
  );
};
