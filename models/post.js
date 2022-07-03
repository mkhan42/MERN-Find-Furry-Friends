const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('./comment');

const postSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    postType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: 'Unknown'
    },
    imgURL: {
        type: String,
        required: true
    },
    animalType: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true,
        default: 'Unknown'
    },
    lastLocationCity: {
        type: String,
        required: true
    },
    lastLocationState: {
        type: String,
        required: true
    },
    lastLocationZip: {
        type: String,
        required: true
    },
    lastLocationCountry: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reward: {
        type: String,
        default: 'No reward'
    },
    contactInfo: {
        type: String,
        required: true
    },
    comments: { type: Schema.Types.ObjectId, ref: 'Comments' }
})

module.exports = mongoose.model('Post', postSchema);