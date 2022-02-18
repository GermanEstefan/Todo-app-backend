const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    contentNote: {
        type: String,
        required: [true, 'Any value is required']
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Note', noteSchema);