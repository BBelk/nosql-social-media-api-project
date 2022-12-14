const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts({ params, body }, res) {
        try {
            const allThoughts = await Thought.find({})
            .select('-__v');
            if (!allThoughts.length) {
                res.json({ message: 'No thoughts to share!' });
                return;
            }
            res.json(allThoughts);
        }
        catch (err) {
            res.json(err);
        }
    },

    async getThoughtById({ params }, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: params.thoughtId }
            )
            .select('-__v')
            .populate('user');
            res.json(thoughtData);
        }
        catch (err) {
            res.json(err);
        }
    },

    async addThought({ params, body }, res) {
        try {
            const addThought = await Thought.create(body);
            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: addThought._id } },
                { new: true, runValidators: true }
            );
            addThought.user = userData;
            await addThought.save();
            res.send(addThought);
        }
        catch (err) {
            res.json(err);
        }
    },

    
    async updateThought({ params, body }, res) {
      try {
          const thoughtData = await Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true });
          res.json(thoughtData);
      }
      catch (err) {
          res.json(err);
      }
  },

  async removeThought({ params }, res) {
    try {
        const thoughtData = await Thought.findOneAndDelete(
            { _id: params.thoughtId }
        )
        await thoughtData.save();
        res.json(thoughtData);
    }
    catch (err) {
        res.json(err);
    }
},

  async addReaction({ params, body }, res) {
      try {

          const thoughtData = await Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { reactions: body } },
              { new: true, runValidators: true }
          )
          res.json(thoughtData);
      }
      catch (err) {
          res.json(err);
      }
  },

  async removeReaction({ params }, res) {
      try {
          const thoughtData = await Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { reactions: { reactionId: params.reactionId } } },
              { new: true, runValidators: true }
          );
          const reactionToRemove = await Reaction.deleteOne({
            reactionId: params.reactionId
          });
          res.json(thoughtData);
      }
      catch (err) {
          res.json(err);
      }
  }, 
};