const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    displayPicture: { data: Buffer, contentType: String },
    friends: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userSchema"
        }
    }],
    invitations: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userSchema",
            required: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chatSchema",
            required: true
        },
        date: {type: Date, required: true}
    }],
});

const chatSchema = new mongoose.Schema({
    messages: [
        {
            messsage: {type: mongoose.Schema.Types.Mixed, required: true},
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "userSchema",
                required: true
            },
            dateSent: {type: Date, required: true},
            read: {type: Boolean, default: false},
            readBy: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "userSchema",
            }],
            delivered: {type: Boolean, default: false}
        }
    ],
    isGroup: {type: Boolean, required: true, default: false},
    paticipants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "userSchema",
            }
        }
    ]
})



module.exports = {
    User: mongoose.model("User", userSchema),
    Chat: mongoose.model("Chat", chatSchema)
}