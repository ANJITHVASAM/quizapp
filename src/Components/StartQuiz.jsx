import { useEffect, useRef, useState } from "react";
import "./components.css";
import Quiz from "./Quiz";
import Result from "./Results";
import { Link, useNavigate, useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://quizapp-backend-gcjy.onrender.com";

function StartQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultsRef = useRef(null);
  const hasFetched = useRef(false);

  const { language, level, noOfQuestions } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location.state || !language || !level || !noOfQuestions) {
      navigate("/", { replace: true });
    }
  }, [location.state, language, level, noOfQuestions, navigate]);

  const startQuiz = async () => {
    if (!language || !level) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/questions/quiz?language=${language}&level=${level}&numQ=${noOfQuestions}`
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setQuestions(data);
      setSubmitted(false);
      setAnswers({});
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (language && level && noOfQuestions && !hasFetched.current) {
      hasFetched.current = true;
      startQuiz();
    }
  }, [level, language, noOfQuestions]);

  if (!location.state || !language || !level || !noOfQuestions) {
    return null;
  }

  if (loading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {questions.length > 0 ? (
        <>
          <Quiz
            language={language}
            questions={questions}
            answers={answers}
            setAnswers={setAnswers}
            submitted={submitted}
          />

          {!submitted ? (
            <div className="button-group">
              <button onClick={submitQuiz} className="button">
                Submit Quiz
              </button>
              <Link to="/">
                <button className="button">Home</button>
              </Link>
            </div>
          ) : (
            <div ref={resultsRef}>
              <Result questions={questions} answers={answers} />
            </div>
          )}
        </>
      ) : (
        <div className="container">
          <div className="options">
            <p className="main-heading">No questions found for <b className="to-capital">{language} ({level})</b>.</p>
            <Link to="/"><button className="button">Back</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartQuiz;
