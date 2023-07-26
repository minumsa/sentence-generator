export const fortuneArr: string[] = [
  "집보다 나은 곳은 없습니다.",
  "오늘 만큼은 오직 마음이 이끄는 대로 하세요.",
  "가끔은 일부러 길을 잃어보세요.",
  "믿음은 사랑의 가장 중요한 조건입니다.",
  "결국에는 모두 괜찮아질 거예요.",
  "두려워하지 마세요. 죽기밖에 더 하겠어요?",
  "해야 할 일을 하세요.",
  "당연한 말이지만, 실패가 없으면 성공도 없습니다.",
  "여행자의 시선으로 일상을 살아가보세요.",
  "5분 동안만 20년 뒤의 당신을 떠올려보세요.",
  "평소의 당신과 반대로 행동해보세요.",
  "아무런 대가 없이 누군가를 도와보세요.",
  "이틀 전 아침에는 뭘 먹었나요?",
  "당신이 감사해야 할 사람들을 떠올려보세요.",
  "오늘 밤엔 예전에 좋아하던 영화를 다시 한번 관람해보면 어떨까요?",
  "누군가에게 찾아온 행운을 진심으로 축하해보세요. 당신에게도 그런 행운이 찾아올지 모릅니다.",
];

export const fortuneEngArr: string[] = [
  "There's no place like home.",
  "Just follow your heart.",
  "Sometimes, purposely get lost.",
  "Trust is the most important condition for love.",
  "Eventually, everything will be okay.",
  "Don't be afraid. What more can you do other than die?",
  "Do what you have to do.",
  "It goes without saying, but without failure, there is no success.",
  "Experience everyday life from the perspective of a traveler.",
  "Take a moment to envision yourself 20 years from now.",
  "Act opposite to your usual self.",
  "Help someone without expecting anything in return.",
  "What did you eat for breakfast two days ago?",
  "Think of the people you should be grateful for.",
  "How about watching a movie you used to love tonight?",
  "Sincerely congratulate someone who has encountered good luck. You never know, such luck might come to you too.",
];

export const readme = {
  lastUpdated: {
    text: {
      KO: "최근 업데이트: 2023년 7월 26일",
      EN: "Last Updated: 2023-07-26",
    },
  },
  techStack: {
    text: {
      KO: "*Tech Stack ⚙️",
      EN: "*테크 스텍 ⚙️",
    },
  },
  blog: {
    title: {
      EN: "1. Blog ✍️",
      KO: "1. 블로그 ✍️",
    },
    text: {
      KO: "자유롭게 글을 써서 올린 공간이 필요해 만든 페이지입니다. 이미지보다는 텍스트를 중심으로 업로드하기 위해, 웹이지만 책과 유사한 형태의 레이아웃을 구성했습니다.",
      EN: "This page was created to provide a space for writing and posting freely. It features a layout similar to a book, focusing more on text than images, despite being a web page.",
    },
  },
  cinephile: {
    title: {
      EN: "2. Cinephile Test 🍿",
      KO: "2. 시네필 테스트 🍿",
    },
    text: {
      KO: "영화 퀴즈를 풀 수 있는 페이지입니다. 문제를 다 풀고 나면 나의 시네필 별점과 내가 전체 참가자 중 몇 등인지 알 수 있고, 페이지를 공유할 수 있습니다.",
      EN: "Test This page allows you to take quizzes about movies. After answering the questions, you can see your cinephile rating and your rank among all participants. You can also share the page.",
    },
  },
  pomodoro: {
    title: {
      EN: "3. Pomodoro 🐑",
      KO: "3. 뽀모도로 🐑",
    },
    text: {
      KO: "몇 년 전부터 생산성 향상을 위한 아이템으로 인기를 끈 뽀모도로 타이머를 웹으로 구현했습니다. 사용자가 원하는 대로 하루 목표량, 집중 및 휴식 시간을 설정할 수 있습니다.",
      EN: "I have implemented a web version of the popular Pomodoro timer, which has been popular as a productivity tool for several years. Users can set their daily goals, as well as focus and rest times according to their preferences.",
    },
  },
  fruits: {
    title: {
      KO: "4. 과일 생성기 🍇",
      EN: "4. Fruit Generator 🍇",
    },
    text: {
      KO: "페이지 상단에서 과일이 무한하게 생성되며 하강합니다. 특정 과일을 클릭하면 해당 과일에 대한 재밌고 유용한 정보가 화면에 나타납니다.",
      EN: "Fruits are continuously generated from the top of the page and descend. When you click on your favorite fruit, interesting or useful information about that fruit appears on the screen.",
    },
  },
  sentenceGenerator: {
    title: {
      KO: "5. 문장 생성기 🌈",
      EN: "5. Sentence Generator 🌈",
    },
    text: {
      KO: "2023 프라이드 먼스를 기념해 만든 페이지로, 미리 입력해둔 주어와 목적어, 동사가 경우의 수에 따라 랜덤하게 조합되며 다양한 문장을 만들어냅니다.",
      EN: "This page was created to commemorate the 2023 Pride Month. Predefined subjects, objects, and verbs are randomly combined to generate various sentences, depending on the circumstances.",
    },
  },
  music: {
    title: {
      KO: "0. 카버 차트 🎶",
      EN: "0. Carver Chart 🎶",
    },
    text: {
      KO: "현재 작업 중인 프로젝트로, 좋아하는 음반을 소개하는 페이지입니다. 스포티파이에서 제공하는 API를 활용해 음반 정보, 짧은 글을 함께 업로드합니다. 관리자 페이지에서 암호를 입력하면 글을 쓰거나 수정, 삭제할 수 있습니다. 관련 데이터는 모두 MongoDB에 저장해두었습니다.",
      EN: "The project I'm currently working on is a page that introduces favorite albums. It utilizes the Spotify API to upload album information along with short write-ups. When the administrator enters a password on the management page, they can write, modify, or delete the write-ups. All relevant data is stored in MongoDB.",
    },
  },
};
