import { createContext } from "react";

export const LanguageContext = createContext<Language>("en");

export interface Weather {
  icon: string | null;
  temp: number | null;
}

export const fetchData = async (setWeather: React.Dispatch<React.SetStateAction<Weather>>) => {
  try {
    const apiKey = "a363f14d94f369a4d926a27d5d44fc60";
    const seoulWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&lang=kr`
    );
    if (!seoulWeatherResponse.ok) {
      throw "weather fetch failed";
    }
    const data = await seoulWeatherResponse.json();
    setWeather({ icon: data.weather[0].icon, temp: data.main.temp });
  } catch (error) {
    console.error("Error fetching city data:", error);
  }
};

export const fortune = {
  ko: [
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
  ],
  en: [
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
  ],
};

export const readme = {
  lastUpdated: {
    text: {
      ko: "최근 업데이트: 2023년 10월 4일",
      en: "Last Updated: 2023-10-04",
    },
  },
  techStack: {
    title: {
      ko: "Technical",
      en: "테크 스텍",
    },
    text: {
      ko: "TypeScript, CSS, Next.js, React",
      en: "TypeScript, CSS, Next.js, React",
    },
    emoji: "⚙️",
  },
  blog: {
    title: {
      en: "Blog",
      ko: "블로그",
    },
    text: {
      ko: "자유롭게 글을 써서 올린 공간이 필요해 만든 페이지입니다. 이미지보다는 텍스트를 중심으로 업로드하기 위해, 웹이지만 책과 유사한 형태의 레이아웃을 구성했습니다.",
      en: "This page was created to provide a space for writing and posting freely. It features a layout similar to a book, focusing more on text than images, despite being a web page.",
    },
    emoji: "✍️",
  },
  music: {
    title: {
      ko: "카버 차트",
      en: "Carver Chart",
    },
    text: {
      ko: "좋아하는 음반을 소개하는 페이지입니다. 스포티파이에서 제공하는 API를 활용해 음반 정보, 짧은 글을 함께 업로드합니다. 관리자 페이지에서 암호를 입력하면 글을 쓰거나 수정, 삭제할 수 있습니다. 관련 데이터는 모두 MongoDB에 저장했습니다.",
      en: "This is a page where you can introduce your favorite albums. It utilizes the API provided by Spotify to upload album information and short descriptions. On the admin page, you can enter a password to write, edit, or delete posts. All related data is stored in MongoDB.",
    },
    emoji: "🎶",
  },
  barbershop: {
    title: {
      ko: "바버샵 파인더",
      en: "Barbershop Finder",
    },
    text: {
      ko: "검색어를 입력하면 해당 지역에 있는 바버샵을 찾아줍니다. 화면 좌측에는 바버샵 검색 결과를 리스트 형태로 보여주는 메인 탭, 우측에는 네이버 지도 API가 제공됩니다. 지도의 핀을 클릭하면 바버샵에 관한 간단한 정보가 모달 창으로 표시되며, 더보기를 누르면 상세 탭으로 이동합니다.",
      en: "When you enter a search term, this page will help you find barbershops in the respective area. The main tab on the left of this page displays barbershop search results in a list format, while on the right, the Naver Maps API is provided. Clicking on a pin on the map will display basic information about the barbershop in a modal window, and clicking 'More' will take you to the detailed tab.",
    },
    emoji: "💈",
  },
  cinephile: {
    title: {
      en: "Cinephile Test",
      ko: "시네필 테스트",
    },
    text: {
      ko: "영화 퀴즈를 풀 수 있는 페이지입니다. 문제를 다 풀고 나면 나의 시네필 별점과 내가 전체 참가자 중 몇 등인지 알 수 있고, 페이지를 공유할 수 있습니다.",
      en: "Test This page allows you to take questionzes about movies. After answering the questions, you can see your cinephile rating and your rank among all participants. You can also share the page.",
    },
    emoji: "🍿",
  },
  fruits: {
    title: {
      ko: "과일 생성기",
      en: "Fruit Generator",
    },
    text: {
      ko: "페이지 상단에서 과일이 무한하게 생성되며 하강합니다. 특정 과일을 클릭하면 해당 과일에 대한 재밌고 유용한 정보가 화면에 나타납니다.",
      en: "Fruits are continuously generated from the top of the page and descend. When you click on your favorite fruit, interesting or useful information about that fruit appears on the screen.",
    },
    emoji: "🍇",
  },
  words: {
    title: {
      ko: "직유법",
      en: "Sentence Generator",
    },
    text: {
      ko: "데이터베이스에 있는 약 100개의 단어들이 경우의 수에 따라 랜덤하게 조합되며 화면에 다양한 직유법을 만들어냅니다.",
      en: "About 100 words in the database are randomly combined based on various possibilities to create different scenarios.",
    },
    emoji: "🌈",
  },
};

export const iconTitle = {
  blog: {
    en: "Blog",
    ko: "블로그",
  },
  music: {
    en: "Carver Chart",
    ko: "카버 차트",
  },
  barbershop: {
    en: "Barbershop",
    ko: "바버샵 찾기",
  },
  cinephile: {
    en: "Cinephile",
    ko: "시네필 테스트",
  },
  fruits: {
    en: "Fruits",
    ko: "과일 생성기",
  },
  words: {
    en: "Sentence Generator",
    ko: "문장 생성기",
  },
  cat: {
    en: "cat.webp",
    ko: "고양이.webp",
  },
  me: {
    en: "me.webp",
    ko: "나.webp",
  },
  fortune: {
    en: "fortune.exe",
    ko: "포춘쿠키.exe",
  },
  readme: {
    en: "README.txt",
    ko: "프로젝트.txt",
  },
};

export type Language = "en" | "ko";
