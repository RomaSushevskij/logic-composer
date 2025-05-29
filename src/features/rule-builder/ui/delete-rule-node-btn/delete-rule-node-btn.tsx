import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDialogs } from "@toolpad/core/useDialogs";

export const DeleteRuleNodeBtn = ({
  onClick,
  confirmMessage,
  disabled,
}: {
  onClick: () => void;
  confirmMessage: string;
  disabled?: boolean;
}) => {
  const dialogs = useDialogs();
  const handleDeleteFilter = async () => {
    const isDeleteConfirmed = await dialogs.confirm(confirmMessage, {
      okText: "Delete",
      cancelText: "Cancel",
      title: "",
    });

    if (isDeleteConfirmed) {
      onClick();
    }
  };

  return (
    <IconButton onClick={handleDeleteFilter} size={"small"} disabled={disabled}>
      <DeleteIcon fontSize={"small"} />
    </IconButton>
  );
};
