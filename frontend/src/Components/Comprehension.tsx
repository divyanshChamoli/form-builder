import { useState } from 'react';
import Card from './Card'
import Mcq from './Mcq'

function Comprehension() {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);

  // Function to handle adding a new question
  function addQuestion() {
    setQuestions((prevQuestions) => [...prevQuestions, ""]);
  }

  return (
    <div>
      <textarea
        name="passage"
        id="passage"
        className="w-full border-2"
        placeholder="Type passage here"
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
      ></textarea>

      {questions.map((question, index) => (
        <div key={index} className="mt-4">
          <div className="w-4/5 p-10 flex flex-col gap-5 shadow-lg bg-gray-50 border-l-4 border-blue-400">
            <div className="flex flex-col mb-4">
              <div>Q{index+1}</div>
              <input
                type="text"
                placeholder="Enter question here"
                value={question}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index] = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                className="border-2 p-2"
              />
            </div>
            <Mcq questionIndex={index} />

          </div>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="mt-4 p-2 border-2 bg-blue-500 text-white"
      >
        Add Question
      </button>
    </div>
  );
}

export default Comprehension;


// import Card from './Card'
// import Mcq from './Mcq'

// function Comprehension() {
//   return (
//     <div>
//       <textarea name="passage" id="passage" className="w-full border-2" placeholder='Type passage here'></textarea>
//       {/* <Card> */}
//         <Mcq/>
//       {/* </Card> */}
//     </div>
//   )
// }

// export default Comprehension