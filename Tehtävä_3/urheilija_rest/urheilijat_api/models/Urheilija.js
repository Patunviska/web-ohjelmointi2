const pool = require("../config/db");

const fields =
  "id, etunimi, sukunimi, kutsumanimi, syntyma, paino, kuva_url, laji, saavutukset";

module.exports = {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT ${fields} FROM urheilijat ORDER BY id DESC`
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query(
      `SELECT ${fields} FROM urheilijat WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },
  async create(data) {
    const {
      etunimi,
      sukunimi,
      kutsumanimi,
      syntyma,
      paino,
      kuva_url,
      laji,
      saavutukset,
    } = data;
    const [res] = await pool.query(
      `INSERT INTO urheilijat (etunimi, sukunimi, kutsumanimi, syntyma, paino, kuva_url, laji, saavutukset)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        etunimi,
        sukunimi,
        kutsumanimi || null,
        syntyma || null,
        paino || null,
        kuva_url || null,
        laji || null,
        saavutukset || null,
      ]
    );
    return this.findById(res.insertId);
  },
  async update(id, data) {
    const {
      etunimi,
      sukunimi,
      kutsumanimi,
      syntyma,
      paino,
      kuva_url,
      laji,
      saavutukset,
    } = data;
    await pool.query(
      `UPDATE urheilijat SET etunimi=?, sukunimi=?, kutsumanimi=?, syntyma=?, paino=?, kuva_url=?, laji=?, saavutukset=? WHERE id=?`,
      [
        etunimi,
        sukunimi,
        kutsumanimi || null,
        syntyma || null,
        paino || null,
        kuva_url || null,
        laji || null,
        saavutukset || null,
        id,
      ]
    );
    return this.findById(id);
  },
  async remove(id) {
    const [res] = await pool.query(`DELETE FROM urheilijat WHERE id = ?`, [id]);
    return res.affectedRows > 0;
  },
};
