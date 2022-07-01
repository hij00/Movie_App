import styled from "styled-components";
import { imgUrl } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";

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

export const MovieDetail = ({ movieData }) => {
  return (
    <>
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
    </>
  );
};
