import { useState } from "react";
import Card from "../Components/Card";
import { QuestionType } from "../types/types";
import axios from "axios";
import { useQuizData } from "../context/QuizContext";

function FormBuilder() {
  const [questions, setQuestions] = useState<
    { id: number; type: QuestionType }[]
  >([]);
  const { quizData } = useQuizData();
  const [formUrl, setFormUrl] = useState<string | undefined>();

  const BACKEND_URL = import.meta.env.VITE_BASE_URL;

  const saveQuiz = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/quiz`, quizData);
      const data = res.data;
      setFormUrl(`https://form-builder-delta-teal.vercel.app/quiz/${data.newQuiz._id}`);
      alert(`Answer the form on: https://form-builder-delta-teal.vercel.app/quiz/${data.newQuiz._id}`);
    } catch (e) {
      console.log("Could not send to backend");
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, type: "Categorize" },
    ]);
  };

  const updateQuestionType = (id: number, type: QuestionType) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, type } : q))
    );
  };

  return (
    <div className="flex flex-col items-center pt-20 gap-5">
      {formUrl && <div className="text-center font-bold text-lg p-10 border-2"> Share Link : {formUrl} </div>}

      {questions.map((q) => (
        <Card
          key={q.id}
          questionNumber={q.id}
          questionType={q.type}
          updateQuestionType={(type) => updateQuestionType(q.id, type)}
        />
      ))}
      <button
        onClick={addQuestion}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Question
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded mb-20"
        onClick={saveQuiz}
      >
        Submit Form
      </button>
      {formUrl && <div className="text-center font-bold text-lg p-10 border-2"> Share Link : {formUrl} </div>}

    </div>
  );
}

export default FormBuilder;
