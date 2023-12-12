import { useState } from "react";
import styles from "../music.module.css";
import { useRouter } from "next/navigation";
import { CriteriaType, MethodType, OrderType, sortItems } from "../modules/data";

interface TopNavProps {
  pathName: string;
  isAdminPage: boolean;
  keyword: string;
  currentKeyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  currentMethod: MethodType;
  setCurrentMethod: React.Dispatch<React.SetStateAction<CriteriaType | MethodType>>;
  currentCriteria: CriteriaType;
  setCurrentCriteria: React.Dispatch<React.SetStateAction<CriteriaType | MethodType>>;
}

export const TopNav = ({
  pathName,
  isAdminPage,
  keyword,
  currentKeyword,
  setKeyword,
  currentMethod,
  setCurrentMethod,
  currentCriteria,
  setCurrentCriteria,
}: TopNavProps) => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<boolean>(false);

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

  const SortToggleButton = ({
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
              return (
                <div
                  className={styles["criteria"]}
                  key={item}
                  onClick={() => {
                    // const hasNoPageNumber = isNaN(Number(fullPathName.split("").at(-1)));
                    // const variablePathByNumber = hasNoPageNumber ? 1 : "/";
                    setCurrentOrder(item);
                    isAdminPage
                      ? router.push(`/music/admin/${pathName}/${currentKeyword}/1`)
                      : router.push(`/music/${pathName}/${currentKeyword}/1`);
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
          ></input>
        )}
      </div>
      <div
        className={styles["top-magnifying-glass"]}
        onClick={() => {
          setIsSearching(!isSearching);
        }}
      ></div>
      <SortToggleButton
        type="method"
        sortItem={sortItems.method}
        currentOrder={currentMethod}
        setCurrentOrder={setCurrentMethod}
        sortWay={sortMethod}
      />
      <SortToggleButton
        type="criteria"
        sortItem={sortItems.criteria}
        currentOrder={currentCriteria}
        setCurrentOrder={setCurrentCriteria}
        sortWay={sortCriteria}
      />
    </div>
  );
};
