export const ScrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return null;
};

// 이벤트라서 따로 리턴 안 함 (null)

// 페이지로 이동했을때 스크롤 위치 변경(scroll to : 강제로 스크롤 위치변경, 버튼 클릭했을때 페이지 내려가는)
// 좌표값 설정해야함
