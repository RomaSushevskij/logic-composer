import type { TRuleFilter } from "@/features/rule-builder/model/types";

export const defineFilterByField = ({
  filterNode,
  field,
}: {
  filterNode: TRuleFilter;
  field: TRuleFilter["field"];
}) => {
  switch (field) {
    case "channel":
      return { ...filterNode, field, value: "telegram" };

    case "birthdate":
      return { ...filterNode, field, value: new Date().toISOString() };

    case "gender":
      return { ...filterNode, field, value: "female" };

    default:
      return filterNode;
  }
};
