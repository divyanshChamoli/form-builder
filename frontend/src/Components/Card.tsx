import DropdownMenu from "./DropdownMenu";
import Categorize from "./Categorize";
import Cloze from "./Cloze";
import Comprehension from "./Comprehension";
import { QuestionType } from "../types/types";
import { questions } from "../utils/util";

interface CardProps {
  questionNumber: number;
  questionType: QuestionType;
  updateQuestionType: (type: QuestionType) => void;
}

function Card({ questionNumber, questionType, updateQuestionType }: CardProps) {
  return (
    <section className="w-4/5 p-10 flex flex-col gap-5 shadow-lg bg-white border-l-8 border-blue-400">
      <div className="font-semibold text-lg">Question {questionNumber}</div>
      <DropdownMenu
        currentItem={questionType}
        dropDownItems={questions}
        onItemSelect={updateQuestionType}
      />
      {questionType === "Categorize" && <Categorize id={questionNumber} />}
      {questionType === "Cloze" && <Cloze id={questionNumber} />}
      {questionType === "Comprehension" && <Comprehension id={questionNumber}/>}
    </section>
  );
}

export default Card;