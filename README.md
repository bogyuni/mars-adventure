# Mars Adventure

## summary

- Beerboy's Mars lab. Project
- https://bogyuni.github.io/mars-adventure/
- 마르스어드벤처는 Beerboy의 개인 홈페이지로서,<br>
  3D object와 패럴렉스 스크롤로 구성된 메인페이지와<br>
  벨트스크롤, 셀이동 방식으로 구성된 서브페이지로 구현되었습니다.<br>
  전체적인 분위기는 레트로 감성의 픽셀로 구성되었고, 각각의 오브젝트 픽셀들은 모두 <**tag**> 로 구성되었습니다.
- 2025-02-21 현재 70% 완료

## setting

- npm install
  - vite : build tool
  - firebase : cloud storage
  - three.js : 3D object
- run: npx vite

## Branches
- main - 배포용
- dev - 현재 개발 중인 내용
- beta - 초기버전
- hover-active - sub 페이지 벨트스크롤 페이즈에서 키다운 시 오브젝크 중첩 구현

## Page information

### index.html

- front page
- 3D Object
- parallax scroll

### sub.html

- sub page
- About me : 자기소개
- Portfolio : 그동안 작업한 프로젝트들
- ~~Contact us : 문의사항을 firebase 활용하여 저장~~
- Guest book : 방명록으로 수정. 기능은 Contact us와 동일하게 firebase
- weather API를 사용하여 날씨 구현
- beltscroll : 벨트스크롤 이동 방식, `←` `→` 좌우 이동, `↑` 실행, `↓` 취소
- cellmove : 셀(체스판) 이동 방식, `↑` `↓` `←` `→` 상하좌우 이동, 오브젝트와 겹치면 실행

## Date list

- 2023-12-27
  - 3D texture add
  - page, file 정리

- 2023-12-29
  - 메인 페이지 구성 시작 (메모 참고)

- 2024-01-02
  - 오브젝트 복수 생성

- 2024-01-10
  - 사용자 등록

- 2024-02-28
  - dot editor 개별프로젝트로 분할
  - 인트로 추가, 로켓 동작 모션 진행
  - 행성 폴리곤 텍스쳐 추가

- 2024-03-22
  - 날씨 표현 추가
  - 기상 데이터 받아 와서, 상황에 맞는 오브젝트 출력

- 2024-04-29
  - 서브페이지 구성 완료
  - 첫 진입 페이지는 벨트 스크롤 형태로 이동
  - 자기소개는(about me) 팝업
  - 포폴 리스트는(potfolio) 셀 이동 형태로 페이지 전환
  - 연락처는(contact us) 아직 미정

- 2024-04-30
  - 화면 전환(change over) 효과 등록
  - 공통으로 사용하는 데이터 리팩토링 중

- 2024-05-14
  - 서브데이터 수정 중, sub.js, substatus.js 완료
  - 벨트스크롤, 셀무브 정리해야함

- 2024-05-16
  - 픽셀로드 되는 시점 이후 세팅하는 부분을 고민 중, promise를 사용해야 하나

- 2024-05-17
  - 벨트스크롤 리팩토링 중, 배경 선택자와 이동 코드를 반복문으로 줄일 예정

- 2024-05-20
  - javascript 리팩토링 완료
  - 서브 데이터 삭제 (효용성 떨어짐)
  - 벨트 스크롤 구조물 픽셀 작업 해야함

- 2024-05-27
  - contactus에서 사용할 firebase 세팅

- 2025-02-21
  - dev 브랜치 : 오브젝트 대거 변경
  - 게스트북(contactus) 오브젝트 추가
  - 팝업 로직 리팩토링, 하나로 통합
  - 로보 움직이는 모션 리팩토링, 스부스하게 수정
  - 로켓 픽셀 수정, 로버 픽셀 수정
  - 메인 페이지 패럴렉스 수정
  - 초기 버전은 beta 브랜치로 독립립

- 2025-03-06
  - 벨트스크롤 동작 requestAnimationFrame 활용하여 부드럽게 변경
  - 성능상의 문제로 이동시 activeTrigger 체크하는 부분은 삭제
  - 벨트스크롤 전체적인 코드 수정, 리팩토링