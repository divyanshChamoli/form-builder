import Card from "./Card";
import Item from "./Item";
import { ChangeEvent, useState } from "react";
import { UnderlinedOptionType } from "../types/types";
import { v4 as uuid } from "uuid";
import InputField from "./InputField";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Underline } from "lucide-react";

function Cloze() {
  const [underlinedOptions, setUnderlinedOptions] = useState<UnderlinedOptionType[]>([]);
  const [underlinedOption, setUnderlinedOption] = useState("");
  const [sentence, setSentence] = useState("");
  const [preview, setPreview] = useState("");

  // Function to handle underlining text
  function handleUnderline() {
    const underlinedText = getSelection()?.toString();
    if (!underlinedText) return;

    // Update preview and sentence by replacing selected text with blanks
    if (preview.includes(underlinedText)) {
      setPreview(preview.replace(underlinedText, "____"));
      setSentence(sentence.replace(underlinedText, "____"));
    }

    // Add a new underlined option
    setUnderlinedOptions((prev) => [
      ...prev,
      {
        id: uuid(),
        placeholder: underlinedText,
        deletable: false,
        checked: true,
      },
    ]);
  }

  // Handle drag-and-drop reordering of underlined options
  function handleOptionDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    setUnderlinedOptions((prevOptions) => {
      const oldIndex = prevOptions.findIndex((option) => option.id === active.id);
      const newIndex = prevOptions.findIndex((option) => option.id === over.id);
      return arrayMove(prevOptions, oldIndex, newIndex);
    });
  }

  // Add an underlined option when Enter is pressed
  function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && underlinedOption.trim() !== "") {
      setUnderlinedOptions((prev) => [
        ...prev,
        {
          id: uuid(),
          placeholder: underlinedOption,
          deletable: true,
          checked: false,
        },
      ]);
      setUnderlinedOption("");
    }
  }

  // Remove an underlined option
  function removeOption(id: string) {
    setUnderlinedOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  }

  return (
    <main className="w-full flex flex-col">
      {/* Preview and Sentence Input */}
      <div className="flex flex-col">
        <div className="text-lg font-semibold mb-2">Preview</div>
        <div className="flex items-center h-10 w-full border-2 rounded p-2">
          {preview || "Your preview will appear here."}
        </div>
        <div className="pt-10 flex items-center">
          <label className="pb-1">Sentence</label>
          <button
            className="border-2 ml-2 p-1 rounded hover:bg-gray-200"
            title="Underline"
            onClick={handleUnderline}
          >
            <Underline size={20} />
          </button>
        </div>
        <InputField
          placeholder="Underline words to convert them into blanks"
          value={sentence}
          onChange={(e) => {
            setSentence(e.target.value);
            setPreview(e.target.value);
          }}
          onKeyDown={()=>{}}
        />
      </div>

      {/* Underlined Options (Draggable and Editable) */}
      <div className="flex flex-col gap-2 mt-4">
        <DndContext onDragEnd={handleOptionDragEnd}>
          <SortableContext items={underlinedOptions}>
            {underlinedOptions.map((option) => (
              <Item
                key={option.id}
                id={option.id}
                placeholder=""
                draggable
                removable={option.deletable ? true : undefined}
                value={option.placeholder}
                onChange={() => {}}
                onKeyDown={() => {}}
                removeCategory={() => removeOption(option.id)}
                deleteId={option.id}
                checked={option.checked}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Input to add new options */}
        <Item
          id={uuid()}
          placeholder="Option"
          value={underlinedOption}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUnderlinedOption(e.target.value)}
          onKeyDown={onEnterPress}
          removeCategory={() => {}}
          deleteId=""
        />
      </div>
    </main>
  );
}

export default Cloze;



// import Card from "./Card";
// import Item from "./Item";
// import { ChangeEvent, useState } from "react";
// import { UnderlinedOptionType } from "../types/types";
// import { v4 as uuid } from "uuid";
// import InputField from "./InputField";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { arrayMove, SortableContext } from "@dnd-kit/sortable";
// import { Underline } from "lucide-react";

// function Cloze() {
//   const [underlinedOptions, setUnderlinedOptions] = useState<
//     UnderlinedOptionType[]
//   >([]);
//   const [underlinedOption, setUnderlinedOption] = useState("");
//   const [sentence, setSentence] = useState("");
//   const [preview, setPreview] = useState("");

//   function handleUnderline() {
//     const underlinedText = getSelection()?.toString();
//     if (!underlinedText) return;

//     //1) Change preview
//     //2) Change sentence
//     if (preview.includes(underlinedText)) {
//       setPreview(() => preview.replace(underlinedText, "____"));
//       setSentence(() => sentence.replace(underlinedText, "____"));
//     }

//     //3) Add option
//     setUnderlinedOptions([
//       ...underlinedOptions,
//       {
//         id: uuid(),
//         placeholder: underlinedText,
//         deletable: false,
//         checked: true,
//       },
//     ]);
//   }

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
//       {/* <Card> */}
//         <div className="flex flex-col">
//           <div>Preview</div>
//           <div className="flex items-center h-10 w-full border-2 ">
//             {preview}
//           </div>
//           <div className="pt-10 flex items-center">
//             <p className="pb-1">Sentence</p>
//             <button
//               className="border-2 ml-2"
//               title="Underline"
//               onClick={handleUnderline}
//             >
//               <Underline size={20} />
//             </button>
//           </div>
//           <InputField
//             placeholder="Underline the words here to convert them into blanks"
//             value={sentence}
//             onChange={(e) => {
//               setSentence(e.target.value);
//               setPreview(e.target.value);
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
//                     removable={underlinedOption.deletable ? true : undefined}
//                     value={underlinedOption.placeholder}
//                     onChange={() => {}}
//                     onKeyDown={() => {}}
//                     removeCategory={() => removeOption(underlinedOption.id)}
//                     deleteId={underlinedOption.id}
//                     id={underlinedOption.id}
//                     checked={underlinedOption.checked}
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
//       {/* </Card> */}
//     </main>
//   );
// }

// export default Cloze;
