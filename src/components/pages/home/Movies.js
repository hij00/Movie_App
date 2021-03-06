import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgUrl } from "../../../constants/constant";
import styled from "styled-components";
import { Navigation } from "swiper";

import "swiper/css/navigation";

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
  const params = {
    breakpoints: {
      320: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 5.5,
        spaceBetween: 20,
      },
    },
  };
  // 슬라이드 반응형적용방법

  return (
    <SMovies>
      <Title>{title}</Title>
      <Swiper modules={[Navigation]} navigation {...params}>
        {movieData.map((play) => (
          <SwiperSlide key={play.id}>
            <Link to={`/detail/${play.id}`}>
              <MovieImg
                style={{
                  background: `url(${
                    play.backdrop_path
                      ? `${imgUrl}${play.backdrop_path}`
                      : "https://mapandan.gov.ph/wp-content/uploads/2018/03/no_image.jpg"
                  }) no-repeat center / cover`,
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
