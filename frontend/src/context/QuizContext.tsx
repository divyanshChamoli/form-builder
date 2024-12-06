import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the data that will be stored in quizData
interface QuestionData {
  id: number;
  type: string;
  data: any;
}

interface QuizData {
  title: string;
  questions: QuestionData[];
}

// Create context
const QuizContext = createContext<
  | {
      quizData: QuizData;
      setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
    }
  | undefined
>(undefined);

// Create a provider component
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    questions: [],
  });

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the QuizContext
export const useQuizData = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizData must be used within a QuizProvider");
  }
  return context;
};
