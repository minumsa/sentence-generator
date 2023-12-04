import "./globals.css";

export const metadata = {
  title: "divdivdiv",
  description: "재밌는 웹페이지를 만듭니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ backgroundColor: "#000" }}>{children}</body>
    </html>
  );
}
