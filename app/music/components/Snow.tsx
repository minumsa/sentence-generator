import Snowfall from "react-snowfall";
import { isMobile } from "react-device-detect";
import styles from "../music.module.css";

export const Snow = () => {
  return (
    <div className={styles["snowfall-container"]}>
      <Snowfall
        snowflakeCount={isMobile ? 90 : 110}
        speed={isMobile ? [0, 2] : [0, 2.5]}
        radius={isMobile ? [0.1, 1.2] : undefined}
      />
    </div>
  );
};
