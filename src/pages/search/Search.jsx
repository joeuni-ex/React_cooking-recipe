import { useLocation } from "react-router-dom";
import "./Search.css";
import { useFetch } from "../../hooks/useFetch";
import { RecipeList } from "../../components/RecipeList";
export default function Search() {
  //요청 주소의 쿼리스트링을 가져오는 방법
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q"); // q에 해당하는 값을 쿼리스트링에서 가져옴

  const url = "http://localhost:3030/recipes?q=" + query;
  const { data, isPending, error } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">"{query}"를 포함하는 레시피는 </h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
