const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");

// Thought Model
// // thoughtText
// // // String
// // // Required
// // // Must be between 1 and 280 characters
// // createdAt
// // // Date
// // // Set default value to the current timestamp
// // // Use a getter method to format the timestamp on query
// // username (The user that created this thought)
// // // String
// // // Required
// // reactions (These are like replies)
// // // Array of nested documents created with the reactionSchema

const formatDate = require("../utils/formatDate");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format timestamp on query
      get: (createdAtVal) => {
        return formatDate(createdAtVal);
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// // Schema Settings
// // // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
