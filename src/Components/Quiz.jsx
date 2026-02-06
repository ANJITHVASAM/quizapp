import QuestionCard from "./QuestionCard";
import "./components.css";

function Quiz({ language ,questions, answers, setAnswers, submitted }) {
  return (
    <div>
      <h1 className="main-heading">You Choosed <b className="main-heading-bold">{language}</b></h1>
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
