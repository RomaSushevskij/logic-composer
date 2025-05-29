import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

import { defineFilterByField } from "../../lib/define-filter-by-field";
import { FilterFieldSelect } from "../rule-filter/filter-field-select";
import { FilterOperatorSelect } from "../rule-filter/filter-operator-select";
import { FilterGenderSelect } from "../rule-filter/filter-gender-select";
import { FilterChannelSelect } from "../rule-filter/filter-channel-select";
import { FilterBirthday } from "../rule-filter/filter-birthday";
import { FilterValue } from "../rule-filter/filter-value";
import { DeleteRuleNodeBtn } from "../delete-rule-node-btn/delete-rule-node-btn";
import type { TFilterChannel, TFilterGender, TRuleFilter } from "../../model/types";

export const RuleFilter = ({
  data,
  onChange,
  disabled = false,
  onDelete,
}: {
  data: TRuleFilter;
  onChange: (filterNode: TRuleFilter) => void;
  onDelete: () => void;
  disabled?: boolean;
}) => {
  const { id, field, operator, value } = data;

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        display={"grid"}
        gridTemplateColumns={"1fr 1fr 1fr max-content"}
        gridTemplateRows={"max-content"}
        columnGap={2}
      >
        <FilterFieldSelect
          filterId={id}
          value={field}
          onChange={(field) => onChange(defineFilterByField({ filterNode: data, field }))}
          disabled={disabled}
        />

        <FilterOperatorSelect
          filterField={field}
          filterId={id}
          value={operator}
          onChange={(operator) => onChange({ ...data, operator })}
          disabled={disabled}
        />

        <FilterValue
          genderSlot={
            <FilterGenderSelect
              filterId={id}
              value={value as TFilterGender}
              onChange={(gender) => onChange({ ...data, value: gender })}
              disabled={disabled}
            />
          }
          channelSlot={
            <FilterChannelSelect
              filterId={id}
              value={value as TFilterChannel}
              onChange={(channel) => onChange({ ...data, value: channel })}
              disabled={disabled}
            />
          }
          birthdaySlot={
            <FilterBirthday
              value={dayjs(data.value)}
              onChange={(birthday) =>
                onChange({
                  ...data,
                  value: birthday?.toISOString() || "",
                })
              }
              disabled={disabled}
            />
          }
          filterField={field}
        />

        <Stack justifyContent={"center"}>
          {
            <DeleteRuleNodeBtn
              onClick={onDelete}
              confirmMessage={"Are you sure you want to remove the filter?"}
              disabled={disabled}
            />
          }
        </Stack>
      </Stack>
    </Box>
  );
};
