const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// thoughtText

// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual("formatTime")
  // Getter
  .get(function () {
    return (
      this.date.getHours() +
      ":" +
      this.date.getMinutes() +
      ", " +
      this.date.toDateString()
    );
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
