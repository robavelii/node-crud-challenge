const { v4: uuidv4 } = require('uuid')

class PersonService {
    constructor(db) {
        this.db = db
    }

    getAllPersons() {
        return this.db;
    }

    getPersonById(id) {
        let persons = this.db
        const person = persons.find(p => p.id === id);
        if (!person) {
            const error = new Error('Person not found');
            error.status = 404;
            throw error;
        }
        return person;
    }

    createPerson(data) {
        const newPerson = {
            id: uuidv4(),
            ...data
        };
        this.db.push(newPerson);
        return newPerson;
    }

    updatePerson(id, data) {
        let persons = this.db
        const index = persons.findIndex(p => p.id === id);
        if (index === -1) {
            const error = new Error('Person not found');
            error.status = 404;
            throw error;
        }
        const updatedPerson = {
            id,
            ...data
        };
        this.db[index] = updatedPerson;
        return updatedPerson;
    }

    deletePerson(id) {
        let persons = this.db;
        const personExists = persons.some(p => p.id === id);

        if (!personExists) {
            const error = new Error('Person not found');
            error.status = 404;
            throw error;
        }

        // Filter out the person to delete and update this.db
        persons = persons.filter(p => p.id !== id);
        this.db = persons;

        // Update the global app's db state
        require('../index').set('db', persons);

        return true;
    }


}

module.exports = PersonService