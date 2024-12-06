import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface CategorizePreviewProps {
  questionText: string;
  categories: string[];
  items: { text: string; category: string | null }[];
}

function CategorizePreview({
  questionText,
  categories,
  items: initialItems,
}: CategorizePreviewProps) {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active) {
      const activeId = active.id;
      const overId = over.id;

      // Update the category of the dragged item
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.text === activeId ? { ...item, category: overId } : item
        )
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-lg ">{questionText}</h2>

        {/* Categories Section */}
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <DroppableCategory
              key={category}
              id={category}
              items={items.filter((item) => item.category === category)}
              categoryName={category}
              color={getCategoryColor(index)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}

function DraggableItem({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="px-4 py-2 rounded-md border bg-gray-100 cursor-grab text-center shadow-md"
    >
      {text}
    </div>
  );
}

function DroppableCategory({
  id,
  items,
  categoryName,
  color,
}: {
  id: string;
  items: { text: string; category: string | null }[];
  categoryName: string;
  color: string;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? "lightblue" : color,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-40 h-40 rounded-md border p-4 shadow-md flex flex-col items-center gap-2"
    >
      <h3 className="font-bold text-center">{categoryName}</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item) => (
          <DraggableItem key={item.text} id={item.text} text={item.text} />
        ))}
      </div>
    </div>
  );
}

// Helper function to assign colors to droppable categories
function getCategoryColor(index: number): string {
  const colors = ["#F8D7DA", "#FFF3CD", "#D4EDDA", "#D1ECF1"]; // Light red, yellow, green, blue
  return colors[index % colors.length];
}

export default CategorizePreview;
