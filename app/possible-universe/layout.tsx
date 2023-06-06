import React from "react";
import RandomSentenceGenerator from "./RandomSentenceGenerator";

type Props = {
  children: React.ReactNode;
};

// function TestLayout({ children }: Props) {
function TestLayout() {
  return (
    <div>
      <RandomSentenceGenerator
        initialSubject={"Pride"}
        initialObject={"Month"}
        initialVerb={"2023"}
      />
      {/* <div className="w-full">{children}</div> */}
    </div>
  );
}

export default TestLayout;
