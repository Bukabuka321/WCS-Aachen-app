import { useEffect, useRef } from "react";

const useOutsideClick = (callback: any) => {
  const ref: any = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);
  return ref;
};

export default useOutsideClick;
