import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(resp => setPersons(resp.data))
  },[])

  const addContact = (event) => {
    event.preventDefault()
    const isExist = persons.find(p => p.name === newName)
    if (!!isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios.post('http://localhost:3001/persons', {name: newName, number: newNumber})
      .then(resp => {
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
      })
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
        <Filter searchText={searchText} handleSearchChange={handleSearchChange}/>
      <h1>add a new</h1>
      <PersonForm 
        addContact={addContact} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText} />
    </div>
  )
}

export default App