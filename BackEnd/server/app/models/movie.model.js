const mongoose = require('mongoose')

const MovieSchema = mongoose.Schema({
    categories: [{key: String}],
    title: String,
    esposide: String,
    actor: String,
    producer: String
}, {
    timestamps: true
})

module.exports = mongoose.model('movies', MovieSchema)