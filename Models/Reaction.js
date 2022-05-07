const { ObjectId } = require("bson");
const { Schema, Types } = require("mongoose");
const moment = require("moment");
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
      default: Types.ObjectId(),
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
      get: (createdAt) => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// reactionSchema
//   .virtual("formatTime")
//   // Getter
//   .get(function () {
//     return moment(createdAt)
//   });

module.exports = reactionSchema;
