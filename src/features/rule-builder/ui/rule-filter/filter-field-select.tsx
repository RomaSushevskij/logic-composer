import Select, { type SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import type { TOption } from "@/shared/types/options";

import { filterFieldsMapper } from "../../lib/filter-fields-mapper";
import type { TRuleFilter } from "../../model/types";

const options: TOption<TRuleFilter["field"]>[] = [
  { value: "gender", label: filterFieldsMapper.gender },
  { value: "birthdate", label: filterFieldsMapper.birthdate },
  { value: "channel", label: filterFieldsMapper.channel },
];

export const FilterFieldSelect = ({
  value,
  onChange,
  filterId,
  disabled,
}: {
  value: TRuleFilter["field"];
  filterId: TRuleFilter["id"];
  onChange: (role: TRuleFilter["field"]) => void;
  disabled?: boolean;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TRuleFilter["field"]);
  };

  const labelId = `filter-field-select-label-${filterId}`;
  const id = `filter-field-select-${filterId}`;
  const label = "Field";

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
