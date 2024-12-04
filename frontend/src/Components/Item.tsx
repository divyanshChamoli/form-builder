import { CheckSquare, Grip, Square, SquareCheck, X } from "lucide-react";
import InputField from "./InputField";
import { ChangeEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ItemProps {
  id: string;
  draggable?: boolean;
  removable?: boolean;
  checked?: boolean;
  placeholder: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  removeCategory(id: string): void;
  deleteId: string;
}

function Item({
  id,
  draggable,
  removable,
  placeholder,
  value,
  onChange,
  onKeyDown,
  removeCategory,
  deleteId,
  checked,
}: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex items-center gap-2 w-60"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      {draggable && (
        <button className="cursor-grab" {...listeners}>
          <Grip />
        </button>
      )}
      {checked === true ? (
        <SquareCheck size={50} fill={"#2463EB"} color="white" />
      ) : (
        <Square size={40} color="#E4E7EA" />
      )}

      <InputField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {removable && (
        <button onClick={() => removeCategory(deleteId)}>
          <X />
        </button>
      )}
    </div>
  );
}

export default Item;
