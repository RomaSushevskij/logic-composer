import type { TRuleFilter, TRuleGroup } from "@/features/rule-builder/model/types";
import { nanoid } from "nanoid";

export const generateGroup = (): TRuleGroup => {
  return {
    id: nanoid(),
    title: "New Group",
    type: "group",
    combinator: "AND",
    disabled: false,
    collapsed: false,
    locked: false,
    children: [],
  };
};

export const generateFilter = (): TRuleFilter => {
  return {
    id: nanoid(),
    type: "filter",
    field: "gender",
    operator: "equals",
    value: "female",
  };
};
