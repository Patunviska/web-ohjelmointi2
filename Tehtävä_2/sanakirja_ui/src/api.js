const BASE_URL = "http://localhost:3000";

export async function addWord(fin, eng) {
  const res = await fetch(`${BASE_URL}/words`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fin, eng }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Virhe lisäyksessä");
  return data;
}

export async function translateFi(fi) {
  const url = new URL(`${BASE_URL}/translate`);
  url.searchParams.set("fi", fi);
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Käännöstä ei löytynyt");
  return data;
}

export async function getAllWords() {
  const res = await fetch(`${BASE_URL}/words`);
  const data = await res.json();
  if (!res.ok) throw new Error("Sanakirjan haku epäonnistui");
  return data;
}
