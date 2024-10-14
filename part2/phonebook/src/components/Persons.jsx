const Persons = ({persons, searchText, deleteContact}) => {
    return (
        <>
            {   
                persons
                .filter(p => p.name.toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase()))
                .map(p => <div key={p.id}><p>{`${p.name} ${p.number}`}<button onClick={deleteContact(p)}>delete</button></p></div>)
            }
        </>
    )
}

export default Persons