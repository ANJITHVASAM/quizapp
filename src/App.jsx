import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import StartQuiz from "./Components/StartQuiz";
import { useEffect, useState } from "react";

function App() {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage level={level} setLevel={setLevel} language={language} setLanguage={setLanguage} />} />
        <Route path="/quiz" element={<StartQuiz level={level} language={language} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;