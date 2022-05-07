const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      unique: true,
      match: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z){2,8})(\.[a-z]{2,8}?)$/,
      required: true,
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [this],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // id: false,
  }
);

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model("user", userSchema);

module.exports = User;
