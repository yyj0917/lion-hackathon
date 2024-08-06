# lion-hackathon
2024 lion hackathon team 3

Front-end : 윤영준, 김연진

Back-end  : 변호영, 이석원, 정세진, 김지민


Tech Stack

Front-end: React js, node js, Redux

Back-end: Django, Django Rest Framework

배포&통신: Axios, aws

소통&협업: github, Figma, Notion


Front-End

로그인/회원가입 : 액세스-리프레쉬 토큰, 로컬스토리지 저장 -> 추후 쿠키, csrf토큰으로 보안강화

API 통신 : axios활용 및 axiosInstance 객체를 새로 생성하여 통신시 토큰을 검증하여 토큰이 있는 사용자만 서비스 이용가능

CSS : Styled-component활용 및 일부 .css파일 사용. -> 코드 가독성 개선을 위해 간소화예정

상태 관리 : Redux auth, sentiment에 일부 사용. -> 추후 전역적으로 사용이 필요한 state를 위해 React Query로 상태 관리 및 캐싱 처리 예정

Router : react-router-dom 을 활용하여 링크 이동을 통한 UX개선노력 -> 라우팅 연결 간소화 및 최적화


Back-End







기능별 로직

응원 메시지 : 구글 폼을 통해 받아온 메시지를 DB에 저장. fetch를 통해 서비스에 제공

공유일기 : 게시물 신고기능, 공감기능, 검색기능, 내가 쓴 공유일기 관리(+수정, 삭제기능)

동료매칭 : 상담사 지원 -> 구글 폼 형식에 맞게 작성후 제출 / 상담 요청 -> 카테고리 선택 후 적절한 상담사 매칭 & 전체 상담사 리스트

마이페이지 : 개인 일기 작성(+수정, 삭제, 배경전환, 날짜필터) , 한달캘린더(일기 및 일기의 감정상태 이모티콘 기록) , 감정분석(최근 30일간의 감정일기 분석 및 템플릿 제공)


