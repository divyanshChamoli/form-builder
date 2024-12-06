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
      {questionType === "Categorize" && <Categorize />}
      {questionType === "Cloze" && <Cloze />}
      {questionType === "Comprehension" && <Comprehension />}
    </section>
  );
}

export default Card;


// import { QuestionType } from '../types/types'
// import DropdownMenu from './DropdownMenu'
// import Categorize from './Categorize'
// import Cloze from './Cloze'
// import Comprehension from './Comprehension'
// import { questions } from '../utils/util'

// interface CardProps{
//   questionNumber: number
//   questionType: QuestionType
// }

// function Card({questionNumber, questionType} : CardProps) {
  
//   return (
//     <section className="w-4/5 p-10 flex flex-col content-center gap-5 shadow-lg bg-white border-l-8 border-blue-400">
//         <div className='font-semibold text-lg'> Question {questionNumber}</div>
//         <DropdownMenu dropDownItems={questions}/>
//         {questionType === "Categorize" ? <Categorize/> :
//         questionType === "Cloze" ? <Cloze/> : <Comprehension/>}
//     </section>
//   )
// }

// export default Card