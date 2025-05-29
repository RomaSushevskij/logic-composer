import type { TRuleFilter, TRuleGroup } from "@/features/rule-builder/model/types";

export const initNewGroup: TRuleGroup = {
  id: crypto.randomUUID(),
  title: "New Group",
  type: "group",
  combinator: "AND",
  disabled: false,
  collapsed: false,
  locked: false,
  children: [],
};

export const initRuleFilter: TRuleFilter = {
  id: crypto.randomUUID(),
  type: "filter",
  field: "gender",
  operator: "equals",
  value: "female",
};

export const initialData: TRuleGroup = {
  id: crypto.randomUUID(),
  title: "Main Group",
  type: "group",
  combinator: "AND",
  disabled: false,
  locked: false,
  collapsed: false,
  children: [
    {
      id: crypto.randomUUID(),
      title: "Subgroup 1",
      type: "group",
      combinator: "OR",
      disabled: false,
      locked: false,
      collapsed: false,
      children: [
        {
          id: crypto.randomUUID(),
          type: "filter",
          field: "gender",
          operator: "equals",
          value: "female",
        },
        {
          id: crypto.randomUUID(),
          type: "filter",
          field: "channel",
          operator: "notEquals",
          value: "email",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      type: "filter",
      field: "gender",
      operator: "equals",
      value: "female",
    },
    {
      id: crypto.randomUUID(),
      title: "Subgroup 2",
      type: "group",
      combinator: "OR",
      disabled: false,
      locked: false,
      collapsed: false,
      children: [
        {
          id: crypto.randomUUID(),
          type: "filter",
          field: "gender",
          operator: "equals",
          value: "female",
        },
        {
          id: crypto.randomUUID(),
          type: "filter",
          field: "channel",
          operator: "notEquals",
          value: "email",
        },
      ],
    },
  ],
};
