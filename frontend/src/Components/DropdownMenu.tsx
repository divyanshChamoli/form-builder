import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CategoryType } from "../types/types";

interface DropdownMenuProps {
  dropDownItems: CategoryType[];
}

function DropdownMenu({ dropDownItems }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState("");

  function toggle() {
    setIsOpen((open) => {
      return !open;
    });
  }

  return (
    <div className="relative">
      <div
        onClick={toggle}
        className="flex justify-between items-center h-10 w-40 border-2 relative"
      >
        <div className="pl-2"> {item ? item : "Choose Category"}</div>
        <button className="flex justify-center items-center border-l-2">
          <ChevronDown size={25} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full border-2 rounded-md">
          {dropDownItems.map((dropDownItem) => {
            return (
              <div
                onClick={() => {
                  setItem(dropDownItem.placeholder);
                  setIsOpen(false)
                }}
                className="border-b-2 h-8"
              >
                {" "}
                {dropDownItem.placeholder}{" "}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
