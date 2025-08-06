import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePaginationState(page = "page") {
  const [searchParams, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get(page)) {
      setSearchParam((prevParams) => {
        prevParams.set(page, "1");
        return prevParams;
      });
    }

    if (!searchParams.get("pageSize")) {
      setSearchParam((prevParams) => {
        prevParams.set("pageSize", "5");
        return prevParams;
      });
    }
  }, [searchParams]);

  return {
    page: Number(searchParams.get(page)) ?? 1,
    pageSize: Number(searchParams.get("pageSize")) ?? 10,
  };
}
