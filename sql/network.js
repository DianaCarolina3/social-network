const express = require("express");
//crea funciones de la tabla

const response = require("../network/response");
const Store = require("../store/mysql");

const router = express.Router();

//ROUTER

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", upsert);
router.put("/:table", upsert);
router.delete("/:table/:id", remove);

async function list(req, res, next) {
  const data = await Store.list(req.params.table);
  response.success(req, res, data, 200);
}

async function get(req, res, next) {
  const data = await Store.get(req.params.table, req.params.id);
  response.success(req, res, data, 200);
}

async function upsert(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body);
  response.success(req, res, data, 200);
}

async function remove(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body);
  response.success(req, res, data, 200);
}

module.exports = router;
