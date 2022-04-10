const { Schema, model } = require('mongoose');

const formatTimeStamp = require('../utils/helpers')

// Schema to create Student model
const thoughtSchema = new Schema(
  {
   thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
   createdAt: {
      type: Date,
      default: Date.now(),
      get: function(time) {
        formatTimeStamp(time)
      } 
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {

      getters: true,
    },
    id: false,
  },
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
