import { use, useState } from "react";
import "./components.css";

function QuestionCard({ question, index, answers, setAnswers, submitted }) {
  const [sel,setSel]=useState(false);
  const handleChange = (value) => {
    setAnswers({ ...answers, [question.id]: value });
    setSel(value===question.rightAnswer);
  };
  return (
    <div className="options">
      <h4 className="question-title">
        {index + 1}. {question.questionTitle}
      </h4>
      {[
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ].map((opt) => (
        <label key={opt} className="option">
          <input className="checkbox" type="checkbox" name={`q-${question.id}`} value={opt} disabled={submitted} 
                checked={answers[question.id] === opt} onChange={() => handleChange(opt)}
          />
          {opt}
        </label>
      ))}
      {submitted && sel && (<p>Correct Answer: <b className="right-answer">{question.rightAnswer}</b></p>)}
      {submitted && !sel && (<p>Correct Answer: <b className="wrong-answer">{question.rightAnswer}</b></p>)}
    </div>
  );
}

export default QuestionCard;
