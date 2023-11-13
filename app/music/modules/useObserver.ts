import { useEffect, useRef, useState } from "react";

const useObserver = (options = {}) => {
  const [inView, setInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setInView(entry.isIntersecting);
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  // Next.js에서 SSR을 사용할 경우 targetRef가 서버 사이드에서는 유효하지 않을 수 있습니다.
  // 따라서 여기서 체크하여 반환하거나 예외처리를 추가할 수 있습니다.
  if (typeof window === "undefined") {
    // 서버 사이드에서 실행 중이면 빈 배열을 반환하거나 예외 처리를 수행할 수 있습니다.
    return [targetRef, false];
  }

  return [targetRef, inView];
};

export default useObserver;
