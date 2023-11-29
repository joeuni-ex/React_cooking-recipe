import { Link, useParams } from "react-router-dom";
import "./Recipe.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { firedb } from "../../firebase/config";

export default function Recipe() {
  const { mode } = useContext(ThemeContext);
  const { id } = useParams();
  // JSON 서버 DB
  // const url = "http://localhost:3030/recipes/" + id;
  // const { error, isPending, data: recipe } = useFetch(url);

  // 파이어 베이스 DB
  const [recipe, setRecipe] = useState(null); //한 개의 레시피 객체
  const [isPending, setIsPending] = useState(false); //로딩 상태
  const [error, setError] = useState(""); //에러메세지

  useEffect(() => {
    setIsPending(true);
    firedb
      .collection("recipes") //레시피 중
      .doc(id) //id로
      .get() //가져온다
      .then((doc) => {
        //console.log(doc.data()); //콘솔로 확인하기
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("레시피를 찾을 수 없습니다.");
        }
      });
  }, [id]);

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
          <Link to="/" className="backLink">
            <div>
              <button className="backBtn">뒤로가기</button>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
