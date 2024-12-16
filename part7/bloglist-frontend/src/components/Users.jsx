import { useEffect, useState } from "react";
import userService from "../services/users"
const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await userService.getUsers()
            setUsers(data)
            
        }
        fetchUsers()
    }, [])
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
                           <th scope="row">{u.username}</th>
                           <td>{u.blogs.length}</td>
                        </tr>
                    })}
                    
                </tbody>
            </table>

        </>
    )
}

export default Users