import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes-a.votes))
  const dispatch = useDispatch()

  const vote = (id) => dispatch(addVote(id))

  const handleCreate = (content) => dispatch(createAnnecdote(content))

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} handleVote={vote} />
      <AnecdoteForm handleCreate={handleCreate}/>
    </div>
  )
}

export default App