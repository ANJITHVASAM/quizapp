import { Link } from "react-router-dom";
import "./components.css";

function Result({ questions, answers }) {
  const score = questions.filter((q) => answers[q.id] === q.rightAnswer).length;

  return (
    <div className="card">
      <h2>Result</h2>
      <p>
        Your Score: {score} / {questions.length}
      </p>
      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default Result;
