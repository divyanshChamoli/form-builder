import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormBuilder from "./Pages/FormBuilder"
import Quiz from "./Pages/Quiz"

function App() {

  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<FormBuilder/>} />
          <Route path="/quiz" element={<Quiz/>} />
        </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
