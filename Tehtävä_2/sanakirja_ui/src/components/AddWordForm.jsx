import { useState } from "react";
import { addWord } from "../api";

export default function AddWordForm() {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("Tallennetaan…");
    try {
      await addWord(fin.trim(), eng.trim());
      setMsg("Sana lisätty");
      setFin("");
      setEng("");
    } catch (err) {
      setMsg(` ${err.message}`);
    }
  }

  const disabled = !fin.trim() || !eng.trim();

  return (
    <div className="card">
      <h2>Lisää sana</h2>
      <form onSubmit={handleSubmit} className="grid">
        <label>
          Suomenkielinen
          <input
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            placeholder="esim. koira"
          />
        </label>
        <label>
          Englanninkielinen
          <input
            value={eng}
            onChange={(e) => setEng(e.target.value)}
            placeholder="esim. dog"
          />
        </label>
        <button disabled={disabled}>Lisää</button>
      </form>
      {msg && <p className="status">{msg}</p>}
    </div>
  );
}
