import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormBuilder from "./Pages/FormBuilder";
import Quiz from "./Pages/Quiz";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<FormBuilder />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
          </Routes>
        </QuizProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
