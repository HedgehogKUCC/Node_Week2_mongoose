const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, '【內容】必填'],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        versionKey: false
    }
);

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;
