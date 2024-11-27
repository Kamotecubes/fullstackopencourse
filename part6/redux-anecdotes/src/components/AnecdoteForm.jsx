import PropTypes from 'prop-types'

const AnecdoteForm = ({handleCreate}) => {

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.annecdote.value
        event.target.annecdote.value = ''
        handleCreate(content)
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onCreate}>
                <div><input name='annecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

AnecdoteForm.propTypes = {
    handleCreate: PropTypes.func.isRequired
  }

export default AnecdoteForm