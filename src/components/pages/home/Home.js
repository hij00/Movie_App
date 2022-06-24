import { useEffect } from "react";
import { movieApi } from "../../../api";

export const Home = () => {
  useEffect(() => {
    //   // const movieData = async () => {
    //   //   // console.log(await movieApi.nowPlaying());
    //   //   // const playing = await movieApi.nowPlaying();
    //   //   const {
    //   //     data: { results },
    //   //   } = await movieApi.nowPlaying();
    //   // };

    const movieData = async () => {
      // console.log(movieApi.topRated());
      // => movieApi의 각 오브젝트 값들을 나열 => 가공해야함 => 변수로??
      //
      // const top = movieApi.topRated();
      // console.log((await top).data.results);
      // async 랑 await 입력해야 비동기 적용됨, 이렇게 사용해도 되지만 결과 값이 점점 길어짐
      // => 객체 비구조화 할당으로 값 가져오기(짧게처리가능)
      //
      const {
        data: { results },
      } = await movieApi.topRated();
      console.log(results[0]);
    };
    movieData();
  }, []);

  return <></>;
};
