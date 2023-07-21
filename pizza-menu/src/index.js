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
  return <h1>hello pizza</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
