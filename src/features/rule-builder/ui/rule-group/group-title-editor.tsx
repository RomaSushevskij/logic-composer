import { type KeyboardEvent, type MouseEvent, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { type InputProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import type { TRuleGroup } from "../../model/types";

export const GroupTitleEditor = ({
  groupData,
  onChange,
  disabled,
}: {
  groupData: TRuleGroup;
  onChange: (newTitle: TRuleGroup["title"]) => void;
  disabled?: boolean;
}) => {
  const { title } = groupData;

  const [open, setOpen] = useState(false);
  const [internalTitle, setInternalTitle] = useState(title);

  const handleTitleChange: InputProps["onChange"] = (event) => {
    setInternalTitle(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInternalTitle(title);
  };

  const handleEditBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleOpen();
  };

  const handleOkBtnClick = () => {
    onChange(internalTitle);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOkBtnClick();
    }
  };

  const titleTextFieldRef = useRef<HTMLInputElement | null>(null);

  return (
    <Stack flexDirection={"row"} alignItems={"center"} columnGap={1}>
      <Typography component={"h1"} fontWeight={"bold"}>
        {title}
      </Typography>
      <IconButton size={"small"} onClick={handleEditBtnClick} disabled={disabled}>
        <EditIcon fontSize={"small"} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        onClick={(event) => event.stopPropagation()}
        TransitionProps={{
          onEntered: () => {
            titleTextFieldRef.current?.focus();
          },
        }}
      >
        <DialogContent>
          <Box noValidate component="form" onKeyDown={handleKeyDown}>
            <FormControl margin={"normal"} fullWidth>
              <TextField
                inputRef={titleTextFieldRef}
                value={internalTitle}
                onChange={handleTitleChange}
                label={"Group title"}
                size={"small"}
              />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOkBtnClick}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
