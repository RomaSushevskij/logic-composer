import type { TOption } from "@/shared/types/options";

import Select, { type SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import type { TFilterGender, TRuleFilter } from "../../model/types";
import { filterGendersMapper } from "../../lib/filter-genders-mapper";

const options: TOption<TFilterGender>[] = [
  { value: "male", label: filterGendersMapper.male },
  { value: "female", label: filterGendersMapper.female },
];

export const FilterGenderSelect = ({
  value,
  onChange,
  filterId,
  disabled,
}: {
  value: TFilterGender;
  filterId: TRuleFilter["id"];
  onChange: (role: TFilterGender) => void;
  disabled?: boolean;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TFilterGender);
  };

  const labelId = `filter-gender-select-label-${filterId}`;
  const id = `filter-gender-select-${filterId}`;
  const label = "Value";

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
