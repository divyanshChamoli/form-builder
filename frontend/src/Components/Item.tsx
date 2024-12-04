import { Grip, X } from "lucide-react";
import InputField from "./InputField";
import { ChangeEvent } from "react";

interface ItemProps {
  draggable?: boolean;
  removable?: boolean;
  placeholder: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  removeCategory( id: string) : void
  deleteId: string
}

function Item({ draggable, removable, placeholder, value, onChange, onKeyDown, removeCategory, deleteId }: ItemProps) {
  return (
    <div className="flex items-center gap-2 w-60">
      {draggable && (
        <button>
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
