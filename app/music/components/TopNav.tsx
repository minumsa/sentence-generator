import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { usePathname, useRouter } from "next/navigation";
import {
  CriteriaType,
  MethodType,
  OrderType,
  initialCriteria,
  initialMethod,
  sortItems,
} from "../modules/data";
import { useAtom } from "jotai";

export const TopNav = () => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  const fullPathName = usePathname();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  // TODO: 나중에 정규식 표현 블로그 정리
  const pathNameWithoutPageNumber = fullPathName.replace(/\/\d+$/, "");
  const [keyword, setKeyword] = useState("");
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);

  // const slicedPathName = fullPathName
  //   .split("/")
  //   .map((path, index) => {
  //     const firstOrlastIndex =
  //       index > fullPathName.split("/").length - 2 && isNaN(Number(path)) === false;
  //     if (!firstOrlastIndex) return `${path}/`;
  //   })
  //   .join("");
  // console.log(slicedPathName);

  useEffect(() => {
    fullPathName.includes("search") && setIsSearchPage(true);
    fullPathName.includes("admin") && setIsAdminPage(true);
  }, []);

  async function handleSearch() {
    isAdminPage
      ? router.push(`/music/admin/search/${keyword}/1`)
      : router.push(`/music/search/${keyword}/1`);
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMouseEnter = (type: OrderType) => {
    if (type === "method") {
      setSortMethod(true);
    } else if (type === "criteria") {
      setSortCriteria(true);
    }
  };

  const handleMouseLeave = (type: OrderType) => {
    if (type === "method") {
      setSortMethod(false);
    } else if (type === "criteria") {
      setSortCriteria(false);
    }
  };

  const SortButton = ({
    type,
    sortItem,
    currentOrder,
    setCurrentOrder,
    sortWay,
  }: {
    type: OrderType;
    sortItem: MethodType[] | CriteriaType[];
    currentOrder: MethodType | CriteriaType;
    setCurrentOrder: React.Dispatch<React.SetStateAction<MethodType | CriteriaType>>;
    sortWay: boolean;
  }) => {
    return (
      <div
        className={styles["sort-criteria-container"]}
        onMouseEnter={() => {
          handleMouseEnter(type);
        }}
        onMouseLeave={() => {
          handleMouseLeave(type);
        }}
      >
        {`${currentOrder} ▾`}
        {sortWay && (
          <div
            className={styles["sort-criteria"]}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => {
              handleMouseEnter(type);
            }}
          >
            {sortItem.map((item: MethodType | CriteriaType) => {
              // 평점은 관리자 페이지에서만 표시
              if (!isAdminPage && item === "평점") return null;
              return (
                <div
                  className={styles["criteria"]}
                  key={item}
                  onClick={() => {
                    setCurrentOrder(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles["top-menu-container"]}>
      <div className={styles["top-search-container"]}>
        {isSearching && (
          <input
            className={styles["top-search-input"]}
            placeholder="검색어를 입력해주세요"
            onChange={e => {
              setKeyword(e.target.value);
            }}
            onKeyDown={handleEnter}
          />
        )}
      </div>
      <div
        className={styles["top-magnifying-glass"]}
        onClick={() => {
          setIsSearching(!isSearching);
        }}
      ></div>
      <SortButton
        type="method"
        sortItem={sortItems.method}
        currentOrder={currentMethod}
        setCurrentOrder={setCurrentMethod}
        sortWay={sortMethod}
      />
      <SortButton
        type="criteria"
        sortItem={sortItems.criteria}
        currentOrder={currentCriteria}
        setCurrentOrder={setCurrentCriteria}
        sortWay={sortCriteria}
      />
    </div>
  );
};
