"use client";

interface IndexProps {
  language: string;
}

export default function About({ language }: IndexProps) {
  return (
    <>
      <div className="index-about-container">
        <ul style={{ lineHeight: "200%" }}>
          <li>
            {language === "A"
              ? "I am working as a web developer in Seoul."
              : "서울에서 웹 개발자로 활동하고 있습니다."}
          </li>
          <li>
            {language === "A"
              ? "I am interested in creating clean interfaces and interesting web pages."
              : "간결한 인터페이스와 흥미로운 페이지를 만드는 데 관심이 있습니다."}
          </li>

          <li>
            {language === "A"
              ? "I am also exploring ways to survive in the age of AI."
              : "AI로부터 살아남기 위한 방법을 찾고 있습니다."}
          </li>
        </ul>
      </div>
    </>
  );
}
