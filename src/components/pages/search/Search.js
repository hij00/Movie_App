import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { imgUrl } from "../../../constants/constant";
import { Container } from "../../Container";
import { Loading } from "../../Loading";
import { PageTitle } from "../../PageTitle";

const SearchWrap = styled.div`
  margin-top: 150px;
`;

const Input = styled.input`
  all: unset;
  /* 인풋 태그 속성 초기화, 스타일 제일 윗쪽에 */
  width: 100%;
  border: 1px solid #555;
  padding: 20px;
  /* (unset 해서 박스 사이징 한번 더 해야함) */
  box-sizing: border-box;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
  }
  &:search {
  }
`;

const ConWrap = styled.div`
  margin-top: 150px;
  display: grid;
  /* 플렉스처럼 부모에 넣어줘야함 */
  grid-template-columns: repeat(5, 1fr);
  /* 반복할숫자, 크기값(1fr 알아서) */
  column-gap: 30px;
  row-gap: 50px;
`;

const Con = styled.div`
  /* width: 250px; */
`;
const Bg = styled.div`
  height: 400px;
`;
const Title = styled.h3`
  font-size: 18px;
  margin-top: 10px;
`;

export const Search = () => {
  const [scMovie, setScMovie] = useState();
  const [loading, setLoading] = useState();
  // 처음부터 로딩 실행 아님, 검색하고 영화 찾는동안 로딩 => searchmovie함수에

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    // onblur 클릭했을때 테두리
  });

  const searchMovie = async () => {
    // console.log("hi~");
    // 내가 작성한 값이 hi~로 뜨게

    // console.log(getValues());
    const { search: term } = getValues();
    // 객체비구조화할당
    // console.log(term);
    // getValues는 input 태그에 작성된 내용을 가져옴
    // usEffect는 마운트 전에 사용

    setLoading(true);
    try {
      // console.log(await movieApi.search(term));
      // () 안에 getvalues의 값을 입력

      const {
        data: { results },
      } = await movieApi.search(term);

      // console.log(results.length <= 0);
      if (results.length <= 0) {
        // useState 새로 저장, useFrom의 setError
        setError("result", {
          message: "영화가 없습니다.",
        });
        // setError("에러이름", {message:"값"})
        // 유즈폼의 속성으로 에러를 설정할 수 있음
      } else {
        setScMovie(results);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    // async 쓰면 try
  };

  // console.log(errors);
  // 폼상태 에러처리 담당

  // console.log(get);

  return (
    <>
      <PageTitle title={"search"} />
      <Container>
        <SearchWrap>
          <form onSubmit={handleSubmit(searchMovie)}>
            <Input
              {...register("search", {
                required: "내용은 필수입니다.",
                // 메세지를 남기고 싶으면 required 에 작성
                // 빈값일때는 메세지에 리콰이얼드 내용이 나옴
                onChange() {
                  clearErrors("result");
                },
              })}
              type="text"
              placeholder="영화 검색"
            />
            {/* 스타일컴포넌트 태그 인풋으로 적기 */}
            {/* {errors && errors.search && errors.search.message} */}
            {errors?.search?.message}
            {/* ?. optional chaining */}
            {/* 메세지에 내용이 없음 */}

            {errors?.result?.message}
            {/* => 서치랑 결과값이랑 값이 나옴(onChange때문, 에러가 남아있어서,,, 글을 다시 적으면 에러가 없어져야함) => 에러삭제*/}
          </form>
        </SearchWrap>
        {loading ? (
          <Loading />
        ) : (
          <>
            {scMovie && (
              <>
                <ConWrap>
                  {scMovie.map((term) => (
                    <Con key={term.id}>
                      <Link to={`/detail/${term.id}}`}>
                        <Bg
                          style={{
                            background: `url(${imgUrl}${term.backdrop_path}) no-repeat center/cover`,
                          }}
                        />
                        {/* 이미지 크기 조절해서 들고오기 tmdb사이트 참고 */}
                        <Title>{term.title}</Title>
                      </Link>
                    </Con>
                  ))}
                </ConWrap>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

// 창 닫혀있을때 자동완성 안됨

// input value 말고 useform(form 태그 이벤트)
// react hook form (버전확인)
// 유즈폼 정의 => 폼태그 이벤트 처리(ex.onClick)
// ... spread
// register(input 별칭, {유효성검사})
//
