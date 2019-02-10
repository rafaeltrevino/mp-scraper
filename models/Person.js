const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    link: {
        type: String
    },
    name: {
        type: String
    },
    imgLink: {
        type: String
    },
    details: {
        type: String
    },
    hasNote: {
        type: Boolean
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean
    }
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
