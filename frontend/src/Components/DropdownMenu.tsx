import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { QuestionType } from "../types/types";

interface DropdownMenuProps {
  dropDownItems: { value: QuestionType; placeholder: string }[];
  currentItem?: QuestionType;
  onItemSelect?: (value: QuestionType) => void;
}

function DropdownMenu({ dropDownItems, currentItem, onItemSelect }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full h-10 border-2 p-2"
      >
        <span>{currentItem || "Choose Category"}</span>
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full border bg-white shadow-md rounded-md">
          {dropDownItems.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                onItemSelect && onItemSelect(item.value);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.placeholder}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;


// import { ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { CategoryType } from "../types/types";

// interface DropdownMenuProps {
//   dropDownItems: CategoryType[];
// }

// function DropdownMenu({ dropDownItems }: DropdownMenuProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [item, setItem] = useState("");

//   function toggle() {
//     setIsOpen((open) => {
//       return !open;
//     });
//   }

//   return (
//     <div className="relative">
//       <div
//         onClick={toggle}
//         className="flex justify-between items-center h-10 w-40 border-2 relative"
//       >
//         <div className="pl-2"> {item ? item : "Choose Category"}</div>
//         <button className="flex justify-center items-center border-l-2">
//           <ChevronDown size={25} />
//         </button>
//       </div>
//       {isOpen && (
//         <div className="absolute z-50 mt-2 w-full border-2 rounded-md">
//           {dropDownItems.map((dropDownItem) => {
//             return (
//               <div
//                 onClick={() => {
//                   setItem(dropDownItem.placeholder);
//                   setIsOpen(false)
//                 }}
//                 className="border-b-2 h-8"
//               >
//                 {" "}
//                 {dropDownItem.placeholder}{" "}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DropdownMenu;
