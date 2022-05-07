const { User, Thought, Reaction } = require("../Models");
const reactionSchema = require("../Models/Reaction");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      //   .select("-__v")
      //   .populate("reactions")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought);
        console.log(req.body);

        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((reaction) =>
          // !reaction
          //   ? res.status(404).json("unsuccessful")
          //   : res.status(200).json(reaction)
          res.json(reaction)
        );
      })

      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a user
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought with that ID" })
              : //   : Thought.deleteMany({ _id: { $in: user.thoughts } })
                //   )
                console.log("deleted")
          )

          .then(() => res.json({ message: "Thought deleted!" }))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // /api/users/:userId/friends/:friendId

  // POST to add a new friend to a user's friend list

  // DELETE to remove a friend from a user's friend list

  addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      //   { _id: req.params.thoughtId },
      //   { $pull: { reactions: req.params.reactionId } },
      //   { new: true }

      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: "No reaction found with that ID :(" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};
