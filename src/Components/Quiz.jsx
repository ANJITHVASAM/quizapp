import QuestionCard from "./QuestionCard";
import "./components.css";

function Quiz({ questions, answers, setAnswers, submitted }) {
  
  return (
    <div>
      {questions.map((q, index) => (
        <QuestionCard key={q.id} question={q} index={index} answers={answers} setAnswers={setAnswers} submitted={submitted} />
      ))}
    </div>
  );
}

export default Quiz;
