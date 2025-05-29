import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SchemaIcon from "@mui/icons-material/Schema";
import Box from "@mui/material/Box";

import { RuleFilter } from "../rule-filter/rule-filter";
import { RuleCombinatorSwitch } from "../rule-group/rule-combinator-switch";
import { RuleGroupBracket } from "../rule-group/rule-group-bracket";
import { DeleteRuleNodeBtn } from "../delete-rule-node-btn/delete-rule-node-btn";
import { GroupTitleEditor } from "../rule-group/group-title-editor";
import { GroupDisableBtn } from "../rule-group/group-disable-btn";
import { GroupLockBtn } from "../rule-group/group-lock-btn";
import { GroupAccordion } from "../rule-group/group-accordion";
import { SortableRuleNodes } from "../sortable-rule-nodes/sortable-rule-nodes";
import { applyLockedRecursively } from "../../lib/apply-locked-recursively";
import type { TRuleGroup, TRuleNode } from "../../model/types";
import { initNewGroup, initRuleFilter } from "../../model/data";

export const RuleGroup = ({
  groupData,
  isRoot = false,
  onChange,
  onDelete,
}: {
  groupData: TRuleGroup;
  isRoot?: boolean;
  onChange: (ruleGroup: TRuleGroup) => void;
  onDelete: () => void;
}) => {
  const { combinator, disabled, locked, collapsed } = groupData;

  const handleAddFilter = () => {
    onChange({ ...groupData, children: [...groupData.children, initRuleFilter] });
  };

  const handleAddGroup = () => {
    onChange({ ...groupData, children: [...groupData.children, initNewGroup] });
  };

  const handleGroupLockedToggle = (locked: TRuleGroup["locked"]) => {
    const updatedGroup = applyLockedRecursively(groupData, locked);
    onChange(updatedGroup);
  };

  const handleRuleNodeChange = (index: number, ruleNode: TRuleNode) => {
    const newChildren = [...groupData.children];

    if (ruleNode.type === "group") {
      newChildren[index] = applyLockedRecursively(ruleNode, ruleNode.locked);
    } else {
      newChildren[index] = ruleNode;
    }

    onChange({ ...groupData, children: newChildren });
  };

  const handleRuleNodeDelete = (deletedIndex: number) => {
    const newChildren = groupData.children.filter((_, index) => index !== deletedIndex);
    onChange({ ...groupData, children: newChildren });
  };

  const renderRuleNode = ({ ruleNode, index }: { ruleNode: TRuleNode; index: number }) => {
    if (ruleNode.type === "group") {
      return (
        <RuleGroup
          key={ruleNode.id}
          groupData={{
            ...ruleNode,
            locked: locked || ruleNode.locked,
            disabled: disabled || ruleNode.disabled,
          }}
          onChange={(ruleGroup) => handleRuleNodeChange(index, ruleGroup)}
          onDelete={() => handleRuleNodeDelete(index)}
        />
      );
    }

    return (
      <RuleFilter
        key={ruleNode.id}
        data={ruleNode}
        onDelete={() => handleRuleNodeDelete(index)}
        onChange={(filterNode) => handleRuleNodeChange(index, filterNode)}
        disabled={locked || disabled}
      />
    );
  };

  return (
    <GroupAccordion
      elevation={isRoot ? 1 : 0}
      titleSlot={
        <GroupTitleEditor
          groupData={groupData}
          onChange={(title) => onChange({ ...groupData, title })}
          disabled={disabled}
        />
      }
      defaultExpanded={!collapsed}
      onChange={(_, expanded) => onChange({ ...groupData, collapsed: !expanded })}
    >
      <Stack>
        <Stack flexDirection={"row"} columnGap={3} alignItems={"center"} marginBlockEnd={1}>
          <GroupDisableBtn
            groupDisabled={disabled}
            onClick={() => onChange({ ...groupData, disabled: !disabled })}
          />

          <GroupLockBtn groupLocked={locked} onClick={() => handleGroupLockedToggle(!locked)} />

          {!isRoot && (
            <Box marginInlineStart={"auto"}>
              <DeleteRuleNodeBtn
                onClick={onDelete}
                confirmMessage={"Are you sure you want to remove the group?"}
                disabled={locked}
              />
            </Box>
          )}
        </Stack>

        <Stack flexDirection={"row"} minHeight={40}>
          <Stack flexDirection={"row"} position={"relative"} width={72} justifyContent={"center"}>
            <RuleGroupBracket combinator={combinator} groupLocked={locked} />
            <Box alignSelf={"center"} position={"absolute"} right={14} sx={{ background: "#fff" }}>
              <RuleCombinatorSwitch
                combinator={combinator}
                onChange={(combinator) => onChange({ ...groupData, combinator })}
                disabled={locked}
              />
            </Box>
          </Stack>
          <Box flexGrow={1}>
            <SortableRuleNodes
              groupData={groupData}
              onChange={onChange}
              renderRuleNode={renderRuleNode}
              disabled={disabled}
            />
          </Box>
        </Stack>

        <Stack flexDirection={"row"} columnGap={2} marginBlockStart={3}>
          <Button
            onClick={handleAddFilter}
            variant={"outlined"}
            color={"primary"}
            sx={{ textTransform: "none" }}
            startIcon={<AddIcon />}
            disabled={disabled}
          >
            Add filter
          </Button>
          <Button
            onClick={handleAddGroup}
            variant={"outlined"}
            color={"primary"}
            sx={{ textTransform: "none" }}
            startIcon={<SchemaIcon />}
            disabled={disabled}
          >
            Add group
          </Button>
        </Stack>
      </Stack>
    </GroupAccordion>
  );
};
