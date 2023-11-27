import { useEffect, useState } from "react";
import { RecipeList } from "../../components/RecipeList";
import { firedb } from "../../firebase/config";

import "./Home.css";

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3030/recipes"); //제이슨 서버 주소

  //파이어베이스
  const [data, setData] = useState(null); //데이터
  const [isPending, setIsPending] = useState(false); //로딩상태
  const [error, setError] = useState(""); //에러메세지

  useEffect(() => {
    //파이어 스토어에서 데이터 가져오기
    setIsPending(true); //데이터 가져오기 작업시작(로딩중)
    const unsub = firedb
      .collection("recipes") //컬렉션에서
      .onSnapshot(
        (snapshot) => {
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
        },
        (error) => {
          //에러 발생 시
          setError(error.message); //에러 메세지 출력
          setIsPending(false); //작업 종료
        }
      );

    return () => unsub(); //useEffect가 종료될 때 즉, 다른 페이지로 이동했을 시
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
