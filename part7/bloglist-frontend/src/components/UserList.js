import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { getAllUsers } from '../reducers/userReducer';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>user</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UserList