module.exports = (app) => {
    const movies = require('../controllers/movies.controller.js')
    // Create a new Movie
    app.post('/movies', movies.create);

    // Retrieve all movies
    app.get('/movies', movies.findAll);

    // Retrieve a single Note with movieId
    app.get('/movies/:movieId', movies.findOne);

    // Update a Note with movieId
    app.put('/movies/:movieId', movies.update);

    // Delete a Note with movieId
    app.delete('/movies/:movieId', movies.delete);
}