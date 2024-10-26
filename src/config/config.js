require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    cors: {
        orgin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
};

module.exports = config