import { TSearchParamValues } from "@/lib/types";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = <K extends keyof TSearchParamValues>(
    key: K,
    value: TSearchParamValues[K]
  ) => {
    setSearchParams((prevParams) => {
      prevParams.set(key, value);
      return prevParams;
    });
  };

  return { searchParams, updateSearchParam };
};

