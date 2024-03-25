import { usePathname, useRouter } from "next/navigation";
import styles from "../divdivdiv.module.css";
import { useAtom } from "jotai";
import { languageAtom } from "../modules/data";

interface RenderButtonProps {
  text: string;
  path: any;
}

export function RenderButtonLeft({ text, path }: RenderButtonProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const [language, setLanguage] = useAtom(languageAtom);

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
        router.push(`${path}?language=${language}`);
      }}
    >
      <div>{text}</div>
    </div>
  );
}
