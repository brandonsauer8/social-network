const { User, Thought } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // getting one thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            // if no thought is found
            if (!dbThoughtData) {
            res.status(404).json({ message: "There is no thought associated with this Id" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // creating a thought
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res.status(404).json({ message: "There is no user associated with this Id." });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    //updating a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res.status(404).json({ message: "There is no thought associated with this Id." });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // deleting a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res.status(404).json({ message: "There is no thought associated with this Id." });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // adding a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res.status(404).json({ message: "No thought with this id" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    //deleting a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;