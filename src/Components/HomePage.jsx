import { Link } from "react-router-dom";
import "./components.css";

function HomePage({level, setLevel, language, setLanguage}) {

  return (
    <div className="container">
      <h1 className="main-heading">Student Quiz App</h1>
      <div className="options">
        <h2 className="question-title">Choose The Language</h2>
        <select
          className="selectOption"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="" disabled>Select Language</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
          <option value="c">C</option>
          <option value="react">React</option>
          <option value="php">PHP</option>
          <option value="javascript">JavaScript</option>
        </select>
        <h2 className="question-title">Select Difficulty</h2>
        <select
          className="selectOption"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="" disabled>Select Level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        {/* <Link to="/quiz">
            <button className="button" disabled={!level || !language}>Start Quiz</button>
        </Link> */}
      </div>
    </div>
  );
}

export default HomePage
