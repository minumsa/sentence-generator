"use client";

interface IndexProps {
  language: string;
  isDarkMode: any;
}

export default function Contact({ language, isDarkMode }: IndexProps) {
  return (
    <div className="index-contact-container">
      <a
        href="https://github.com/minumsa"
        target="_blank"
        style={
          isDarkMode
            ? { textDecoration: "none", color: "#ffffff" }
            : { textDecoration: "none", color: "#000000" }
        }
      >
        <div className="index-contact-text-1">
          {language === "A" ? "GitHub" : "깃허브"}
        </div>
      </a>
      <a
        href="mailto:carver1014@kakao.com"
        style={
          isDarkMode
            ? { textDecoration: "none", color: "#ffffff" }
            : { textDecoration: "none", color: "#000000" }
        }
      >
        <div className="index-contact-text-2">
          {language === "A" ? "E-mail" : "이메일"}
        </div>
      </a>
    </div>
  );
}
