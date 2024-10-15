import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => {
      setPersons(data)
    })
  },[])

  const addContact = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (!!person) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(person.id, {...person, number: newNumber}).then(data => {
          setMessage(`Updated ${data.name} number`)
          setPersons(persons.map(p => p.id === data.id ? data : p))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      }
    } else {
      personService.create({name: newName, number: newNumber}).then(data => {
        setMessage(`Added ${data.name}`)
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
    
  }

  const deleteContact = (person) => {
    
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService.deleteItem(person.id).then(data => {
          setPersons(persons.filter(p => p.id !== data.id))
        })
      }
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
        <Filter searchText={searchText} handleSearchChange={handleSearchChange}/>
      <h1>add a new</h1>
      <PersonForm 
        addContact={addContact} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText} deleteContact={deleteContact} />
    </div>
  )
}

export default App