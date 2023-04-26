const express = require("express");

const animeListController = require("../controllers/myAnimeList.js");

const router = express.Router();

router
  .route("/")
    .get(animeListController.getAllNews)
//   .post(animeListController.createUser);

// router.route("/:id").get(userController.getUser);

module.exports = router;
