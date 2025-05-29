import { DatePicker } from "@mui/x-date-pickers";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

export const FilterBirthday = ({
  value,
  onChange,
  disabled,
}: {
  value: PickerValue;
  onChange: (value: PickerValue) => void;
  disabled?: boolean;
}) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      slotProps={{ textField: { size: "small" } }}
      label="Value"
      format="DD.MM.YYYY"
      disabled={disabled}
      maxDate={dayjs(new Date())}
    />
  );
};
