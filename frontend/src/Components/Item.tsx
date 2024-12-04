import { Grip, X } from "lucide-react";
import InputField from "./InputField";
import { ChangeEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

interface ItemProps {
  id: string
  draggable?: boolean;
  removable?: boolean;
  placeholder: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  removeCategory( id: string) : void
  deleteId: string
}

function Item({ id, draggable, removable, placeholder, value, onChange, onKeyDown, removeCategory, deleteId }: ItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div className="flex items-center gap-2 w-60" ref={setNodeRef} style={style} {...attributes} >
      {draggable && ( 
        <button className="cursor-grab" {...listeners}>
          <Grip />
        </button>
      )}
      <InputField placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}/>
      {removable && (
        <button onClick={()=>removeCategory(deleteId)}>
          <X />
        </button>
      )}
    </div>
  );
}

export default Item;
