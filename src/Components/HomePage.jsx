import { Link } from "react-router-dom";
import "./components.css";

function HomePage({level, setLevel}) {

  return (
    <div className="container">
      <h1>Student Quiz App</h1>
      <div className="card">
        <h3>Select Difficulty</h3>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <Link to="/quiz">
            <button className="button">Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;