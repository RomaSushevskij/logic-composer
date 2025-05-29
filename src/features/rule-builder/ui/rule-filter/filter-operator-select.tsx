import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import type { TOption } from "@/shared/types/options";

import type { TRuleFilter } from "../../model/types";
import { filterOperatorsMapper } from "../../lib/filter-operators-mapper";

const defaultOptions: TOption<TRuleFilter["operator"]>[] = [
  { value: "equals", label: filterOperatorsMapper.equals },
  { value: "notEquals", label: filterOperatorsMapper.notEquals },
  { value: "isAfter", label: filterOperatorsMapper.isAfter },
  { value: "isBefore", label: filterOperatorsMapper.isBefore },
];

export const FilterOperatorSelect = ({
  value,
  onChange,
  filterId,
  filterField,
  disabled,
}: {
  value: TRuleFilter["operator"];
  filterId: TRuleFilter["id"];
  onChange: (role: TRuleFilter["operator"]) => void;
  filterField: TRuleFilter["field"];
  disabled?: boolean;
}) => {
  const [options, setOptions] = useState<TOption<TRuleFilter["operator"]>[]>(() => defaultOptions);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TRuleFilter["operator"]);
  };

  useEffect(() => {
    switch (filterField) {
      case "gender":
      case "channel": {
        setOptions([
          { value: "equals", label: filterOperatorsMapper.equals },
          { value: "notEquals", label: filterOperatorsMapper.notEquals },
        ]);
        break;
      }
      case "birthdate": {
        setOptions(defaultOptions);
        break;
      }
      default: {
        setOptions(defaultOptions);
      }
    }
  }, [filterField]);

  const labelId = `filter-operator-select-label-${filterId}`;
  const id = `filter-operator-select-${filterId}`;
  const label = "Operator";

  return (
    <Box flexDirection={"column"} rowGap={0.5}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          size={"small"}
          value={value}
          onChange={handleChange}
          labelId={labelId}
          id={id}
          label={label}
          disabled={disabled}
        >
          {options.map(({ value, label }) => {
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
