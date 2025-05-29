import Select, { type SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import type { TOption } from "@/shared/types/options";

import type { TFilterChannel, TRuleFilter } from "../../model/types";
import { filterChannelsMapper } from "../../lib/filter-channels-mapper";

const options: TOption<TFilterChannel>[] = [
  { value: "telegram", label: filterChannelsMapper.telegram },
  { value: "whatsapp", label: filterChannelsMapper.whatsapp },
  { value: "viber", label: filterChannelsMapper.viber },
  { value: "email", label: filterChannelsMapper.email },
  { value: "sms", label: filterChannelsMapper.sms },
];

export const FilterChannelSelect = ({
  value,
  onChange,
  filterId,
  disabled,
}: {
  value: TFilterChannel;
  filterId: TRuleFilter["id"];
  onChange: (role: TFilterChannel) => void;
  disabled?: boolean;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TFilterChannel);
  };

  const labelId = `filter-channel-select-label-${filterId}`;
  const id = `filter-channel-select-${filterId}`;
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
