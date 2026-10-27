import { useEffect, useRef, useState } from "react";
import "./components.css";
import Quiz from "./Quiz";
import Result from "./Results";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://quizapp-backend-gcjy.onrender.com";

function StartQuiz({ level, language, noOfQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  const navigate = useNavigate();
  const resultsRef = useRef(null);
  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const startQuiz = async () => {
    try {
      if (!language || !level) {
        navigate("/", { replace: true });
        return;
      }

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
    } finally{
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
    if (language && level && noOfQuestions) {
      startQuiz();
    }
  }, [level, language, noOfQuestions]);

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
              {/* <button onClick={() => navigate("/")} className="button">Go Home</button> */}
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
