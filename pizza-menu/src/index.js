import React from "react";
import ReactDOM from "react-dom/client";
function App() {
  return (
    <div>
      <h1>hello world</h1>
      <Pizaa />
    </div>
  );
}

function Pizaa() {
  return (
    <div>
      <h2>hello pizaa</h2>
      <img src="pizzasimages/spinaci.jpg" alt="pizza1" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
