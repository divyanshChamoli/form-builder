import Categorize from "../Components/Categorize"
import Cloze from "../Components/Cloze"
import Comprehension from "../Components/Comprehension"
import Mcq from "../Components/Mcq"

function FormBuilder() {
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