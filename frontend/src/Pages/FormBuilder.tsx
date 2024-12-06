import { useState } from "react";
import Card from "../Components/Card";
import { QuestionType } from "../types/types";

function FormBuilder() {
  const [questions, setQuestions] = useState<{ id: number; type: QuestionType }[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, type: "Categorize" }]);
  };

  const updateQuestionType = (id: number, type: QuestionType) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, type } : q))
    );
  };

  return (
    <div className="flex flex-col items-center pt-20 gap-5">
      {questions.map((q) => (
        <Card
          key={q.id}
          questionNumber={q.id}
          questionType={q.type}
          updateQuestionType={(type) => updateQuestionType(q.id, type)}
        />
      ))}
      <button onClick={addQuestion} className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Question
      </button>
    </div>
  );
}

export default FormBuilder;


  // import { useState } from "react"
  // import Card from "../Components/Card"
  // import { QuestionType } from "../types/types"

  // function FormBuilder() {
  //   const [questionType, setQuestionType] =  useState<QuestionType>("Categorize")

  //   return (
  //     <div className="flex justify-center pt-20">
  //         <Card questionNumber={1} questionType={questionType}/>
  //     </div>
  //   )
  // }

  // export default FormBuilder