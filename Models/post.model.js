const { Schema, model } = require("mongoose");

//Schema/blueprint of user
const postSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        gender: { type: String, required: true },
        status: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

//Model of event
const PostModel = model("post", postSchema);

module.exports = PostModel;