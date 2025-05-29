import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import type { TRuleGroup } from "../../model/types";

export const GroupLockBtn = ({
  onClick,
  groupLocked,
}: {
  onClick: () => void;
  groupLocked: TRuleGroup["locked"];
}) => {
  const button = (
    <Button
      size={"small"}
      onClick={onClick}
      variant={groupLocked ? "contained" : "text"}
      sx={{ p: 1, width: 30, height: 30, minWidth: 0, borderRadius: "50%" }}
    >
      <LockOutlinedIcon fontSize={"small"} />
    </Button>
  );

  if (groupLocked) {
    return (
      <Badge badgeContent={"Locked"} color={"warning"}>
        {button}
      </Badge>
    );
  }
  return button;
};
