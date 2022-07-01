import styled from "styled-components";
import { imgUrl } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";

const Banner = styled.section`
  height: 80vh;
  padding: ${mainStyle.padding};
  padding-top: 250px;
  position: relative;
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
  z-index: 99;
  position: relative;
  /* z-index를 쓸땐 포지션 넣기?(다른게 포지션이 들어가있음) */
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
  z-index: 99;
  position: relative;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const BlackBg = styled.div`
  width: 100%;
  height: 60vh;
  /* background-color: gray; */
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 99, 0) 80%,
    rgba(0, 212, 255, 0) 100%
  );
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
      <BlackBg></BlackBg>
    </Banner>
  );
};
