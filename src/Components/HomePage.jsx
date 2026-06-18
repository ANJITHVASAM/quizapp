import { Link } from "react-router-dom";
import "./components.css";

function HomePage({level, setLevel, language, setLanguage, noOfQuestions, setNoOfQuestions }) {

  return (
    <div className="container">
      <h1 className="main-heading">Student Quiz App</h1>
      <div class="hero">
        <div class="hero-badge">🧑‍💻 9 Programming Languages</div>
        <h1 class="hero-h1">Level Up Your<span class="g">Coding Skills</span></h1>
        <p class="hero-p">Test yourself across HTML, CSS, JavaScript, Java, Python, SQL, C, React & PHP. Real questions. Three difficulty levels.</p>
      </div>
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
        <h2 className="question-title">Select Questions</h2>
        <input 
          className="selectNoOfQuestions" 
          type="number" 
          defaultValue={5} 
          min={1} 
          max={40}
          onChange={(e) => setNoOfQuestions(e.target.value)}
        />
        <br />
        <Link to="/quiz">
            <button className="button" disabled={!level || !language}>Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage
