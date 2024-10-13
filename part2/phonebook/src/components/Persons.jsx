const Persons = ({persons, searchText}) => (persons
    .filter(p => p.name.toLocaleLowerCase()
    .includes(searchText.toLocaleLowerCase()))
    .map(p => <p key={p.name}>{`${p.name} ${p.number}`}</p>)
)

export default Persons