import { useState } from "react";

import type { TRuleGroup } from "./types";
import { initialData } from "./data";

export const useRuleBuilder = () => {
  const [data, setData] = useState<TRuleGroup>(() => initialData);

  return { data, setData };
};
