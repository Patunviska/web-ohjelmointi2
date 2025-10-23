import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // luetaan .env-tiedostosta , siellä on oma localhostin osoite
});

export const haeUrheilijat = () => api.get("/urheilijat").then((r) => r.data);
export const lisaaUrheilija = (data) =>
  api.post("/urheilijat", data).then((r) => r.data);
export const paivitaUrheilija = (id, data) =>
  api.put(`/urheilijat/${id}`, data).then((r) => r.data);
export const poistaUrheilija = (id) =>
  api.delete(`/urheilijat/${id}`).then((r) => r.status === 204);
