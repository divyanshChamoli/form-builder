import { useNavigate, useParams } from "react-router-dom";

import ClozePreview2 from "../Components/ClozePreview2";
import { useEffect, useState } from "react";
import axios from "axios";
import { QuizType } from "../types/types";
import ComprehensionPreview from "../Components/ComprehensionPreview";
import CategorizePreview from "../Components/CategorizePreview";

type RouteParams = {
  quizId: string;
};

function Quiz() {
  const BACKEND_URL = import.meta.env.VITE_BASE_URL

  const [quizData, setQuizData] = useState<QuizType>()
  
  const { quizId } = useParams<RouteParams>();
  const navigate = useNavigate();
  if (!quizId) {
    navigate("/");
    return <></>;
  }

  function handleSubmit(){
    alert("Submit success")  
    navigate("/")
  }

    useEffect(() => {
    async function getData() {
      const response = await axios.get(`${BACKEND_URL}/quiz/${quizId}`);
      setQuizData(response.data);
    }

    getData();
  }, []);
  
  return (
    <div className="w-screen flex justify-center items-center bg-gray-100">
      <div className="w-1/2 ">
        <div className="bg-blue-500 font-bold text-4xl p-10 text-center">QUIZ</div>
        {quizData?.questions.map((question, idx)=>{
          return(
            <div>
              <div className="pt-5 pb-2">Question {idx+1}</div>
              {question.type === "Cloze" ? <ClozePreview2 sentence={question.data.sentence} draggableOptions={question.data.options} /> : 
              question.data.subQuestions === undefined ? <CategorizePreview questionText={question.data.questionText} 
              categories={question.data.categories} items={question.data.items}/>  : 
              <ComprehensionPreview passage={question.data.passage} questions={question.data.subQuestions} />}
            </div>
          )
        })}
        <button className="w-full text-center px-4 py-2 bg-green-500 text-white rounded mb-20" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;
