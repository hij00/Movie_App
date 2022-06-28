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
  const [nowPlay, setNowPlay] = useState();

  useEffect(() => {
    try {
      const movieRE = async () => {
        //   console.log(await movieApi.nowPlaying());

        const {
          data: { results: nowP },
        } = await movieApi.nowPlaying();
        //   console.log(results);
        setNowPlay(nowP);
      };
      a;
    } catch (error) {}
    movieRE();
  }, []);

  return nowPlay ? (
    <Wrap
      style={{
        background: `url(${imgUrl}${nowPlay[0].backdrop_path}) no-repeat center / cover`,
      }}
    >
      <Title></Title>
      <Desc></Desc>
    </Wrap>
  ) : (
    "loading..."
  );
};
