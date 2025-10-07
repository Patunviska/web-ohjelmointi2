const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

const DICT_PATH = path.join(__dirname, "sanakirja.txt");

// lukee sanan tiedostosta sanakirja.txt
function loadDictionarySync() {
  try {
    const data = fs.readFileSync(DICT_PATH, "utf8");
    const list = [];
    const map = new Map();
    for (const line of data.split(/\r?\n/)) {
      const t = line.trim();
      if (!t) continue;
      const [fin, eng] = t.split(/\s+/);
      if (!fin || !eng) continue;
      list.push({ fin, eng });
      map.set(fin.toLowerCase(), eng);
    }
    return { list, map };
  } catch (e) {
    if (e.code === "ENOENT") {
      fs.writeFileSync(DICT_PATH, "", "utf8");
      return { list: [], map: new Map() };
    }
    throw e;
  }
}

// lisää yhden rivin tiedostoon
function appendWordSync(fin, eng) {
  // luetaan tiedoston sisältö
  const data = fs.readFileSync(DICT_PATH, "utf8");
  let needsNewline = data.length > 0 && !data.endsWith("\n");

  // jos ei ole rivinvaihtoa lopussa, lisää sellaisen
  //muuten uudet sanat menee pötköön eikä homma toimi kunnolla
  const line = (needsNewline ? "\n" : "") + `${fin} ${eng}\n`;

  fs.appendFileSync(DICT_PATH, line, "utf8");
}

// GET: koko sanakirja
app.get("/words", (req, res) => {
  try {
    const { list } = loadDictionarySync();
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Palvelinvirhe" });
  }
});

// GET: käännös esimerkiksi /translate?fi=koira
app.get("/translate", (req, res) => {
  const fi = (req.query.fi || "").toString().trim().toLowerCase();
  if (!fi) return res.status(400).json({ error: "Anna parametri fi" });

  try {
    const { map } = loadDictionarySync();
    const en = map.get(fi);
    if (!en) return res.status(404).json({ error: "Ei löydy" });
    res.json({ fi, en });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Palvelinvirhe" });
  }
});

// POST: lisää sana tyyliin: { fin, eng }
app.post("/words", (req, res) => {
  const fin = (req.body?.fin || "").toString().trim();
  const eng = (req.body?.eng || "").toString().trim();
  if (!fin || !eng)
    return res.status(400).json({ error: "fin ja eng pakollisia" });

  try {
    const { map } = loadDictionarySync();
    if (map.has(fin.toLowerCase())) {
      return res.status(409).json({ error: "Sana on jo olemassa" });
    }
    appendWordSync(fin, eng);
    res.status(201).json({ added: { fin, eng } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Palvelinvirhe" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sanakirja-API kuuntelee portissa ${PORT}`);
});
