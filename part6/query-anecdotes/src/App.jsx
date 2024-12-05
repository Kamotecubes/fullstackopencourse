import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAll, createNew, updateAnecdote} from './requests'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.payload
    case 'RESET':
      return ''
    default:
      return ''
  }
}


const App = () => {
  const  [notif, notifDispatch] = useReducer(notifReducer, '')
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ mutationFn: createNew, 
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    notifDispatch({type: 'DISPLAY', payload: 'anecdote created'})
    setTimeout(() => notifDispatch({type: 'RESET'}), 5000)
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
    notifDispatch({type: 'DISPLAY', payload: `anecdote ${anecdote.content} voted`})
    setTimeout(() => notifDispatch({type: 'RESET'}), 5000)
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
      <NotificationContext.Provider value={[notif, notifDispatch]}>
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
      </NotificationContext.Provider>
    )
  }

 


  
}

export default App
