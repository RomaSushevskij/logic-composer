import { type Dispatch, type SetStateAction } from "react";

import type { TRuleGroup } from "../model/types";
import { generateGroup } from "../model/data";
import { RuleGroup } from "./rule-group/rule-group";

export const RuleBuilder = ({
  data,
  setData,
}: {
  data: TRuleGroup;
  setData: Dispatch<SetStateAction<TRuleGroup>>;
}) => {
  return (
    <RuleGroup
      isRoot
      groupData={data}
      onChange={setData}
      onDelete={() => setData(generateGroup())}
    />
  );
};
