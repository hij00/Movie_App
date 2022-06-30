import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { imgUrl } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";
import { Container } from "../../Container";
import { Loading } from "../../Loading";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  @media screen and (max-width: 500px) {
    /* display: flex;
    flex-direction: column; */
    display: block;
    /* padding: ${mainStyle.mPadding}; */
    margin-top: 80px;
  }
`;

const Con = styled.div`
  width: 48%;
  &:first-child {
    height: 80vh;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    &:first-child {
      height: 60vh;
    }
  }
`;

const Title = styled.h3`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 40px;
  @media screen and (max-width: 500px) {
    font-size: 45px;
    margin: 15px 0 15px 0;
  }
`;

const Release = styled.div`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const Runtime = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const Genres = styled.ul`
  font-size: 20px;
  font-weight: 600;
  li {
    list-style: disc;
    margin-bottom: 5px;
  }
  margin: 20px 0 40px 25px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
    margin: 15px 0 0 25px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 2.2rem;
  margin-top: 30px;
  opacity: 0.8;
  letter-spacing: 0.5px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    line-height: 1.8rem;
    margin-top: 15px;
    word-break: normal;
  }
`;

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

      try {
        const detail = await movieApi.movieDetail(id);
        // console.log(detail.data);
        // 비구조화 할당처리
        const { data } = await detail;
        // console.log(data);
        setMovieData(data);
        setLoading(false);
      } catch (error) {}
    };
    detailData();
  }, []);
  // useEffect 사용하기 / 선작업(먼저 호출, 호출하면서 다른걸 읽음) => 안전작업 & 로딩(useEffect 다 읽으면 로딩 완료)
  // 없으면 동시에 작업, (호출되기 전에 다른걸 읽을 수도 있음)

  // movie_id = integer(정수, 12345, Number)

  console.log(movieData);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {movieData && (
            <Container>
              <Wrap>
                <Con
                  style={{
                    background: `url(${
                      movieData.backdrop_path
                        ? `${imgUrl}${movieData.backdrop_path}`
                        : "https://mapandan.gov.ph/wp-content/uploads/2018/03/no_image.jpg"
                    }) no-repeat center / cover`,
                  }}
                />
                <Con>
                  <Title>{movieData.title}</Title>
                  <Release>개봉일 : {movieData.release_date}</Release>
                  <Runtime>{movieData.runtime}분</Runtime>
                  <Genres>
                    {movieData.genres.map((gen) => (
                      <li key={gen.id}>{gen.name}</li>
                    ))}
                  </Genres>

                  <Desc>{movieData.overview}</Desc>
                </Con>
              </Wrap>
            </Container>
          )}
        </>
      )}
    </>
  );
};
