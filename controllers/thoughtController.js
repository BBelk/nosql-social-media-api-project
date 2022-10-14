const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts({ params, body }, res) {
        try {
            const allThoughts = await Thought.find({})

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
                .populate('user');
            res.json(thoughtData);
        }
        catch (err) {
            res.json(err);
        }
    },

    // add thought (comment) to user
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
};