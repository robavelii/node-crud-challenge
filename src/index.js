const config = require('./config/config')
const createApp = require('./app')

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
}] //This is your in memory database

const app = createApp(persons)

if (require.main === module) {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`)
    })
}

module.exports = app