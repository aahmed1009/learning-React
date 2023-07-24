const messages = ["learn react", "interviews", "invest your income"];

export default function App() {
  const step = 2;
  return (
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
          onClick={() => alert("back back back aaaa")}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Previous
        </button>
        <button
          onClick={() => alert("next next next aaaa")}
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
