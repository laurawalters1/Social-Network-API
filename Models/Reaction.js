const { ObjectId } = require("bson");
const { Schema } = require("mongoose");

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

reactionSchema
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

module.exports = reactionSchema;
