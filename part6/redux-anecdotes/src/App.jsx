import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { filterChange } from './reducers/filterReducer'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes-a.votes).filter(b => b.content.includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (id) => dispatch(addVote(id))

  const handleCreate = (content) => dispatch(createAnnecdote(content))

  const handleFilter = (searchtxt) => dispatch(filterChange(searchtxt))

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter handleFilter={handleFilter} />
      <AnecdoteList anecdotes={anecdotes} handleVote={vote} />
      <AnecdoteForm handleCreate={handleCreate}/>
    </div>
  )
}

export default App