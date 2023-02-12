const { Schema, model } = require('mongoose');

// User Model
// // username
// // // String
// // // Unique
// // // Required
// // // Trimmed
// // email
// // // String
// // // Required
// // // Unique
// // // Must match a valid email address (look into Mongoose's matching validation)
// // thoughts
// // // Array of _id values referencing the Thought model
// // friends
// // // Array of _id values referencing the User model (self-reference)
// // Schema Settings
// // // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /\S+@\S+\.\S+/, // regex for email validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
