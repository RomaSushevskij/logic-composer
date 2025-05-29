import type { ReactNode } from "react";

import type { TRuleFilter } from "../../model/types";

export const FilterValue = ({
  filterField,
  genderSlot,
  channelSlot,
  birthdaySlot,
}: {
  genderSlot: ReactNode;
  channelSlot: ReactNode;
  birthdaySlot: ReactNode;
  filterField: TRuleFilter["field"];
}) => {
  if (filterField === "gender") {
    return genderSlot;
  }

  if (filterField === "birthdate") {
    return birthdaySlot;
  }

  if (filterField === "channel") {
    return channelSlot;
  }

  return null;
};
