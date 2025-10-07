import { useState } from "react";
import AddWordForm from "./components/AddWordForm";
import TranslateForm from "./components/TranslateForm";
import "./App.css";

export default function App() {
  const [view, setView] = useState("translate");

  return (
    <main className="container">
      <h1>Sanakirja UI</h1>

      <div className="tabs">
        <button
          className={view === "translate" ? "active" : ""}
          onClick={() => setView("translate")}
        >
          Haku
        </button>
        <button
          className={view === "add" ? "active" : ""}
          onClick={() => setView("add")}
        >
          Lisää sana
        </button>
      </div>

      {view === "translate" ? <TranslateForm /> : <AddWordForm />}

      <p className="hint">Backend: http://localhost:3000</p>
    </main>
  );
}
