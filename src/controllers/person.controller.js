const PersonService = require('../services/person.service');

class PersonController {

    constructor(db) {
        this.personService = new PersonService(db);
    }

    getAllPersons = async (req, res, next) => {
        try {
            const persons = await this.personService.getAllPersons();
            res.status(200).json(persons);
        } catch (error) {
            next(error);
        }
    }

    getPersonById = async (req, res, next) => {
        try {
            const person = await this.personService.getPersonById(req.params.id);
            res.status(200).json(person);
        } catch (error) {
            next(error);
        }
    }

    createPerson = async (req, res, next) => {
        try {
            const newPerson = await this.personService.createPerson(req.validatedData);
            res.status(200).json(newPerson);
        } catch (error) {
            next(error);
        }
    }

    updatePerson = async (req, res, next) => {
        try {
            const updatedPerson = await this.personService.updatePerson(req.params.id, req.validatedData);
            res.status(200).json(updatedPerson);
        } catch (error) {
            next(error);
        }
    }

    deletePerson = async (req, res, next) => {
        try {
            await this.personService.deletePerson(req.params.id);
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PersonController