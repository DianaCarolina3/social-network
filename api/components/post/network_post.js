const express = require("express");

const auth = require("./secure");
const controller = require("./index");
const response = require("../../../network/response");

const router = express.Router();

// ROUTER
router.get("/", list);
router.get("/:id", get);
router.get("/:id/like", postsLiked);
router.post("/", auth("send"), upsert);
router.post("/like/:id", auth("like"), like);
// router.put("/", auth("update"), upsert);

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  controller
    .upsert(req.user.id, req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function like(req, res, next) {
  controller
    .like(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function postsLiked(req, res, next) {
  controller
    .postsLiked(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
