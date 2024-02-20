import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { usePathname, useRouter } from "next/navigation";
import {
  CriteriaType,
  MethodType,
  OrderType,
  criteriaAtom,
  methodAtom,
  sortItems,
} from "../modules/data";
import { useAtom } from "jotai";

interface TopNavProps {
  isVisible?: boolean;
}

export const TopNav = ({ isVisible }: TopNavProps) => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  const pathName = usePathname();
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(methodAtom);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(criteriaAtom);
  const isMainPage = pathName === "/music" || pathName === "/music/admin";

  useEffect(() => {
    pathName.includes("admin") && setIsAdminPage(true);
  }, [pathName]);

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
              // 별점은 관리자 페이지에서만 표시
              if (!isAdminPage && item === "별점") return null;
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
    <div
      className={styles["top-menu-container"]}
      style={{ display: isVisible ? undefined : "none" }}
    >
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
      {isMainPage ? undefined : (
        <>
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
        </>
      )}
    </div>
  );
};
