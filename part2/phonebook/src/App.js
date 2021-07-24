import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = ({newName, newNumber, addPerson, handlePersonChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
                value={newName}
                onChange={handlePersonChange}
              />
      </div>
      <div>
        number: <input
                  value={newNumber}
                  onChange={handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = ({persons, deletePersonOf}) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePersonOf(person)}
        />
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const PersonObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(PersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePersonOf = (person) => {
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return
    }

    personService
      .deleteOf(person.id)
      .then(_ => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App