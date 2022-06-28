import styled from "styled-components";
import { imgUrl } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";

const Banner = styled.section`
  height: 80vh;
  padding: ${mainStyle.padding};
  padding-top: 250px;
  @media screen and (max-width: 500px) {
    height: 100vh;
    position: relative;
  }
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 700;
  max-width: 650px;
  /* 브라우저를 늘려도 최대한의 가로길이가 650px */
  /* width: 100%; */
  line-height: 6rem;
  @media screen and (max-width: 500px) {
    font-size: 45px;
    line-height: 3rem;
    position: absolute;
    bottom: 20%;
    left: 20px;
    /* 넘치면 부모에 overflow: hidden; or 부모의 가로값 100% ㄴㄴ or transform: translateX(20px)*/
  }
`;

const Desc = styled.p`
  font-size: 20px;
  margin-top: 20px;
  max-width: 700px;
  width: 100%;
  line-height: 2rem;
  opacity: 0.9;
  font-weight: 300;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const MainBanner = ({ playData }) => {
  // 이름을 바꿔주기(playData:playing / playData로 수정)
  return (
    <Banner
      style={{
        background: `url(${imgUrl}${playData.backdrop_path}) no-repeat center / cover`,
      }}
    >
      {/* 새로고침하면 인식안됨 => 한번 더 기다려야함? */}
      <Title>{playData.title}</Title>
      <Desc>{playData.overview.slice(0, 100) + "..."}</Desc>
    </Banner>
  );
};
