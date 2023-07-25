import { useState } from "react";

const messages = ["learn react", "interviews", "invest your income"];

export default function App() {
  const [step, setsTep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    if (step > 1) {
      setsTep(step - 1);
    }
  }
  function handleNext() {
    if (step === 3) {
      return;
    }
    setsTep(step + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <div className="message">
            Step {step}: {messages[step - 1]}
          </div>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
