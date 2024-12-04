import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote, initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { filterChange } from './reducers/filterReducer'
import Filter from './components/Filter'
import Notification from './components/Notification'
import {notificationChange, removeNotif} from './reducers/notificationReducer'

const App = () => {
 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])
  const anecdotes = useSelector(state => [...state.anecdotes].sort((a,b) => b.votes-a.votes).filter(b => b.content.includes(state.filter)))

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(addVote(anecdote))
    dispatch(notificationChange(`you voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000);
  }

  const handleCreate = async (content) => {
    dispatch(createAnecdote(content))
  }

  const handleFilter = (searchtxt) => dispatch(filterChange(searchtxt))

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter handleFilter={handleFilter} />
      <AnecdoteList anecdotes={anecdotes} handleVote={vote} />
      <AnecdoteForm handleCreate={handleCreate}/>
    </div>
  )
}

export default App