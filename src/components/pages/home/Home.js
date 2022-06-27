import { useEffect, useState } from "react";
import { movieApi } from "../../../api";

export const Home = () => {
  const [playing, setPlaying] = useState();
  const [rated, setRated] = useState();
  const [upComing, setUpComing] = useState();

  // 제일 먼저 읽어야(로딩) 할 것 => useEffect
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
      // => movieApi의 각 오브젝트 값들을 나열 => 가공해야함 => 변수로?? await를 붙이면 오브젝트 형태로 변경됨
      //
      // const top = movieApi.topRated();
      // console.log((await top).data.results);
      // async 랑 await 입력해야 비동기 적용됨, 이렇게 사용해도 되지만 결과 값이 점점 길어짐
      // => 객체 비구조화 할당으로 값 가져오기(짧게처리가능)

      try {
        const {
          data: { results: ratedData },
        } = await movieApi.topRated();
        setRated(ratedData);

        const {
          data: { results: playingData },
        } = await movieApi.nowPlaying();
        // 비구조화 할당 이용시 변수명 변경할때
        // 변수명: 변경할 명
        setPlaying(playingData);

        const {
          data: { results: upComingData },
        } = await movieApi.upComing;
        setUpComing(upComingData);
      } catch (error) {}
    };
    movieData();
  }, []);

  console.log("현재상영 영화:", playing);
  console.log("인기 영화", rated);
  console.log("개봉예정 영화", upComing);

  // 함수 밖으로 뺄 때 저장 useState
  return <div>Home</div>;
  // 확인할 때 useState의 이름을 적어주기
};

// try catch 오류 예외처리(if같은거?) 비동기 쓸때 필수? => catch가 오류를 잡는 역할
