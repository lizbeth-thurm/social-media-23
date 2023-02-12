const { User, Thought, Reaction } = require('../../models');
// /api/users
// --------------------------------------------------------
module.exports = {
    // // GET all users
    getUsers(req, res) {
        User.find({})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // // GET a signle user by its _id and populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // // POST a new user -
    // // // Example data:
    // // // {
    // // //  "username": "lernantino","
    // // //  "email":" "lerantino@gmail.com"
    // // // }
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // // DELETE to remove user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : User.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User deleted and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:userId/friends/:friendId
    // --------------------------------------------------------
    // // POST to add a new friend to a user's friend list



    // // DELETE to remove a friend from a user's friend list



};