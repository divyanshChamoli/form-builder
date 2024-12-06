import { useState, useEffect } from 'react';
import Mcq from './Mcq';
import { useQuizData } from '../context/QuizContext';
import { v4 as uuid } from 'uuid';

// Define interfaces for type safety
interface SubQuestion {
  id: string;
  type: 'MCQ';
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface ComprehensionProps {
  id: number;
}

function Comprehension({ id }: ComprehensionProps) {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']); 
  const { setQuizData } = useQuizData();

  // Function to handle adding a new question
  function addQuestion() {
    setQuestions((prevQuestions) => [...prevQuestions, '']);
  }

  // Update sub-question in the quiz data
  const updateSubQuestion = (index: number, subQuestionData: Partial<SubQuestion>) => {
    setQuizData((prevData: any) => {
      // Deep clone to avoid direct mutation
      const updatedData = JSON.parse(JSON.stringify(prevData));

      // Find the specific comprehension question
      const comprehensionQuestion = updatedData.questions.find(
        (q: any) => q.id === id
      );

      // Ensure comprehension question and subQuestions exist
      if (comprehensionQuestion && comprehensionQuestion.data) {
        // Ensure subQuestions array exists
        if (!comprehensionQuestion.data.subQuestions) {
          comprehensionQuestion.data.subQuestions = [];
        }

        // Merge the new sub-question data
        const existingSubQuestion = comprehensionQuestion.data.subQuestions[index] || {};
        comprehensionQuestion.data.subQuestions[index] = {
          id: existingSubQuestion.id || uuid(),
          type: 'MCQ',
          questionText: subQuestionData.questionText || existingSubQuestion.questionText || '',
          options: subQuestionData.options || existingSubQuestion.options || ['Option 1'],
          correctAnswer: subQuestionData.correctAnswer || existingSubQuestion.correctAnswer || 'Option 1'
        };
      }

      return updatedData;
    });
  };

useEffect(() => {
  // Ensure at least one sub-question is initialized
  const initializedQuestions = questions.map((question, index) => ({
    questionText: question || `Question ${index + 1}`,
    options: ['Option 1'],
    correctAnswer: 'Option 1'
  }));

  // Only update if there are actually questions to initialize
  if (initializedQuestions.length > 0) {
    setQuizData((prevData: any) => {
      // Deep clone to avoid direct mutation
      const updatedData = JSON.parse(JSON.stringify(prevData));

      // Find the specific comprehension question
      const comprehensionQuestion = updatedData.questions.find(
        (q: any) => q.id === id
      );

      // Ensure comprehension question and subQuestions exist
      if (comprehensionQuestion && comprehensionQuestion.data) {
        // Ensure subQuestions array exists and is initialized
        comprehensionQuestion.data.subQuestions = initializedQuestions.map(q => ({
          id: uuid(),
          type: 'MCQ',
          ...q
        }));
      }

      return updatedData;
    });
  }
}, []); // Empty dependency array to run only once

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
        <div key={`question-${id}-${index}`} className="mt-4">
          <div className="w-4/5 p-10 flex flex-col gap-5 shadow-lg bg-gray-50 border-l-4 border-blue-400">
            <div className="flex flex-col mb-4">
              <div>Q{index + 1}</div>
              <input
                type="text"
                placeholder="Enter question here"
                value={question}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index] = e.target.value;
                  setQuestions(updatedQuestions);

                  // Update question text in quiz data
                  updateSubQuestion(index, { 
                    questionText: e.target.value 
                  });
                }}
                className="border-2 p-2"
              />
            </div>
            <Mcq 
              key={`mcq-${id}-${index}`}
              questionIndex={index} 
              comprehensionId={id}
              onOptionsUpdate={(options, correctAnswer) => {
                updateSubQuestion(index, { 
                  options, 
                  correctAnswer 
                });
              }}
            />
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