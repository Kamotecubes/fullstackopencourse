import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { filterChange } from './reducers/filterReducer'
import Filter from './components/Filter'
import Notification from './components/Notification'
import {notificationChange, removeNotif} from './reducers/notificationReducer'

const App = () => {
  const anecdotes = useSelector(state => [...state.anecdotes].sort((a,b) => b.votes-a.votes).filter(b => b.content.includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(notificationChange(`you voted for ${anecdotes.find(a => a.id === id).content}`))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000);
  }

  const handleCreate = (content) => dispatch(createAnecdote(content))

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