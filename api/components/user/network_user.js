const express = require("express");

const auth = require("./secure");
const controller = require("./index");
const response = require("../../../network/response");

const router = express.Router();

// ROUTES
router.get("/", list);
router.get("/:id", get);
router.get("/:id/follow", followers);
router.post("/follow/:id", auth("follow"), follow);
router.post("/", upsert);
router.put("/", auth("update"), upsert);
router.delete("/:id", auth("delete"), remove);

function list(req, res, next) {
  controller
    .list()
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  controller
    .upsert(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function follow(req, res, next) {
  controller
    .follow(req.user.id, req.params.id)
    .then((info) => {
      response.success(req, res, info, 201);
    })
    .catch(next);
}

function followers(req, res, next) {
  controller
    .followers(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function remove(req, res) {
  controller
    .remove(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
