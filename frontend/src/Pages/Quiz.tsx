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

    useEffect(() => {
    async function getData() {
      const response = await axios.get(`${BACKEND_URL}/quiz/${quizId}`);
      setQuizData(response.data);
    }

    getData();
  }, []);
  
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-1/2">
        {quizData?.questions.map((question)=>{
          return(
            question.type === "Cloze" ? <ClozePreview2 sentence={question.data.sentence} draggableOptions={question.data.options} /> : 
            question.type === "Comprehension" ? <ComprehensionPreview passage={question.data.passage} questions={question.data.subQuestions} /> : <CategorizePreview/> 
          )
        })}
      </div>
    </div>
  );
}

export default Quiz;
