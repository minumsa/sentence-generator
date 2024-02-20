import { isMobile } from "react-device-detect";

export const LinkIcon = () => {
  return (
    <span>
      <img
        src="/music/link.svg"
        alt="link-icon"
        style={{
          position: "absolute",
          marginLeft: "3px",
          marginTop: isMobile ? "4px" : "6px",
          height: "20px",
        }}
      ></img>
    </span>
  );
};
