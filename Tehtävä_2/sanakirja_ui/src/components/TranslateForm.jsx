import { useState } from "react";
import { translateFi, getAllWords } from "../api";

export default function TranslateForm() {
  const [fi, setFi] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");
  const [list, setList] = useState(null);

  async function handleTranslate() {
    setMsg("Haetaan…");
    setResult(null);
    try {
      const data = await translateFi(fi.trim());
      setResult(`${data.fi} → ${data.en}`);
      setMsg("");
    } catch (err) {
      setMsg(` ${err.message}`);
    }
  }

  async function handleLoadAll() {
    setMsg("Ladataan sanakirja…");
    try {
      const data = await getAllWords();
      setList(data);
      setMsg("");
    } catch (err) {
      setMsg(` ${err.message}`);
    }
  }

  return (
    <div className="card">
      <h2>Hae käännös (suomi → englanti)</h2>
      <div className="grid">
        <input
          value={fi}
          onChange={(e) => setFi(e.target.value)}
          placeholder="kirjoita suomenkielinen sana"
        />
        <button disabled={!fi.trim()} onClick={handleTranslate}>
          Hae
        </button>
        {result && <p className="ok"> {result}</p>}
        {msg && <p className="status">{msg}</p>}
      </div>

      <hr />

      <button onClick={handleLoadAll}>Näytä kaikki sanat</button>
      {Array.isArray(list) && (
        <ul className="list">
          {list.map((w, i) => (
            <li key={i}>
              {w.fin} → {w.eng}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
