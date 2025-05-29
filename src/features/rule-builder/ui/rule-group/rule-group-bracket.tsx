import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import type { TRuleGroup } from "../../model/types";

export const RuleGroupBracket = styled(Box, {
  shouldForwardProp: (prop) => prop !== "filterField" && prop !== "groupLocked",
})<{ combinator: TRuleGroup["combinator"]; groupLocked: TRuleGroup["locked"] }>(({
  theme,
  combinator,
  groupLocked,
}) => {
  const defineBorderColor = (combinator: TRuleGroup["combinator"]) => {
    switch (combinator) {
      case "AND": {
        return theme.palette.primary.light;
      }
      case "OR": {
        return theme.palette.success.light;
      }
    }
  };

  const borderRule: string = `2px solid ${defineBorderColor(combinator)}`;
  const borderRadius: number = 6;

  return {
    width: 20,
    borderLeft: borderRule,
    borderTop: borderRule,
    borderBottom: borderRule,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    boxSizing: "border-box",
    opacity: groupLocked ? 0.5 : 1,
  };
});
