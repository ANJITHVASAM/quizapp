import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import "./components.css";
import { useEffect } from "react";

function Quiz({ language, questions, answers, setAnswers, submitted }) {

  const navigate = useNavigate();

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      navigate("/", { replace: true });
    }
  },[navigate]);
  return (
    <div>
      <h1 className="main-heading">You Chose <b className="main-heading-bold">{language}</b></h1>
      {questions.map((q, index) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={index}
          answers={answers}
          setAnswers={setAnswers}
          submitted={submitted}
        />
      ))}
    </div>
  );
}

export default Quiz;
