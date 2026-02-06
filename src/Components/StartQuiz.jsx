import { useEffect, useState } from "react";
import "./components.css";
import Quiz from "./Quiz";
import Result from "./Results";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8888/questions";
function StartQuiz({ level }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const startQuiz = async () => {
    const res = await fetch(`${API_BASE_URL}/quiz?level=${level}&numQ=10`);
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
  }, []);
  return (
    <div className="container">
      {questions.length > 0 && (
        <Quiz
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
            <button className="button">
                Home
            </button>
          </Link>
        </>
      )}
      {submitted && <Result questions={questions} answers={answers} />}
    </div>
  );
}

export default StartQuiz;
