import { useState, useEffect } from 'react';

interface McqProps {
  questionIndex: number;
  comprehensionId: number;
  onOptionsUpdate: (options: string[], correctAnswer: string) => void;
}

function Mcq({ 
  questionIndex, 
  comprehensionId, 
  onOptionsUpdate 
}: McqProps) {
  // Initialize with a default option
  const [options, setOptions] = useState<string[]>(['Option 1']);
  
  // Correct answer is the selected option
  const [correctAnswer, setCorrectAnswer] = useState<string>('Option 1');
  
  const [newOption, setNewOption] = useState<string>('');

  // Trigger options update whenever options or correct answer change
  useEffect(() => {
    onOptionsUpdate(options, correctAnswer);
  }, [options, correctAnswer]);

  // Add a new option
  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      const newOptionValue = newOption.trim();
      setOptions(prevOptions => [...prevOptions, newOptionValue]);
      setNewOption('');
    }
  };

  // Add option on Enter key press
  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addOption();
    }
  };

  // Remove an option
  const removeOption = (optionToRemove: string) => {
    setOptions(prevOptions => {
      // Ensure at least one option remains
      const updatedOptions = prevOptions.filter(option => option !== optionToRemove);
      
      // If no options left, reset with a default option
      if (updatedOptions.length === 0) {
        updatedOptions.push('Option 1');
      }
      
      // If the removed option was the correct answer, select the first option
      if (correctAnswer === optionToRemove) {
        setCorrectAnswer(updatedOptions[0]);
      }
      
      return updatedOptions;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 mt-4">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input
              type="radio"
              id={`option-${option}`}
              name={`mcq-options-${comprehensionId}-${questionIndex}`}
              value={option}
              checked={correctAnswer === option}
              onChange={() => setCorrectAnswer(option)}
              className="mr-2"
            />
            <label htmlFor={`option-${option}`} className="flex-grow">
              {option}
            </label>
            {options.length > 1 && (
              <button 
                onClick={() => removeOption(option)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            )}
          </div>
        ))}
        
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={onEnterPress}
            placeholder="Add new option"
            className="flex-grow border p-1"
          />
          <button 
            onClick={addOption}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Display correct answer and options for debugging/verification */}
      <div className="mt-2 text-green-600">
        Correct Answer: {correctAnswer}
      </div>
      <div className="mt-2 text-blue-600">
        Options: {options.join(', ')}
      </div>
    </div>
  );
}

export default Mcq;
