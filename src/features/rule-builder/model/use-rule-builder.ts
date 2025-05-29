import { useState } from "react";

import type { TRuleGroup } from "./types";
import { generateGroup } from "./data";

export const useRuleBuilder = () => {
  const [data, setData] = useState<TRuleGroup>(() => generateGroup());

  return { data, setData };
};
