"use client";
import { useSearchParams } from "next/navigation";
import { useFieldConfig } from "./use-field-config";

export const useFilter = (): Record<string, string> => {
  const searchParams = useSearchParams();
  const fieldConfig = useFieldConfig();

  return Object.keys(fieldConfig).reduce(
    (acc, key) => {
      const queryValue = searchParams.get(key);
      if (queryValue) {
        acc[key] = queryValue;
      }

      return acc;
    },
    {} as Record<string, string>,
  );
};
