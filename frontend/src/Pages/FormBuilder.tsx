import { useState } from "react";
import Card from "../Components/Card";
import { QuestionType } from "../types/types";
import axios from "axios";
import { useQuizData } from "../context/QuizContext";

function FormBuilder() {
  const [questions, setQuestions] = useState<{ id: number; type: QuestionType }[]>([]);
  const {quizData} = useQuizData()

  const BACKEND_URL = import.meta.env.VITE_BASE_URL
  
  const saveQuiz = async () => {
    try{
      const res = await axios.post(`${BACKEND_URL}/quiz`,quizData)
      const data = res.data
      console.log("data",data)
    }
    catch(e){
      console.log("Could not send to backend")
    }
    
  };
  
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
      <button onClick={saveQuiz}>Save Quiz</button>
    </div>
  );
}

export default FormBuilder;
