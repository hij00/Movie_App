import { useEffect, useState } from "react";
import { movieApi } from "../../../api";
import { movieNum } from "../../../constants/constant";
import { Loading } from "../../Loading";
import { MainBanner } from "./MainBanner";
import "swiper/css";
import { Container } from "../../Container";
import { Movies } from "./Movies";

export const Home = () => {
  const [playing, setPlaying] = useState();
  const [rated, setRated] = useState();
  const [upComing, setUpComing] = useState();
  const [loading, setLoading] = useState(true);
  // 참 조건일때 로딩 화면이 먼저 뜨고 useEffect를 다 읽으면 거짓조건으로 변경되서 안 보이게

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
        } = await movieApi.upComing();
        setUpComing(upComingData);

        setLoading(false);
      } catch (error) {}
    };
    movieData();
  }, []);

  console.log("현재상영 영화:", playing);
  // console.log("인기 영화", rated);
  // console.log("개봉예정 영화", upComing);

  // 함수 밖으로 뺄 때  useState => 저장하는 역할
  return (
    <div>
      {/* => 삼항연산자 사용 */}
      {/* {playing ? <MainBanner
              style={{
                background: `url(https://image.tmdb.org/t/p/original/${playing[0].backdrop_path}) no-repeat center / cover`,
              }}
            >
              {/* 새로고침하면 인식안됨 => 한번 더 기다려야함? 
              <Title>{playing[0].title}</Title>
              <Desc>{playing[0].overview.slice(0, 100) + "..."}</Desc>
            </MainBanner> : "Loading..."} */}

      {/* =========================== */}

      {/* 다 읽고 실행하도록 => 사이트 들어왔을때 로딩화면 뜨도록 
      로딩이 참일때 로딩먼저 보여주고 거짓일때 배너 띄워주는*/}

      {loading ? (
        <Loading />
      ) : (
        // <>{playing && <MainBanner playData={playing[0]} />}</>
        // 뒤쪽 거짓조건에 부모 필요함

        // 여기에 배열순서 입력하거나 순서 파일 따로 빼기(constant 파일)
        <>
          {playing && (
            <>
              <MainBanner playData={playing[movieNum]} />
              <Container>
                <Movies movieData={playing} title="현재 상영 영화" />
                {/* => playing 프롭스로 전달하기 */}
                <Movies movieData={rated} title="인기 영화" />
                <Movies movieData={upComing} title="개봉 예정 영화" />
              </Container>
            </>
          )}
        </>
      )}

      {/* && 첫번째 조건이 맞다면 뒤의 조건 실행()*/}
    </div>
  );
  // 확인할 때 useState의 이름을 적어주기
};

// try catch 오류를 예외처리함(if같은거?) 비동기 쓸때 필수? => catch가 오류를 잡는 역할
