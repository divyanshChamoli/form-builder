import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface ClozePreview2Props{
  sentence: string,
  draggableOptions: string[] 
}

function ClozePreview2( {sentence, draggableOptions} : ClozePreview2Props) {
  // const draggableOptions = ["name", "age", "Sharma", "Chamoli"];
  // const sentence = "My ____ is Divyansh ____";

  // State to track where each draggable is placed
  const [placements, setPlacements] = useState<{ [key: string]: string | null }>({
    "droppable-0": null,
    "droppable-1": null,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active) {
      const overId = over.id;
      const activeId = active.id;

      setPlacements((prev) => {
        const updatedPlacements = { ...prev };

        // Remove the draggable from its current position if already placed
        Object.keys(updatedPlacements).forEach((key) => {
          if (updatedPlacements[key] === activeId) {
            updatedPlacements[key] = null;
          }
        });

        // Place the draggable in the new droppable container
        updatedPlacements[overId] = String(activeId);

        return updatedPlacements;
      });
    }
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-lg p-16">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5">
          {draggableOptions.map((draggableOption, idx) => {
            // Render draggable only if it hasn't been placed in a droppable
            const isPlaced = Object.values(placements).includes(`draggable-${idx}`);
            return (
              !isPlaced && (
                <DraggableOptionContainer
                  id={`draggable-${idx}`}
                  key={idx}
                  draggableOption={draggableOption}
                />
              )
            );
          })}
        </div>
        <div className="pt-10 flex gap-2">
          {sentence.split(" ").map((word, idx) =>
            word === "____" ? (
              <DroppableContainer
                id={`droppable-${idx}`}
                key={idx}
                content={placements[`droppable-${idx}`]}
                draggableOptions={draggableOptions}
              />
            ) : (
              <span key={idx} className="mx-1">
                {word}
              </span>
            )
          )}
        </div>
      </DndContext>
    </div>
  );
}

interface DraggableOptionContainerProps {
  id: string;
  draggableOption: string;
}

function DraggableOptionContainer({
  id,
  draggableOption,
}: DraggableOptionContainerProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-purple-400 rounded-md px-6 py-4 text-white cursor-grab"
    >
      {draggableOption}
    </div>
  );
}

interface DroppableContainerProps {
  id: string;
  content: string | null;
  draggableOptions: string[];
}

function DroppableContainer({ id, content, draggableOptions }: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-300 rounded-md w-20 h-12 flex justify-center items-center"
    >
      {content ? (
        <DraggableOptionContainer
          id={content}
          draggableOption={draggableOptions[parseInt(content.split("-")[1], 10)]}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ClozePreview2;
