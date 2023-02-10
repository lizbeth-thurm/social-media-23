const { Thought, User, Reaction } = require('../models');

// /api/thoughts
// --------------------------------------------------------
module.exports = {
    // // GET to get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // // GET to get a single thought by its _id
    getSingThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field) -
    // // // Example data:
    // // // {
    // // //  "thoughtText": "Here's a cool thought...",
    // // //  "username": "lernantino",
    // // //  "userId": "5edff358a0fcb779aa7b118b"
    // // // }



    // // PUT to update a thought by its _id



    // // DELETE to remove a thought by its _id



    // /api/thoughts/:thoughtId/reactions
    // --------------------------------------------------------
    // // POST to create a reaction stored in a single thought's reactions array field



    // // DELETE to pull and remove a reaction by the reaction's reactionId value



};