import { usePathname, useRouter } from "next/navigation";
import styles from "../divdivdiv.module.css";

interface RenderButtonProps {
  text: string;
  path: string;
}

export function RenderButtonLeft({ text, path }: RenderButtonProps) {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div
      className={styles["button-left"]}
      style={
        path === currentPath
          ? {
              fontWeight: "600",
            }
          : undefined
      }
      onClick={() => {
        router.push(path);
      }}
    >
      <div>{text}</div>
    </div>
  );
}
