import { Grip } from "lucide-react";
import Card from "./Card";
import DropdownMenu from "./DropdownMenu";
import Item from "./Item";
import { ChangeEvent, useState } from "react";
import { CategoryType, ItemType } from "../types/types";
import { v4 as uuid } from "uuid";
import InputField from "./InputField";
import { questions } from "../utils/util";

function Categorize() {
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [question, setQuestion] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const [item, setItem] = useState<string>("");

  function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setCategories(() => [
        ...categories,
        { id: uuid(), placeholder: category },
      ]);
      setCategory("");
    }
  }

  function addItems(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setItems(() => [...items, { id: uuid(), placeholder: item }]);
      setItem("");
    }
  }

  function removeItem(id: string) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function removeCategory(id: string) {
    setCategories((categories) =>
      categories.filter((category) => category.id !== id)
    );
  }

  return (
    <main className="w-screen flex flex-col items-center py-20">
      <Card>
        <header className="flex gap-2">
          <button>
            <Grip />
          </button>
          <h3>Question 1</h3>
        </header>
        <div className="flex gap-10">
          <InputField
            placeholder="Description (Optional)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={() => {}}
          />
          <DropdownMenu dropDownItems={questions} />
        </div>
        <div>Categories</div>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            return (
              <Item
                key={category.id}
                placeholder=""
                draggable
                removable
                value={category.placeholder}
                onChange={() => {}}
                onKeyDown={() => {}}
                removeCategory={() => removeCategory(category.id)}
                deleteId={category.id}
              />
            );
          })}
          <Item
            placeholder="Category (optional)"
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
            onKeyDown={onEnterPress}
            removeCategory={() => {}}
            deleteId=""
          />
        </div>
        <div className="">
          <div className="flex gap-72">
            <div>Item</div>
            <div>Belongs to</div>
          </div>
          <div className="flex flex-col">
            {items.map((item) => {
              return (
                <div className="flex gap-20">
                  <div>
                    <Item
                      key={item.id}
                      placeholder=""
                      draggable
                      removable
                      value={item.placeholder}
                      onChange={() => {}}
                      onKeyDown={() => {}}
                      removeCategory={() => removeItem(item.id)}
                      deleteId={item.id}
                    />
                  </div>
                  <DropdownMenu dropDownItems={categories} />
                </div>
              );
            })}
            <div className="flex gap-20">
              <Item
                placeholder="Item (optional)"
                value={item}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setItem(e.target.value)
                }
                onKeyDown={addItems}
                removeCategory={() => {}}
                deleteId=""
              />
              <DropdownMenu dropDownItems={categories} />
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}

export default Categorize;
