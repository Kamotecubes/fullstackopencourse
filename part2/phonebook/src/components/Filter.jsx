const Filter = (props) => {
    const {searchText, handleSearchChange} = props
    return (
        <div>
          filter shown with: <input value={searchText} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter