import React from "react";
import Test2 from "./Test2";

type Props = {
  children: React.ReactNode;
};

// function TestLayout({ children }: Props) {
function TestLayout() {
  return (
    <div>
      <Test2 />
      {/* <div className="w-full">{children}</div> */}
    </div>
  );
}

export default TestLayout;
