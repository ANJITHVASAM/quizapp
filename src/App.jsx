import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import StartQuiz from "./Components/StartQuiz";
import { useState } from "react";

function App() {
  const [level, setLevel] = useState("easy");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage level={level} setLevel={setLevel} />} />
        <Route path="/quiz" element={<StartQuiz level={level} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;