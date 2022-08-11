import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import { getAllUsers } from '../reducers/userReducer';
import { useEffect } from 'react'

export const User = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const id = useParams().id
    const user = useSelector(state => state.user.users.find(u => u.id === id))
    if (!user) {
        return null
    }

    return (
        <>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map(blog => 
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </>
    )
}

export default User