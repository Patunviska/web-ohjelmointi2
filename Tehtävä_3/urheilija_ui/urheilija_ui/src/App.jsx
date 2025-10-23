import { useState, useEffect } from "react";
import { UrheiluProvider } from "./context/UrheiluContext";
import useUrheilijat from "./hooks/useUrheilijat";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container">
        <span className="navbar-brand">Urheilijat</span>
      </div>
    </nav>
  );
}

function Lista({ onEdit }) {
  const { urheilijat, poista } = useUrheilijat();
  if (!urheilijat.length)
    return <div className="alert alert-info">Ei urheilijoita vielä</div>;

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("fi-FI") : "");

  return (
    <div className="row g-3">
      {urheilijat.map((u) => (
        <div className="col-md-4" key={u.id}>
          <div className="card h-100 shadow-sm">
            {u.kuva_url && (
              <img
                src={u.kuva_url}
                alt={`${u.etunimi} ${u.sukunimi}`}
                className="img-fluid rounded-top"
                style={{ maxHeight: "100px", objectFit: "contain" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
            <div className="card-body">
              <h5 className="card-title mb-1">
                {u.etunimi} {u.sukunimi}
              </h5>
              {u.kutsumanimi && (
                <div className="text-muted">{u.kutsumanimi}</div>
              )}
              {u.laji && (
                <span className="badge bg-info text-dark">{u.laji}</span>
              )}
              <div className="small text-muted">
                {u.syntyma && <>Synt.: {fmt(u.syntyma)} · </>}
                {u.paino && <>Paino: {u.paino} kg</>}
              </div>
              {u.saavutukset && (
                <p className="small mt-2 mb-0">{u.saavutukset}</p>
              )}
            </div>
            <div className="card-footer d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEdit(u)}
              >
                Muokkaa
              </button>
              <button
                className="btn btn-sm btn-outline-danger ms-auto"
                onClick={() => poista(u.id)}
              >
                Poista
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LisaysLomake({ editing, onDone }) {
  const { lisaa, paivita } = useUrheilijat();
  const [f, setF] = useState({
    etunimi: "",
    sukunimi: "",
    kutsumanimi: "",
    syntyma: "",
    paino: "",
    kuva_url: "",
    laji: "",
    saavutukset: "",
  });

  // täytä lomake muokattavalla rivillä
  useEffect(() => {
    setF(
      editing
        ? {
            etunimi: editing.etunimi || "",
            sukunimi: editing.sukunimi || "",
            kutsumanimi: editing.kutsumanimi || "",
            syntyma: editing.syntyma ? editing.syntyma.slice(0, 10) : "", // YYYY-MM-DD
            paino: editing.paino ?? "",
            kuva_url: editing.kuva_url || "",
            laji: editing.laji || "",
            saavutukset: editing.saavutukset || "",
          }
        : {
            etunimi: "",
            sukunimi: "",
            kutsumanimi: "",
            syntyma: "",
            paino: "",
            kuva_url: "",
            laji: "",
            saavutukset: "",
          }
    );
  }, [editing]);

  const ch = (e) => setF((v) => ({ ...v, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...f,
      paino: f.paino ? Number(f.paino) : null,
      syntyma: f.syntyma || null,
    };
    if (editing?.id) await paivita(editing.id, payload);
    else await lisaa(payload);
    onDone?.(); // nollaa muokkaustilan
    setF({
      etunimi: "",
      sukunimi: "",
      kutsumanimi: "",
      syntyma: "",
      paino: "",
      kuva_url: "",
      laji: "",
      saavutukset: "",
    });
  };

  return (
    <form onSubmit={submit} className="card card-body mb-3">
      <div className="row g-2">
        <div className="col-md-6">
          <input
            className="form-control"
            name="etunimi"
            placeholder="Etunimi"
            value={f.etunimi}
            onChange={ch}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            name="sukunimi"
            placeholder="Sukunimi"
            value={f.sukunimi}
            onChange={ch}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            name="kutsumanimi"
            placeholder="Kutsumanimi"
            value={f.kutsumanimi}
            onChange={ch}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            type="date"
            name="syntyma"
            value={f.syntyma}
            onChange={ch}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            step="0.1"
            name="paino"
            placeholder="Paino (kg)"
            value={f.paino}
            onChange={ch}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            name="laji"
            placeholder="Laji"
            value={f.laji}
            onChange={ch}
          />
        </div>
        <div className="col-12">
          <input
            className="form-control"
            name="kuva_url"
            placeholder="Kuva URL"
            value={f.kuva_url}
            onChange={ch}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            rows="2"
            name="saavutukset"
            placeholder="Saavutukset"
            value={f.saavutukset}
            onChange={ch}
          />
        </div>
      </div>
      <div className="mt-2 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {editing ? "Tallenna" : "Lisää"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onDone?.()}
          >
            Peru
          </button>
        )}
      </div>
    </form>
  );
}

export default function App() {
  const [editing, setEditing] = useState(null);
  return (
    <UrheiluProvider>
      <Navbar />
      <div className="container py-4">
        <h1 className="mb-4">Urheilijat</h1>
        <LisaysLomake editing={editing} onDone={() => setEditing(null)} />
        <Lista onEdit={setEditing} />
      </div>
    </UrheiluProvider>
  );
}
