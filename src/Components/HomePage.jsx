import { Link,useNavigate } from "react-router-dom";
import "./components.css";
import { useState } from "react";

function HomePage({ level, setLevel, language, setLanguage, noOfQuestions, setNoOfQuestions }) {

  const navigate = useNavigate();

  const [showLanguageWarning, setShowLanguageWarning] = useState(false);
  const [showLevelWarning, setShowLevelWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!language) setShowLanguageWarning(true);
      if (!level) setShowLevelWarning(true);
      console.log("Form submitted with values:", { level, language, noOfQuestions });
      if(level && language) navigate("/quiz", {state: { level, language, noOfQuestions }});
    }
    catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return (
    <div className="container-wrapper">
      <div className="container">
        <h1 className="main-heading">Student Quiz App</h1>
        <div className="hero">
          <div className="hero-badge">🧑‍💻7 Programming Languages</div>
          <h1 className="hero-h1">Level Up Your <span className="g">Coding Skills</span></h1>
          <p className="hero-p">Test yourself across HTML, CSS, JavaScript, Java, Python, SQL, C, React & PHP. Real questions. Three difficulty levels.</p>
        </div>

        <form id="quiz-form" onSubmit={handleSubmit}>
          <div className="options">
            <label htmlFor="quiz-language">Choose The Language</label>
            <select
              id="quiz-language"
              name="language"
              className="selectOption"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setShowLanguageWarning(false);
              }}
              onBlur={() => !language && setShowLanguageWarning(true)}
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
            {showLanguageWarning && (
              <p className="warning">*Please Select Language</p>
            )}
            {!showLanguageWarning && (
              <p className="warning"></p>
            )}
            <label htmlFor="quiz-level">Select Difficulty</label>
            <select
              id="quiz-level"
              name="level"
              className="selectOption"
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setShowLevelWarning(false);
              }}
              onBlur={() => !level && setShowLevelWarning(true)}
            >
              <option value="" disabled>Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {showLevelWarning && (
              <p className="warning">*Please Select Level</p>
            )}
            {!showLevelWarning && (
              <p className="warning"></p>
            )}

            <label htmlFor="quiz-quantity">Select Questions</label>
            <input
              id="quiz-quantity"
              name="noOfQuestions"
              className="selectNoOfQuestions"
              type="number"
              value={noOfQuestions}
              min={1}
              max={15}
              onChange={(e) => setNoOfQuestions(Number(e.target.value))}
            />
            <br />

            <button
              type="submit"
              className="button"
            >
              Start Quiz
            </button>
          </div>
        </form>

      </div>
    </div >
  );
}

export default HomePage;
