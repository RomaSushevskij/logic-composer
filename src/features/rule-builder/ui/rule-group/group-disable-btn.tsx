import BlockIcon from "@mui/icons-material/Block";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import type { TRuleGroup } from "../../model/types";

export const GroupDisableBtn = ({
  onClick,
  groupDisabled,
}: {
  onClick: () => void;
  groupDisabled: TRuleGroup["disabled"];
}) => {
  const button = (
    <Button
      size={"small"}
      onClick={onClick}
      variant={groupDisabled ? "contained" : "text"}
      sx={{ p: 1, width: 30, height: 30, minWidth: 0, borderRadius: "50%" }}
    >
      <BlockIcon fontSize={"small"} />
    </Button>
  );

  if (groupDisabled) {
    return (
      <Badge badgeContent={"Draft"} color={"warning"}>
        {button}
      </Badge>
    );
  }

  return button;
};
