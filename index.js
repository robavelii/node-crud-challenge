const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const Joi = require('joi')

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
}] //This is your in memory database

app.set('db', persons)
//TODO: Implement crud of person

app.use(express.json())
app.use(cors())

// validation schema
const personSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()).required()
});

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
}

//! GET all persons
app.get('/person', (req, res) => {
    persons = app.get('db');  // Sync with current db state
    res.status(200).json(persons);
});

//! GET person by ID
app.get('/person/:id', (req, res) => {
    persons = app.get('db');  // Sync with current db state
    const person = persons.find(p => p.id === req.params.id);
    if (!person) {
        return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(person);
});

//! POST new person
app.post('/person', (req, res) => {
    const { error, value } = personSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const newPerson = {
        id: uuidv4(),
        ...value
    };

    persons = app.get('db');  // Sync with current db state
    persons.push(newPerson);
    app.set('db', persons);  // Update db state

    res.status(200).json(newPerson);
});

//! PUT update person
app.put('/person/:id', (req, res) => {
    const { error, value } = personSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    persons = app.get('db');  // Sync with current db state
    const index = persons.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }

    const updatedPerson = {
        id: req.params.id,
        ...value
    };

    persons[index] = updatedPerson;
    app.set('db', persons);  // Update db state

    res.status(200).json(updatedPerson);
});

//! DELETE person
app.delete('/person/:id', (req, res) => {
    persons = app.get('db');  // Sync with current db state
    const personExists = persons.some(p => p.id === req.params.id);

    if (!personExists) {
        return res.status(404).json({ error: 'Person not found' });
    }

    persons = persons.filter(p => p.id !== req.params.id);
    app.set('db', persons);  // Update db state

    res.status(200).json({ message: 'Person deleted successfully' });
});


// errror handler
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint Not found" })
})
app.use(errorHandler)


if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}
module.exports = app;