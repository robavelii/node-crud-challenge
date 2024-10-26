const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const PersonRouter = require('./routes/person.routes');
const PersonController = require('./controllers/person.controller');


const createApp = (persons = []) => {

    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(cors(config.cors));

    // Set initiial db
    app.set('db', persons);

    //Routes
    const personController = new PersonController(app.get('db'));
    app.use('/person', PersonRouter(personController));

    // 404 handler
    app.use((req, res, next) => {
        res.status(404).json({ status: 'error', message: 'Endpoint Not Found' });
    });

    // Error handler
    app.use(errorHandler);

    return app;
}

module.exports = createApp;