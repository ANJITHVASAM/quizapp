import { useEffect, useRef, useState } from "react";
import "./components.css";
import Quiz from "./Quiz";
import Result from "./Results";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://quizapp-backend-gcjy.onrender.com/";
function StartQuiz({ level, language }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate=useNavigate();
  const resultsRef=useRef(null);

  const startQuiz = async () => {
    const res = await fetch(
      `${API_BASE_URL}/quiz?language=${language}&level=${level}&numQ=5`,
    );
    const data = await res.json();
    setQuestions(data);
    setSubmitted(false);
    setAnswers({});

  };
  const submitQuiz = () => {
    setSubmitted(true);
  };
  useEffect(() => {
    startQuiz();
    resultsRef.current?.scrollIntoView({behavior:'smooth'});
  }, []);
  return (
    <div className="container">
      {questions.length > 0 && (
        <Quiz
          language={language}
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          submitted={submitted}
        />
      )}
      {questions.length > 0 && !submitted && (
        <>
          <button onClick={submitQuiz} className="button">
            Submit Quiz
          </button>
          <Link to="/">
            <button className="button">Home</button>
          </Link>
        </>
      )}
      {submitted && <Result questions={questions} answers={answers} />}
    </div>
  );
}

export default StartQuiz;
