import Card from "./Card";
import Item from "./Item";
import { ChangeEvent, useState } from "react";
import { UnderlinedOptionType } from "../types/types";
import { v4 as uuid } from "uuid";
import InputField from "./InputField";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

function Mcq() {
  const [underlinedOptions, setUnderlinedOptions] = useState<
    UnderlinedOptionType[]
  >([]);
  const [underlinedOption, setUnderlinedOption] = useState("");
  const [question, setQuestion] = useState("");

  function handleOptionDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    setUnderlinedOptions((underlinedOptions) => {
      const oldIndex = underlinedOptions.findIndex(
        (underlinedOption) => underlinedOption.id === active.id
      );
      const newIndex = underlinedOptions.findIndex(
        (underlinedOption) => underlinedOption.id === over.id
      );
      return arrayMove(underlinedOptions, oldIndex, newIndex);
    });
  }

  function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setUnderlinedOptions(() => [
        ...underlinedOptions,
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

  function removeOption(id: string) {
    setUnderlinedOptions((underlinedOptions) =>
      underlinedOptions.filter((underlinedOption) => underlinedOption.id !== id)
    );
  }

  return (
    <main className="w-screen flex flex-col items-center py-20">
      <Card>
        <div className="flex flex-col">
          <InputField
            placeholder="Question Text"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            onKeyDown={() => {}}
          />
        </div>
        <div className="flex flex-col gap-2">
          <DndContext onDragEnd={handleOptionDragEnd}>
            <SortableContext items={underlinedOptions}>
              {underlinedOptions.map((underlinedOption) => {
                return (
                  <Item
                    key={underlinedOption.id}
                    placeholder=""
                    draggable
                    radio
                    removable
                    value={underlinedOption.placeholder}
                    onChange={() => {}}
                    onKeyDown={() => {}}
                    removeCategory={() => removeOption(underlinedOption.id)}
                    deleteId={underlinedOption.id}
                    id={underlinedOption.id}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
          <Item
            id={uuid()}
            placeholder="Option"
            value={underlinedOption}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUnderlinedOption(e.target.value)
            }
            onKeyDown={onEnterPress}
            removeCategory={() => {}}
            deleteId=""
          />
        </div>
      </Card>
    </main>
  );
}

export default Mcq;
