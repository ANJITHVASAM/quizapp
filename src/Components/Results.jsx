import { Link } from "react-router-dom";
import "./components.css";

function Result({ questions, answers }) {
  const score = questions.filter((q) => answers[q.id] === q.rightAnswer).length;

  return (
    <div className="options">
      <h2 className="question-title">Result</h2>
      <p className="score">
        Your Score: <b>{score} / {questions.length}</b>
      </p>
      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default Result;
