import type { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Box from "@mui/material/Box";

import type { TRuleNode } from "../../model/types";

export const SortableRuleNode = ({
  children,
  isDragActive,
  isDragOverlay,
  data,
  disabled,
}: PropsWithChildren<{
  data: TRuleNode;
  isDragOverlay?: boolean;
  isDragActive?: boolean;
  disabled?: boolean;
}>) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: data.id,
    disabled: isDragOverlay || disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragActive && !isDragOverlay ? 0 : 1,
  };

  return (
    <Paper ref={setNodeRef} style={style} elevation={isDragOverlay ? 10 : 1}>
      <Stack flexDirection={"row"}>
        <Stack
          sx={{
            py: 0.75,
            px: 0.25,
            cursor: disabled ? "auto" : "move",
            bgcolor: "primary",
            borderRadius: 1,
          }}
          justifyContent={"center"}
          {...(isDragOverlay ? {} : listeners)}
          {...(isDragOverlay ? {} : attributes)}
          onClick={(event) => event.stopPropagation()}
        >
          <DragIndicatorIcon fontSize={"small"} sx={{ opacity: disabled ? 0.5 : 1 }} />
        </Stack>
        <Box flexGrow={1}>{children}</Box>
      </Stack>
    </Paper>
  );
};
