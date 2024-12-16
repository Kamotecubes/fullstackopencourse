import {
    Routes, Route, Link, useMatch, useNavigate
  } from 'react-router-dom'
const Users = ({users}) => {

    return (
        <>
            <h2>Users</h2>

            <table>
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return <tr key={u.username}>
                           <th scope="row"><Link to={`/users/${u.id}`}>{u.username}</Link></th>
                           <td>{u.blogs.length}</td>
                        </tr>
                    })}
                    
                </tbody>
            </table>

        </>
    )
}

export default Users