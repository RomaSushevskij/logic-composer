import { type JSX, useState } from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Stack from "@mui/material/Stack";

import type { TRuleGroup, TRuleNode } from "../../model/types";
import { SortableRuleNode } from "../sortable-rule-nodes/sortable-rule-node";

export const SortableRuleNodes = ({
  groupData,
  onChange,
  renderRuleNode,
  disabled,
}: {
  groupData: TRuleGroup;
  onChange: (groupData: TRuleGroup) => void;
  renderRuleNode: ({ ruleNode, index }: { ruleNode: TRuleNode; index: number }) => JSX.Element;
  disabled?: boolean;
}) => {
  const [dragActiveRuleNodeId, setDragActiveRuleNodeId] = useState<TRuleNode["id"] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setDragActiveRuleNodeId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = groupData.children.findIndex((item) => item.id === active.id);
      const newIndex = groupData.children.findIndex((item) => item.id === over?.id);
      onChange({ ...groupData, children: arrayMove(groupData.children, oldIndex, newIndex) });
    }

    setDragActiveRuleNodeId(null);
  }

  const dragActiveRuleNode = groupData.children.find(
    (ruleNode) => ruleNode.id === dragActiveRuleNodeId,
  )!;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={groupData.children} strategy={verticalListSortingStrategy}>
        <Stack rowGap={2}>
          {groupData.children.map((ruleNode, index) => {
            return (
              <SortableRuleNode
                key={ruleNode.id}
                data={ruleNode}
                isDragActive={ruleNode.id === dragActiveRuleNodeId}
                disabled={disabled || (ruleNode.type === "group" && ruleNode.disabled)}
              >
                {renderRuleNode({ ruleNode, index })}
              </SortableRuleNode>
            );
          })}
        </Stack>
      </SortableContext>

      <DragOverlay>
        {dragActiveRuleNodeId ? (
          <SortableRuleNode data={dragActiveRuleNode} isDragOverlay>
            {renderRuleNode({
              ruleNode: dragActiveRuleNode,
              index: NaN,
            })}
          </SortableRuleNode>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
