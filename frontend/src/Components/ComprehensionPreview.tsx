import { MCQQuestion } from "../types/types"
import McqPreview from "./McqPreview"

interface ComprehensionPreviewProps{
  passage: string,
  questions: MCQQuestion[]
}

function ComprehensionPreview({passage, questions} : ComprehensionPreviewProps) {
  
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-16 flex flex-col gap-4">
      {passage}
      <div className="">
        {questions.map((question)=>{
          return(
            <McqPreview options={question.options} question={question.questionText} />
          )
        })}
      </div>
    </div>
  )
}

export default ComprehensionPreview