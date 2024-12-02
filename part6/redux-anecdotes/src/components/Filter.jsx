import PropTypes from 'prop-types'
const Filter = ({handleFilter}) => {
  const handleChange = (event) => handleFilter(event.target.value)
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired
}

export default Filter