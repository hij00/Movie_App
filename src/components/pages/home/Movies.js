import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgUrl } from "../../../constants/constant";
import styled from "styled-components";

const SMovies = styled.div`
  margin-top: 120px;
`;
const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
`;
const MovieImg = styled.div`
  height: 250px;
  margin-bottom: 15px;
`;
const MovieTitle = styled.div`
  font-size: 18px;
  font-weight: 100;
`;

export const Movies = ({ movieData, title }) => {
  return (
    <SMovies>
      <Title>{title}</Title>
      <Swiper slidesPerView={5.5} spaceBetween={20}>
        {movieData.map((play) => (
          <SwiperSlide>
            <Link to={"#"}>
              <MovieImg
                style={{
                  background: `url(${imgUrl}${play.backdrop_path}) no-repeat center / cover`,
                }}
              />
              <MovieTitle>{play.title}</MovieTitle>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </SMovies>
  );
};
