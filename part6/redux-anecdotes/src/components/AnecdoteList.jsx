import PropTypes from 'prop-types'

const AnecdoteList = ({ anecdotes, handleVote }) => {
    return (
        <>
            
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

AnecdoteList.propTypes = {
    anecdotes: PropTypes.array.isRequired,
    handleVote: PropTypes.func.isRequired
}

export default AnecdoteList