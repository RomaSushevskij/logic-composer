import { styled } from "@mui/material";
import Switch from "@mui/material/Switch";

import type { TRuleGroup } from "../../model/types";

const StyledSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== "combinator",
})<{ combinator: "AND" | "OR" }>(({ combinator, theme, disabled }) => {
  const defineColor = (combinator: TRuleGroup["combinator"]) => {
    switch (combinator) {
      case "AND": {
        return theme.palette.primary.light;
      }
      case "OR": {
        return theme.palette.success.light;
      }
    }
  };

  const color = defineColor(combinator);

  return {
    width: 60,
    height: 28,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(28px)",
        "& + .MuiSwitch-track": {
          backgroundColor: color,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: color,
      width: 26,
      height: 26,
      position: "relative",
      opacity: disabled ? 0.5 : 1,
      "&::after": {
        content: `"${combinator}"`,
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 10,
        fontWeight: "bold",
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 20 / 2,
      backgroundColor: color,
    },
  };
});

export const RuleCombinatorSwitch = ({
  combinator,
  onChange,
  disabled,
}: {
  combinator: TRuleGroup["combinator"];
  onChange: (newCombinator: TRuleGroup["combinator"]) => void;
  disabled?: boolean;
}) => {
  const checked = combinator === "OR";

  const handleChange = () => {
    onChange(checked ? "AND" : "OR");
  };

  return (
    <StyledSwitch
      combinator={combinator}
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
