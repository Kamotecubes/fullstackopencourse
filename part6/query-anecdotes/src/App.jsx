import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAll, createNew, updateAnecdote} from './requests'


const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ mutationFn: createNew, 
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }, })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: true
  })
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }
  console.log(JSON.parse(JSON.stringify(result)))
  const anecdotes = result.data

  const handleCreate = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.error) {
    return (
      <>
      <p>anecdote service not available due to problems in server</p>
      </>
    )
  } else {
    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm handleCreate={handleCreate} />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

 


  
}

export default App
