const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ReactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: true,
          max: 280
      },
      username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now
      }
  },
  {
      toJSON: {
          getters: true
      },
      id: false
  }
);


const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;