const express = require('express')
const validate = require('../middleware/validate')
const personSchema = require('../models/person.schema')

const PersonRouter = (controller) => {
    const router = express.Router();

    router.get('/', controller.getAllPersons);
    router.get('/:id', controller.getPersonById);
    router.post('/', validate(personSchema), controller.createPerson);
    router.put('/:id', validate(personSchema), controller.updatePerson);
    router.delete('/:id', controller.deletePerson);

    return router;
}

module.exports = PersonRouter