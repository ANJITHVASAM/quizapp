import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import StartQuiz from "./Components/StartQuiz";
import { useEffect, useState } from "react";

function App() {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [noOfQuestions,setNoOfQuestions]=useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              level={level} 
              setLevel={setLevel} 
              language={language} 
              setLanguage={setLanguage} 
              noOfQuestions={noOfQuestions}
              setNoOfQuestions={setNoOfQuestions}
            />} 
        />
        <Route 
          path="/quiz" 
          element={
            <StartQuiz 
              level={level} 
              language={language} 
              noOfQuestions={noOfQuestions}
              setNoOfQuestions={setNoOfQuestions}
            />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
