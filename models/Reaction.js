const { Schema, model } = require('mongoose');

const formatTimeStamp = require('../utils/helpers')

const reactionSchema = new Schema(
  {
   reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
    },
   reactionBody: {
      type: String,
      required: true,
      maxLength: 280
      } ,

    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
      default: Date.now(),
      get: function(time) {
        formatTimeStamp(time)
    }
  },
},
  {
    toJSON: {

      getters: true,
    },
    id: false,
  },
);

// const Reaction = model('Reaction', reactionSchema);

module.exports = reactionSchema;
