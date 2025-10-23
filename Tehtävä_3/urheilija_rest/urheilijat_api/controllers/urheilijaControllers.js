const Urheilija = require("../models/Urheilija");

exports.getAll = async (req, res, next) => {
  try {
    res.json(await Urheilija.findAll());
  } catch (e) {
    next(e);
  }
};
exports.getOne = async (req, res, next) => {
  try {
    const row = await Urheilija.findById(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    next(e);
  }
};
exports.create = async (req, res, next) => {
  try {
    if (!req.body.etunimi || !req.body.sukunimi)
      return res.status(400).json({ error: "etunimi ja sukunimi pakollisia" });
    const created = await Urheilija.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};
exports.update = async (req, res, next) => {
  try {
    const existing = await Urheilija.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Not found" });
    const updated = await Urheilija.update(req.params.id, {
      ...existing,
      ...req.body,
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};
exports.remove = async (req, res, next) => {
  try {
    const ok = await Urheilija.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
