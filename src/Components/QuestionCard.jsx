import "./components.css";

function QuestionCard({ question, index, answers, setAnswers, submitted }) {
  const handleChange = (value) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  return (
    <div className="card">
      <h4>
        {index + 1}. {question.questionTitle}
      </h4>
      {[
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ].map((opt) => (
        <label key={opt} className="option">
          <input type="radio" name={`q-${question.id}`} value={opt} disabled={submitted} 
                checked={answers[question.id] === opt} onChange={() => handleChange(opt)}
          />
          {opt}
        </label>
      ))}
      {submitted && (<p>Correct Answer: <b>{question.rightAnswer}</b></p>)}
    </div>
  );
}

export default QuestionCard;
