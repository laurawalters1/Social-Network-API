const router = require("express").Router();

// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController.js");

// /api/courses
router.route("/").get(getThoughts).post(createThought);

// /api/courses/:courseId
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
