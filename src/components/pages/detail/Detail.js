import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { ScrollTop } from "../../../ScrollTop";
import { Container } from "../../Container";
import { Loading } from "../../Loading";
import { PageTitle } from "../../PageTitle";
import { MovieDetail } from "./MovieDetail";

const Iframe = styled.iframe`
  width: 100%;
  height: 700px;
  margin-top: 150px;
`;
// 영상 태그 iframe

export const Detail = () => {
  // console.log(movieApi.movieDetail(453395));
  // movieDetail 함수를 실행할때 뒤에 () 붙여야 실행됨,
  // () 안에 값을 넣으면 movieDetail의 id값!
  // 바로 사용할 수 없으니 비동기처리(async-await)

  // const movieData = async () => {
  //   // console.log(movieApi.movieDetail(453395));
  //   const mDetail = movieApi.movieDetail(453395);
  //   // const {
  //   //   data: { id },
  //   // } = await mDetail;
  //   // console.log(await (await mDetail).data.id);
  //   // const { data } = await mDetail;
  //   console.log(await (await mDetail).data);
  //   // await는 프로미스를 반환함
  //   // (비동기 처리 메소드가 반드시 프로미스 객체를 반환해야 await 작동됨)
  // };
  // movieData();

  // ===============================

  const [movieData, setMovieData] = useState();
  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(true);
  // 첫 화면 들어오면 로딩진행 true, 끝나면 false

  // const params = useParams();
  // 영화 id 가져오는 방법, url주소에 있는 변수값을 가져옴

  // console.log(params.id);

  const { id } = useParams();
  // => 이름을 id라고 적어서 id : '영화값' 이 뜸

  useEffect(() => {
    const detailData = async () => {
      // const detail = await movieApi.movieDetail(453395);
      // // console.log(detail.data);
      // // 비구조화 할당처리
      // const { data } = await detail;
      // // console.log(data);
      // setMovieData(data);
      // setLoading(false);

      const {
        data: { results },
      } = await movieApi.movieVideo(id);
      // console.log(results);

      try {
        const detail = await movieApi.movieDetail(id);
        // console.log(detail.data);
        // 비구조화 할당처리
        const { data } = await detail;
        // console.log(data);
        setMovieData(data);

        // 배열이 없을때 배열의 길이를 알아와서 없음 표시
        // setVideoData(results.length === 0 ? null : results);
        // 밑에 추가로 값 입력
        setVideoData(results.length === 0 ? null : results[0].key);

        setLoading(false);
      } catch (error) {}
    };
    detailData();
  }, []);
  // useEffect 사용하기 / 선작업(먼저 호출, 호출하면서 다른걸 읽음) => 안전작업 & 로딩(useEffect 다 읽으면 로딩 완료)
  // 없으면 동시에 작업, (호출되기 전에 다른걸 읽을 수도 있음)

  // movie_id = integer(정수, 12345, Number)

  // console.log(movieData);
  // =================================
  // console.log(videoData[0]);

  return (
    <>
      <PageTitle title={"detail"} />
      <ScrollTop />
      {/* 스크롤을 인식하고 나서 로딩하기 */}
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {movieData && <MovieDetail movieData={movieData} />}
          {videoData ? (
            <Iframe
              // src={`https://www.youtube.com/embed/${videoData[0].key}`}
              src={`https://www.youtube.com/embed/${videoData}`}
              allowfullscreen
            ></Iframe>
          ) : null}
          {/* 아이프레임도 처리해주기 videoData가 없으면 null */}
        </Container>

        // 클릭 alt 방향키
      )}
    </>
  );
};
