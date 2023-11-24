import { useState } from "react";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime);
  };

  return (
    <div className="create">
      <h2 className="page-title">새 레시피를 추가하세요</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>요리 제목:</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            required
          />
        </label>

        {/* recipe ingredients here */}

        <label>
          <span>요리 방법:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>쿠킹 타임 (분):</span>
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
