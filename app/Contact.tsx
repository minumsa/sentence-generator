"use client";

interface PageProps {
  language: string;
}

export default function Contact({ language }: PageProps) {
  return (
    <div className="index-contact-container">
      <a
        href="https://github.com/minumsa"
        target="_blank"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <div className="index-contact-text-1">
          {language === "A" ? "GitHub" : "깃허브"}
        </div>
      </a>
      <a
        href="mailto:carver1014@kakao.com"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <div className="index-contact-text-2">
          {language === "A" ? "E-mail" : "이메일"}
        </div>
      </a>
    </div>
  );
}
