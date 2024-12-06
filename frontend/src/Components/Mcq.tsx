import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import InputField from "./InputField";  
import Item from "./Item";

interface McqProps {
  questionIndex: number;
}

function Mcq({ questionIndex }: McqProps) {
  const [underlinedOptions, setUnderlinedOptions] = useState<any[]>([]);
  const [underlinedOption, setUnderlinedOption] = useState("");

  // Handle drag and drop reordering of options
  function handleOptionDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    setUnderlinedOptions((prevOptions) => {
      const oldIndex = prevOptions.findIndex((option) => option.id === active.id);
      const newIndex = prevOptions.findIndex((option) => option.id === over.id);
      return arrayMove(prevOptions, oldIndex, newIndex);
    });
  }

  // Add a new option when Enter is pressed
  function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && underlinedOption.trim() !== "") {
      setUnderlinedOptions((prevOptions) => [
        ...prevOptions,
        {
          id: uuid(),
          placeholder: underlinedOption,
          deletable: true,
        },
      ]);
      setUnderlinedOption("");
    }
  }

  // Remove an option
  function removeOption(id: string) {
    setUnderlinedOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 mt-4">
        <DndContext onDragEnd={handleOptionDragEnd}>
          <SortableContext items={underlinedOptions}>
            {underlinedOptions.map((option) => (
              <Item
                key={option.id}
                id={option.id}
                value={option.placeholder}
                draggable
                removable
                radio
                removeCategory={() => removeOption(option.id)}
                deleteId={option.id}
                placeholder=""
                onChange={()=>{}}
                onKeyDown={()=>{}}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Input to add options for the current MCQ */}
        <Item
          id={uuid()}
          placeholder="Option"
          value={underlinedOption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUnderlinedOption(e.target.value)
          }
          onKeyDown={onEnterPress}
          removeCategory={() => {}}
          deleteId=""
        />
      </div>
    </div>
  );
}

export default Mcq;


// import Card from "./Card";
// import Item from "./Item";
// import { ChangeEvent, useState } from "react";
// import { UnderlinedOptionType } from "../types/types";
// import { v4 as uuid } from "uuid";
// import InputField from "./InputField";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { arrayMove, SortableContext } from "@dnd-kit/sortable";

// function Mcq() {
//   const [underlinedOptions, setUnderlinedOptions] = useState<
//     UnderlinedOptionType[]
//   >([]);
//   const [underlinedOption, setUnderlinedOption] = useState("");
//   const [question, setQuestion] = useState("");

//   function handleOptionDragEnd(event: DragEndEvent) {
//     const { active, over } = event;

//     if (!over) {
//       return;
//     }

//     setUnderlinedOptions((underlinedOptions) => {
//       const oldIndex = underlinedOptions.findIndex(
//         (underlinedOption) => underlinedOption.id === active.id
//       );
//       const newIndex = underlinedOptions.findIndex(
//         (underlinedOption) => underlinedOption.id === over.id
//       );
//       return arrayMove(underlinedOptions, oldIndex, newIndex);
//     });
//   }

//   function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") {
//       setUnderlinedOptions(() => [
//         ...underlinedOptions,
//         {
//           id: uuid(),
//           placeholder: underlinedOption,
//           deletable: true,
//           checked: false,
//         },
//       ]);
//       setUnderlinedOption("");
//     }
//   }

//   function removeOption(id: string) {
//     setUnderlinedOptions((underlinedOptions) =>
//       underlinedOptions.filter((underlinedOption) => underlinedOption.id !== id)
//     );
//   }

//   return (
//     <main className="w-screen flex flex-col items-center py-20">
//       <Card>
//         <div className="flex flex-col">
//           <InputField
//             placeholder="Question Text"
//             value={question}
//             onChange={(e) => {
//               setQuestion(e.target.value);
//             }}
//             onKeyDown={() => {}}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <DndContext onDragEnd={handleOptionDragEnd}>
//             <SortableContext items={underlinedOptions}>
//               {underlinedOptions.map((underlinedOption) => {
//                 return (
//                   <Item
//                     key={underlinedOption.id}
//                     placeholder=""
//                     draggable
//                     radio
//                     removable
//                     value={underlinedOption.placeholder}
//                     onChange={() => {}}
//                     onKeyDown={() => {}}
//                     removeCategory={() => removeOption(underlinedOption.id)}
//                     deleteId={underlinedOption.id}
//                     id={underlinedOption.id}
//                   />
//                 );
//               })}
//             </SortableContext>
//           </DndContext>
//           <Item
//             id={uuid()}
//             placeholder="Option"
//             value={underlinedOption}
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setUnderlinedOption(e.target.value)
//             }
//             onKeyDown={onEnterPress}
//             removeCategory={() => {}}
//             deleteId=""
//           />
//         </div>
//       </Card>
//     </main>
//   );
// }

// export default Mcq;
