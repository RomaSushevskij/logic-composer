import { Box } from "@mui/material";
import { RuleBuilder, useRuleBuilder } from "@/features/rule-builder";

export const App = () => {
  const { data, setData } = useRuleBuilder();

  return (
    <Box sx={{ p: 10 }}>
      <RuleBuilder data={data} setData={setData} />
    </Box>
  );
};
