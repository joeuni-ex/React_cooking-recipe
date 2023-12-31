import { useContext, useEffect, useRef, useState } from "react";
import "./Create.css";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { firedb } from "../../firebase/config";
import { ThemeContext } from "../../context/ThemeContext";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState(""); //한 개의 재료
  const [ingredients, setIngredients] = useState([]); // 모든 재료
  const ingredientInput = useRef(); //특정 태그를 지정한다
  const { mode } = useContext(ThemeContext);
  //JSON 서버 DB연결
  //const { postData, data } = useFetch("http://localhost:3030/recipes", "POST");
  const navigate = useNavigate();

  //useFetch를 사용해서 데이터를 서버로 전송 후 그 결과를 받았을 때(data가 바뀔 때)
  // navigate를 이용해서 home으로 리다이렉트
  // useEffect(() => {
  //   if (data) {
  //     navigate("/");
  //   }
  // }, [data]);

  //요리 재료 추가
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim(); //입력된 재료의 공백 제거

    // 새 재료가 모든 재료에 없을 경우 모든 재료에 추가 한다.
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, newIngredient]); //이전 모든 재료에 추가한다.
    }
    setNewIngredient(""); //한 개의 재료는 공백으로
    ingredientInput.current.focus(); //커서를 정해진 태그에 위치
  };

  //레시피 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " 분",
    };

    try {
      await firedb.collection("recipes").add(doc);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create">
      <h2 className={`page-title ${mode}`}>새 레시피를 추가하세요</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span className={`${mode}`}>요리 제목:</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            required
          />
        </label>

        {/*요리재료*/}
        <label>
          <span className={`${mode}`}>요리 재료:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              사용
            </button>
          </div>
        </label>
        <p className={`${mode}`}>
          재료들 :{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span className={`${mode}`}>요리 방법:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span className={`${mode}`}>쿠킹 타임 (분):</span>
          <input
            onChange={(e) => setCookingTime(e.target.value)}
            type="number"
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">추가</button>
      </form>
    </div>
  );
}
