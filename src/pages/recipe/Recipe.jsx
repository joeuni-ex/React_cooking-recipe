import { useParams } from "react-router-dom";
import "./Recipe.css";
import { useFetch } from "../../hooks/useFetch";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Recipe() {
  const { mode } = useContext(ThemeContext);
  const { id } = useParams();
  const url = "http://localhost:3030/recipes/" + id;
  const { error, isPending, data: recipe } = useFetch(url);
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}
      {recipe && (
        <>
          <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
          <p className="time">요리시간 {recipe.cookingTime} 완성</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li className={`page-li ${mode}`} key={ing}>
                {ing}
              </li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
