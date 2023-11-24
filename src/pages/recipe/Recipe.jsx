import { useParams } from "react-router-dom";
import "./Recipe.css";
import { useFetch } from "../../hooks/useFetch";

export default function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3030/recipes/" + id;
  const { error, isPending, data: recipe } = useFetch(url);
  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}
      {recipe && <h2 className="page-title">{recipe.title}</h2>}
    </div>
  );
}
