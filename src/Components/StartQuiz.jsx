import { useEffect, useRef, useState } from "react";
import "./components.css";
import Quiz from "./Quiz";
import Result from "./Results";
import { Link, useNavigate } from "react-router-dom";

// 1. Correct way to access the Environment Variable (Vite example)
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://quizapp-backend-gcjy.onrender.com";

function StartQuiz({ level, language }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  const navigate = useNavigate();
  const resultsRef = useRef(null);

  const startQuiz = async () => {
    try {
      setLoading(true);
      // 2. Ensure the path matches your Spring Boot @RequestMapping("/questions")
      const res = await fetch(
        `${API_BASE_URL}/questions/quiz?language=${language}&level=${level}&numQ=5`
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
    // Scroll to results after a short delay to let the component render
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    startQuiz();
  }, [level, language]); // Re-run if level or language changes

  if (loading) return <div className="container"><div className="options"><h3 className="main-heading">Loading Quiz...</h3></div></div>;

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
              <button onClick={() => navigate("/")} className="button">Go Home</button>
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
