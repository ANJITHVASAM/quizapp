import { Link } from "react-router-dom";
import "./components.css";
import { useState } from "react";

function HomePage({ level, setLevel, language, setLanguage, noOfQuestions, setNoOfQuestions }) {

  // Logic inverted: initially false means warnings are hidden
  const [showLanguageWarning, setShowLanguageWarning] = useState(false);
  const [showLevelWarning, setShowLevelWarning] = useState(false);
  
  return (
    <div className="container">
      <h1 className="main-heading">Student Quiz App</h1>
      <div className="hero">
        <div className="hero-badge">🧑‍💻 9 Programming Languages</div>
        <h1 className="hero-h1">Level Up Your <span className="g">Coding Skills</span></h1>
        <p className="hero-p">Test yourself across HTML, CSS, JavaScript, Java, Python, SQL, C, React & PHP. Real questions. Three difficulty levels.</p>
      </div>
      
      <div className="options">
        <h2 className="question-title">Choose The Language</h2>
        <select
          className="selectOption"
          value={language || ""}
          onChange={(e) => {
            setLanguage(e.target.value);
            setShowLanguageWarning(false); // Hide warning once selected
          }}
          onBlur={() => !language && setShowLanguageWarning(true)} // Show warning if skipped
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
        {/* Fixed CSS class logic */}
        <p className={`warning-message-${showLanguageWarning ? 'show' : 'hide'}`} style={{color:'red', fontSize:'10px'}}>*Please Select Language</p>
        
        <h2 className="question-title">Select Difficulty</h2>
        <select
          className="selectOption"
          value={level || ""}
          onChange={(e) => {
            setLevel(e.target.value);
            setShowLevelWarning(false); // Hide warning once selected
          }}
          onBlur={() => !level && setShowLevelWarning(true)} // Show warning if skipped
        >
          <option value="" disabled>Select Level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {/* Fixed CSS class logic */}
        <p className={`warning-message-${showLevelWarning ? 'show' : 'hide'}`} style={{color:'red', fontSize:'10px'}}>*Please Select Level</p>
        
        <h2 className="question-title">Select Questions</h2>
        <input 
          className="selectNoOfQuestions" 
          type="number" 
          defaultValue="5" // Fully controlled input
          min={1} 
          max={15}
          onChange={(e) => setNoOfQuestions(Number(e.target.value))}
        />
        <br />
        <Link to="/quiz">
          <button className="button" disabled={!level || !language}>Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
