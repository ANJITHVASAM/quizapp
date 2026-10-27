import { useEffect, useRef, useState } from "react";
import "./components.css";
import Quiz from "./Quiz";
import Result from "./Results";
import { Link, useNavigate, useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://onrender.com";

function StartQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultsRef = useRef(null);
  const hasFetched = useRef(false);

  const initialLanguage = location.state?.language || sessionStorage.getItem("quiz_language") || "";
  const initialLevel = location.state?.level || sessionStorage.getItem("quiz_level") || "";
  const initialNoOfQuestions = location.state?.noOfQuestions || sessionStorage.getItem("quiz_noOfQuestions") || "5";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.language) {
      sessionStorage.setItem("quiz_language", location.state.language);
      sessionStorage.setItem("quiz_level", location.state.level);
      sessionStorage.setItem("quiz_noOfQuestions", String(location.state.noOfQuestions));
    }
  }, [location.state]);

  useEffect(() => {
    if (!initialLanguage || !initialLevel) {
      navigate("/", { replace: true });
    }
  }, [initialLanguage, initialLevel, navigate]);

  const startQuiz = async () => {
    if (!initialLanguage || !initialLevel) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/questions/quiz?language=${initialLanguage}&level=${initialLevel}&numQ=${initialNoOfQuestions}`
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
    if (initialLanguage && initialLevel && initialNoOfQuestions && !hasFetched.current) {
      hasFetched.current = true;
      startQuiz();
    }
  }, [initialLanguage, initialLevel, initialNoOfQuestions]);

  if (!initialLanguage || !initialLevel) {
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
            language={initialLanguage}
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
            <p className="main-heading">
              No questions found for <b className="to-capital">{initialLanguage} ({initialLevel})</b>.
            </p>
            <Link to="/"><button className="button">Back</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartQuiz;
