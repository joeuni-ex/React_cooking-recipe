import { useLocation } from "react-router-dom";
import "./Search.css";
import { RecipeList } from "../../components/RecipeList";
import { useEffect, useState } from "react";
import { firedb } from "../../firebase/config";
export default function Search() {
  //요청 주소의 쿼리스트링을 가져오는 방법
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q"); // q에 해당하는 값을 쿼리스트링에서 가져옴

  //JSON 서버
  //const url = "http://localhost:3030/recipes?q=" + query;
  //const { data, isPending, error } = useFetch(url);

  //파이어베이스
  const [data, setData] = useState([]); //데이터
  const [isPending, setIsPending] = useState(false); //로딩상태
  const [error, setError] = useState(""); //에러메세지

  useEffect(() => {
    //파이어 스토어에서 데이터 가져오기
    setIsPending(true); //데이터 가져오기 작업시작(로딩중)
    firedb
      .collection("recipes")
      .where("title", ">=", query)
      .where("title", "<=", query + "~")
      .get()
      .then((snapshot) => {
        // console.log(snapshot.docs[0].data());
        //가져온 데이터를 snapshot이라한다.
        if (snapshot.empty) {
          //데이터가 없을 때
          setError("레시피가 없습니다."); //에러에 레시피 없음을 출력
          setIsPending(false); //가져오기 종료
        } else {
          // 데이터가 있을 경우
          let results = []; //빈 배열 생성
          snapshot.docs.forEach((doc) => {
            //반복문으로 결과를 배열에 넣는다.
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false); // 작업 종료
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [query]);

  return (
    <div>
      <h2 className="page-title">"{query}"를 포함하는 레시피는 </h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
