import { useEffect, useState } from "react";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { imgUrl } from "../../../constants/constant";

const Wrap = styled.section`
  height: 80vh;
`;
const Title = styled.div``;
const Desc = styled.div``;

export const HomeRe = () => {
  useEffect(() => {
    const movieRe = () => {
      console.log(movieApi);
    };
  }, []);

  return <></>;
};
