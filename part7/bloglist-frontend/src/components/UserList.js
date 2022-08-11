import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { getAllUsers } from '../reducers/userReducer';

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>user</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr>
                            <td>{u.name}</td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default UserList