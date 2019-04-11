const Movie = require('../models/movie.model.js');

// Create and Save a new Note
exports.create = (req, res) => {

};

// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    Movie.find()
    .then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};