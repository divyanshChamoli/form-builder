import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function ClozePreview() {
  const draggableOptions = ["name", "age", "Sharma", "Chamoli"];
  const sentence = "My ____ is Divyansh ____";
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active) {
      setAnswers((prev) => ({
        ...prev,
        [over.id]: String(active.id), // Coerce to string
      }));
    }
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-lg p-16">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5">
          {draggableOptions.map((draggableOption, idx) => {
            return (
              <DraggableOptionContainer
                id={`draggable-${idx}`}
                key={idx}
                draggableOption={draggableOption}
              />
            );
          })}
        </div>
        <div className="pt-10">
          {sentence.split(" ").map((word, idx) => {
            return word === "____" ? (
              <DroppableContainer  id={`droppable-${idx}`}
              key={idx}
              content={answers[`droppable-${idx}`]}  />
            ) : (
              <span className="mx-1">{word}</span>
            );
          })}
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
      {" "}
      {draggableOption}
    </div>
  );
}

interface DroppableContainerProps {
  id: string;
  content?: string;
}

function DroppableContainer({ id, content }: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <span ref={setNodeRef} className="bg-gray-300 rounded-md mx-1 px-10 py-4">
      {content || "____"}
    </span>
  );
}

export default ClozePreview;
