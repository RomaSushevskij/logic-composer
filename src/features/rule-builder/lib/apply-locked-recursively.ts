import type { TRuleGroup } from "@/features/rule-builder/model/types";

export const applyLockedRecursively = (node: TRuleGroup, locked: boolean): TRuleGroup => {
  return {
    ...node,
    locked,
    children: node.children.map((child) => {
      if (child.type === "filter") {
        return child;
      }

      return applyLockedRecursively(child, locked);
    }),
  };
};
