import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../styles/globalStyle";

const SHeader = styled.div`
  max-width: 100%;
  width: 100%;
  padding: ${mainStyle.padding};
  /* => 하나 글로벌 스타일로 지정하면 나머지도 다 미리 글로벌스타일 적용해주기~ */
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${(props) => props.bgColor};
  /* 모바일은 넓게 말고 길게 디자인 */
  @media screen and (max-width: 500px) {
    padding: ${mainStyle.mPadding};
  }
`;

const Logo = styled.h3`
  font-size: 28px;
  font-weight: 800;
  a {
    color: ${mainStyle.mainColor};
  }
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const MenuWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.li`
  margin-left: 100px;
  font-size: 18px;
  font-weight: 500;
  @media screen and (max-width: 500px) {
    margin-left: 20px;
  }
`;

export const Header = () => {
  const [bg, setBg] = useState("rgba(0,0,0,0.3)");
  const handleScroll = () => {
    const scr = window.pageYOffset;
    if (scr > 500) {
      setBg("#1d1d1d");
    } else {
      setBg("rgba(0,0,0,0.3)");
    }
  };
  window.addEventListener("scroll", handleScroll);

  return (
    <SHeader bgColor={bg}>
      <Logo>
        <Link to={"/"}>Movie</Link>
      </Logo>
      <MenuWrap>
        <Menu>
          <Link to={"/"}>Home</Link>
        </Menu>
        <Menu>
          <Link to={"/search"}>Search</Link>
        </Menu>
      </MenuWrap>
    </SHeader>
  );
};
