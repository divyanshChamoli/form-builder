import { useState } from "react"
import Categorize from "../Components/Categorize"
import Cloze from "../Components/Cloze"
import Comprehension from "../Components/Comprehension"
import Mcq from "../Components/Mcq"

type QuestionType = "Comprehension" | "Categorize" | "Cloze"

function FormBuilder() {
  const [questionType, setQuestionType] =  useState<QuestionType>("Categorize")

  return (
    <div>
              
        <Categorize/>
        <Cloze/>
        <Comprehension/>
        {/* <Mcq/> */}
    </div>
  )
}

export default FormBuilder