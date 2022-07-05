import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "1c5ee19b4d67ab2d34835d17922369fa",
    language: "ko-kr",
  },
});

export const movieApi = {
  nowPlaying: () => api.get("/movie/now_playing"),
  topRated: () => api.get("/movie/top_rated"),
  latest: () => api.get("/movie/latest"),
  upComing: () => api.get("/movie/upcoming"),
  movieDetail: (id) => api.get(`/movie/${id}`),
  movieVideo: (id) => api.get(`/movie/${id}/videos`),
  search: (term) =>
    api.get(`/search/movie`, {
      params: {
        query: term,
      },
    }),
};

// const detail = (id) => {
//   api.get(`/movie/${id}`)
// }

// detail(12345)

// => id = 12345
// ====================
// params = 속성 더 부여할때()
// 쿼리에 매개변수, term or keyword
