import { SK_TASK_CONFIG } from "@/common/constants";
import { FieldConfig } from "@/common/types/task";
import useLocalState from "@/hooks/use-local-state";

export const useFieldConfig = (): Record<string, FieldConfig> => {
  const [fieldConfig] = useLocalState(SK_TASK_CONFIG, {});

  return fieldConfig;
};
