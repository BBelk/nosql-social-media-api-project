const { Schema, model, Types } = require('mongoose');
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
            default: Date.now,
            get: (date) => {
                return new Date(date).toLocaleString();
            }
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
  );
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
            default: Date.now,
            get: (date) => {
                return new Date(date).toLocaleString();
            }
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

ThoughtSchema.virtual('reactionCount').get(function() {
    if (this.reactions.length > 0) {
        return this.reactions.length;
    } else {
        return 0;
    }
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;